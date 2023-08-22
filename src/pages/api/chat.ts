import { type Message, StreamingTextResponse } from "ai"
import { env } from "@/env.mjs"
import { Prisma, PromptRoleType } from ".prisma/client"
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client"
import { type RootRouter } from "@/server/trpc.router"
import superjson from "superjson"

import { nanoid } from "@/lib/id"
import { PromptTemplate } from "langchain/prompts"
import { ChatOpenAI } from "langchain/chat_models/openai"
import { BytesOutputParser } from "langchain/schema/output_parser"
import { validateRequest } from "@/lib/chat-plugins/rate-limit.plugin"
import { CHAT_MESSAGE_CID_LEN, DEFAULT_TEMPERATURE } from "@/config"
import ChatMessageUncheckedCreateInput = Prisma.ChatMessageUncheckedCreateInput
import { BaseCallbackHandler } from "langchain/callbacks"
import { Serialized } from "langchain/dist/load/serializable"
import { AgentAction, AgentFinish, ChainValues } from "langchain/schema" // allow lodash run in edge, ref: https://github.com/lodash/lodash/issues/5525#issuecomment-1426535044

export const runtime = "edge" // IMPORTANT! Set the runtime to edge

export class MyCallbackHandler extends BaseCallbackHandler {
  name = "MyCallbackHandler"

  async handleChainStart(chain: Serialized) {
    console.log(`handleChainStart: `, { chain })
  }

  async handleChainEnd(output: ChainValues) {
    console.log("handleChainEnd: ", { _output: output })
  }

  async handleAgentAction(action: AgentAction) {
    console.log("handleAgentAction: ", { action })
  }

  async handleToolEnd(output: string) {
    console.log("handleToolEnd: ", { output })
  }

  async handleText(text: string) {
    console.log("handleText: ", { text })
  }

  async handleAgentEnd(action: AgentFinish) {
    console.log("handleAgentEnd: ", { action })
  }
}

export default async function (req: Request, res: Response) {
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
  if (await validateRequest(req)) return

  /**
   * 3. 读取 memory: p ∪ q 条记忆;  p=5: 过往最相关记忆; q=4: 最新记忆
   */
  const { content } = messages[messages.length - 1]
  const context = await proxy.message.getContext.query({ conversationId, content })
  console.log({ conversationId, content, contextIds: context.map((c) => c.id) })

  const callbackHandler = new MyCallbackHandler()

  const model = new ChatOpenAI({
    callbacks: [callbackHandler],
    openAIApiKey: env.OPENAI_API_KEY,
    temperature: DEFAULT_TEMPERATURE,
    modelName:
      // userId === "-6SJi" // special for lara
      //   ?
      // "gpt-4",
      "gpt-3.5-turbo",
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

  // Convert the response into a friendly text-stream
  const stream = await chain.stream({
    history: context.map((m) => `${m.role}: ${m.content}`).join("\n"),
    input: content,

    // todo: !important fix onFinal of `langchain.stream`
    onFinal: (completion) => {
      console.log("onFinal: ", { completion })
      void pushMessage({ content: completion, role: PromptRoleType.assistant, id: replyId })
    },
  })

  const headers = new Headers()
  headers.set("replyId", replyId)
  return new StreamingTextResponse(stream, { headers })
}
