/**
 * Copyright (c) CS-Magic, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Prisma, PromptRoleType } from "@prisma/client"
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client"
import { Ratelimit } from "@upstash/ratelimit"
import { kv } from "@vercel/kv"
import { type Message, OpenAIStream, StreamingTextResponse } from "ai"
import { NextResponse } from "next/server"
import OpenAI, { APIError as OpenAIAPIError } from "openai"
import superjson from "superjson"

import { type RootRouter } from "@/server/routers/_root.router"

import { baseEnv } from "@/env.mjs"

import { ERR_MSG_BALANCE_NOT_ENOUGH } from "@/const"

import { CHAT_MESSAGE_CID_LEN } from "@/config"

import { MemoryMode, defaultModelQuota } from "@/ds"

import { isDomestic, nanoid } from "@/lib/edge"

import ChatMessageUncheckedCreateInput = Prisma.ChatMessageUncheckedCreateInput

export const runtime = isDomestic() ? "nodejs" : "edge" // IMPORTANT! Set the runtime to edge

/**
 * ref:
 *  ChatOpenAI + StreamingTextResponse: https://sdk.vercel.ai/docs/api-reference/langchain-stream
 *
 * @param req
 * @constructor
 */
export async function POST(req: Request) {
  console.log("calling chat in [EDGE ENVIRONMENT]")
  const data = await req.json()
  const { messages: receivedMessages, conversationId, userId, modelType } = data
  const memoryMode = data.memoryMode as MemoryMode

  const proxy = createTRPCProxyClient<RootRouter>({
    links: [
      // loggerLink(),
      httpBatchLink({ url: `${req.headers.get("origin")}/api/trpc` }),
    ],
    transformer: superjson,
  })
  /**
   * validate balance
   */
  const user = await proxy.user.getProfile.query({ id: userId })
  if (user.balance <= 0 && (user.quota ?? defaultModelQuota)[modelType] <= 0)
    return new Response(ERR_MSG_BALANCE_NOT_ENOUGH, {
      status: 406,
    })
  /**
   * 1. 先存储用户的消息，谨防丢失
   */

  // console.log("req: ", { data })
  const pushMessage = (msg: Message) => {
    const { role, content } = msg
    const newMessage: ChatMessageUncheckedCreateInput = {
      role,
      content,
      conversationId,
      modelType,
      isUsingFree: user.balance <= 0,
    }
    console.log("pushing message: ", newMessage)
    // do not await, to speed up (backend process)
    void proxy.message.push.mutate(newMessage)
  }

  void pushMessage(receivedMessages[receivedMessages.length - 1])

  /**
   * 2. 检查频率等相关
   */
  if (baseEnv.KV_REST_API_URL && baseEnv.KV_REST_API_TOKEN) {
    const ip = req.headers.get("x-forwarded-for")
    const ratelimit = new Ratelimit({
      redis: kv,
      // rate limit to 1 requests per 20 seconds
      limiter: Ratelimit.slidingWindow(3, "10s"),
    })

    const { success, limit, reset, remaining } = await ratelimit.limit(`ratelimit_${ip}`)

    if (!success) {
      return NextResponse.json("您的速度太快啦，请慢点！", {
        status: 429,
        headers: {
          "X-RateLimit-Limit": limit.toString(),
          "X-RateLimit-Remaining": remaining.toString(),
          "X-RateLimit-Reset": reset.toString(),
        },
      })
    }
    // todo: 国内这个比较慢
    console.log("passed rate limiter")
  }

  /**
   * 3. 读取 memory: p ∪ q 条记忆;  p=5: 过往最相关记忆; q=4: 最新记忆
   */
  const { content } = receivedMessages[receivedMessages.length - 1]
  let context: { role: PromptRoleType; content: string }[] = []
  // todo: add system prompt
  if (memoryMode === "one-time") {
    context = [{ content, role: "user" }]
  } else if (memoryMode === "recent") {
    context = receivedMessages.slice(-5)
  } else {
    context = await proxy.message.getContext.query({ conversationId, content, modelType })
  }
  const messages = context.map((m) => ({ role: m.role, content: m.content }))
  console.log("context: ", { messages })

  const replyId = nanoid(CHAT_MESSAGE_CID_LEN)
  const headers = new Headers()
  headers.set("replyId", replyId)

  try {
    const response = await new OpenAI({
      apiKey: baseEnv.OPENAI_API_KEY,
      timeout: 3000,
      /**
       *
       * ref:
       *  - https://github.com/openai/openai-node/tree/v4#configuring-an-https-agent-eg-for-proxies
       *  - https://github.com/openai/openai-node/issues/85
       *  - https://www.npmjs.com/package/https-proxy-agent
       *
       * edge 环境中 不支持 http / https-proxy-agent 等库
       */
      httpAgent:
        // isDomestic()
        // ? new (
        //     await import("https-proxy-agent")
        //   ).HttpsProxyAgent("http://localhost:7890")
        // :
        undefined,
    }).chat.completions.create(
      {
        model: modelType,
        stream: true,
        messages,
        temperature: 0.7,
      },
      { timeout: 3000 },
    )

    const stream = OpenAIStream(response, {
      onCompletion: (completion) => {
        console.log({ completion })
        pushMessage({ content: completion, role: "assistant", id: replyId })
      },
      onFinal: (final) => {
        // 之前直接监听这个回调，结果拿不到数据，监听 onCompletion就好了，很奇怪……现在两个都拿的到。。
        // console.log({ final })
      },
    })

    return new StreamingTextResponse(stream, { headers })
  } catch (e) {
    console.log({ e })
    if (e instanceof OpenAIAPIError)
      return NextResponse.json(`OpenAI响应错误，请稍后再试！错误原因：${e.message}`, {
        status: 400,
      })

    return NextResponse.json("服务器未知错误，请稍后再试！", {
      status: 400,
    })
  }
}
