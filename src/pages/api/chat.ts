import { Configuration, OpenAIApi } from "openai-edge"
import { OpenAIStream, StreamingTextResponse } from "ai"
import { kv } from "@vercel/kv"
import { Ratelimit } from "@upstash/ratelimit"
import { env } from "@/env.mjs"
import { PromptRoleType } from ".prisma/client"
import { NextResponse } from "next/server"
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client"
import { type AppRouter } from "@/server/routers/trpc.router"
import superjson from "superjson"

// Create an OpenAI API client (that's edge friendly!)
const config = new Configuration({
  apiKey: env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(config)

// IMPORTANT! Set the runtime to edge
export const runtime = "edge"

export default async function (req: Request, res: Response) {
  const proxy = createTRPCProxyClient<AppRouter>({
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
  const pushMessage = async (content: string, role: PromptRoleType) => {
    const newMessage = { content, conversationId, role }
    console.log("pushing: ", newMessage)
    await proxy.conv.pushMessage.mutate(newMessage)
  }
  void pushMessage(messages[messages.length - 1].content, PromptRoleType.user)

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

  // Ask OpenAI for a streaming chat completion given the prompt
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    stream: true,
    messages: messages.map((message: { content: string; role: PromptRoleType }) => ({
      content: message.content,
      role: message.role,
    })),
  })

  if (response.status !== 200) {
    const {
      error: { message },
    } = await response.json()
    return NextResponse.json(message, { status: 500 })
  }

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response, {
    onCompletion: (data) => {
      // console.log("onCompletion: ", { data })
    },
    onToken: (data) => {
      // console.log("onToken: ", { data })
    },
    onFinal: (data) => {
      // console.log("onFinal: ", { data })
      void pushMessage(data, PromptRoleType.assistant)
    },
  })
  // Respond with the stream
  return new StreamingTextResponse(stream)
}
