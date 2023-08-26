/**
 * Copyright (c) CS-Magic, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Prisma, PromptRoleType } from ".prisma/client"
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client"
import { type Message, StreamingTextResponse } from "ai"
import { ChatOpenAI } from "langchain/chat_models/openai"
import { PromptTemplate } from "langchain/prompts"
import { type LLMResult } from "langchain/schema"
import { BytesOutputParser } from "langchain/schema/output_parser"
import superjson from "superjson"

import { type RootRouter } from "@/server/trpc.router"

import { CHAT_MESSAGE_CID_LEN, DEFAULT_TEMPERATURE } from "@/config"

// allow lodash run in edge, ref: https://github.com/lodash/lodash/issues/5525#issuecomment-1426535044
import { validateRequest } from "@/lib/chat-plugins/rate-limit.plugin"
import { nanoid } from "@/lib/id"

import ChatMessageUncheckedCreateInput = Prisma.ChatMessageUncheckedCreateInput

export const runtime = "edge" // IMPORTANT! Set the runtime to edge

export default async function handler(req: Request, res: Response) {
  /**
   * 1. 先存储用户的消息，谨防丢失
   */
  const proxy = createTRPCProxyClient<RootRouter>({
    links: [
      // loggerLink(),
      httpBatchLink({ url: `${req.headers.get("origin")}/api/trpc` }),
    ],
    transformer: superjson,
  })

  const data = await req.json()
  const { messages, conversationId, userId } = data

  // console.log("req: ", { data })
  const pushMessage = async (msg: Message) => {
    const { id, role, content } = msg
    const newMessage: ChatMessageUncheckedCreateInput = {
      role,
      content,
      conversationId,
      shortId: id,
    }
    console.log("pushing: ", newMessage)
    await proxy.message.push.mutate(newMessage)
  }

  void pushMessage(messages[messages.length - 1])

  /**
   * 2. 检查频率等相关
   */
  if (await validateRequest(req)) {
    return
  }

  /**
   * 3. 读取 memory: p ∪ q 条记忆;  p=5: 过往最相关记忆; q=4: 最新记忆
   */
  const { content } = messages[messages.length - 1]
  const context = await proxy.message.getContext.query({ conversationId, content })
  console.log({ conversationId, content, contextIds: context.map((c) => c.id) })

  const model = new ChatOpenAI({
    // stream / callback, ref: https://js.langchain.com/docs/modules/model_io/models/chat/how_to/streaming
    callbacks: [
      {
        handleLLMEnd(output: LLMResult, runId: string, parentRunId?: string, tags?: string[]): Promise<void> | void {
          // console.log("LLMEnd: ", JSON.stringify({ output, runId, parentRunId, tags }, null, 2))
          const content = output.generations
            .flat()
            .map((g) => g.text)
            .join("\n\n---\n\n")
          void pushMessage({ content, role: PromptRoleType.assistant, id: replyId })
        },
      },
    ],
    // openAIApiKey: env.OPENAI_API_KEY, // 不要用 nodejs 变量，而且其实已经内含了
    temperature: DEFAULT_TEMPERATURE,
    modelName: "gpt-3.5-turbo",
  })

  // todo: customize our template? or using traditional conversation approach?
  const prompt =
    PromptTemplate.fromTemplate(`The following is a friendly conversation between a human and an AI. The AI is talkative and provides lots of specific details from its context. If the AI does not know the answer to a question, it truthfully says it does not know.

Relevant pieces of previous conversation:
{history}

(You do not need to use these pieces of information if not relevant)

Current conversation:
Human: {input}
AI:`)
  const outputParser = new BytesOutputParser()
  const chain = prompt.pipe(model).pipe(outputParser)

  // if (response.status !== 200) {
  //   const { error } = await response.json()
  //   console.error(error)
  //   const { message } = error
  //   return NextResponse.json(message, { status: 500 })
  // }

  const replyId = nanoid(CHAT_MESSAGE_CID_LEN)
  const headers = new Headers()
  headers.set("replyId", replyId)

  // Convert the response into a friendly text-stream
  const stream = await chain.stream({
    history: context.map((m) => `${m.role}: ${m.content}`).join("\n"),
    input: content,
  })
  return new StreamingTextResponse(stream, { headers })
}
