import { Configuration, OpenAIApi } from "openai-edge"
import { type Message, OpenAIStream, StreamingTextResponse, experimental_StreamData } from "ai"
import { kv } from "@vercel/kv"
import { Ratelimit } from "@upstash/ratelimit"
import { env } from "@/env.mjs"
import { Prisma, PromptRoleType } from ".prisma/client"
import { NextResponse } from "next/server"
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client"
import { type RootRouter } from "@/server/trpc.router"
import superjson from "superjson"

import { nanoid } from "@/lib/id"
import ChatMessageUncheckedCreateInput = Prisma.ChatMessageUncheckedCreateInput
import _ from "lodash" // Create an OpenAI API client (that's edge friendly!)

// Create an OpenAI API client (that's edge friendly!)
const config = new Configuration({
  apiKey: env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(config)

// IMPORTANT! Set the runtime to edge
export const runtime = "edge"

export const validateRequest = async (req: Request) => {
  if (env.KV_REST_API_URL && env.KV_REST_API_TOKEN) {
    const ip = req.headers.get("x-forwarded-for")
    const ratelimit = new Ratelimit({
      redis: kv,
      // rate limit to 1 requests per 20 seconds
      limiter: Ratelimit.slidingWindow(3, "10s"),
    })

    const { success, limit, reset, remaining } = await ratelimit.limit(`ratelimit_${ip}`)

    if (!success) {
      return new Response("Hey man, you are too fast! Please slow down!", {
        status: 429,
        headers: {
          "X-RateLimit-Limit": limit.toString(),
          "X-RateLimit-Remaining": remaining.toString(),
          "X-RateLimit-Reset": reset.toString(),
        },
      })
    }
  }
}

export default async function (req: Request, res: Response) {
  const proxy = createTRPCProxyClient<RootRouter>({
    links: [
      // loggerLink(),
      httpBatchLink({ url: `${req.headers.get("origin")}/api/trpc` }),
    ],
    transformer: superjson,
  })

  // Extract the `prompt` from the body of the request
  const data = await req.json()
  const { messages, conversationId } = data
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

  if (await validateRequest(req)) return

  // Ask OpenAI for a streaming chat completion given the prompt
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    stream: true,
    messages: messages.map((m) => _.pick(m, ["role", "content"])),
  })

  if (response.status !== 200) {
    const { error } = await response.json()
    console.error(error)
    const { message } = error
    return NextResponse.json(message, { status: 500 })
  }

  const replyId = nanoid(7)
  const extraData = new experimental_StreamData()
  extraData.append({ replyId })

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response, {
    // 这个和 onFinal 是一样的
    onCompletion: (data) => {
      // console.log("onCompletion: ", { data })
    },

    // 这个是按词的
    onToken: (data) => {
      // console.log("onToken: ", { data })
    },

    // !important
    experimental_streamData: true,

    onFinal: (completion) => {
      // console.log("onFinal: ", { data })
      void pushMessage({ content: completion, role: PromptRoleType.assistant, id: replyId })

      // !important
      extraData.close()
    },
  })

  // Respond with the stream
  return new StreamingTextResponse(stream, {}, extraData)
}
