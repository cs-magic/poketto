import { z } from 'zod'
import {
	createTRPCRouter,
	publicProcedure,
	protectedProcedure,
} from '@/server/routers/trpc.helpers'

import { OpenAIStream, StreamingTextResponse } from 'ai'
import { Configuration, OpenAIApi } from 'openai-edge'
import { env } from '@/env.mjs'

export const runtime = 'edge'

const config = new Configuration({
	apiKey: env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(config)


export const chatRouter = createTRPCRouter({
	completion: publicProcedure
		.input(z.object({ text: z.string() }))
		.mutation(async ({ input }) => {
			const response = await openai.createChatCompletion({
				model: 'gpt-3.5-turbo',
				stream: true,
				messages: [{ role: 'user', content: input.text }],
			})
			const stream = OpenAIStream(response)
			return new StreamingTextResponse(stream)
		}),
})
