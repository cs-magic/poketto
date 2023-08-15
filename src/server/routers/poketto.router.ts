import { z } from 'zod'
import { type IFlowgptPromptBasic } from '@/ds/flowgpt'
import { createTRPCRouter, protectedProcedure, publicProcedure } from '@/server/routers/trpc.helpers'
import partialSearch from '../../data/partial-search.agg.json'
import { type AppWithRelation, conversationInclude, type ConversationWithRelation, flowgpt2pokettoApp } from '@/ds/poketto'


export const pokettoRouter = createTRPCRouter({
	
	/**
	 * 这个 api 应该是公开的，只要目标用户没有设置权限即可
	 */
	listConversations: publicProcedure
		.input(z.object({
			userId: z.string(),
		}))
		.query(async ({ ctx: { prisma }, input: { userId } }) => {
			const result = await prisma.conversation
				.findMany({
					where: { userId }, include: conversationInclude,
				})
			return result as ConversationWithRelation[]
		}),
	
	searchPoketto: publicProcedure
		.input(z.object({
			query: z.string(), language: z.string().default('zh'), threshold: z.number().default(.8), hideNsfw: z.boolean().default(true),
		}))
		.query<AppWithRelation[]>(async (opts) => {
			partialSearch[0]!.$search!.phrase.query = opts.input.query // <-- mongodb partial search
			let result
			result = await opts.ctx.mongo.db('flowgpt').collection('basic').aggregate<IFlowgptPromptBasic>(partialSearch).toArray()
			// result = await singleFetch<FlowgptPromptBasic[]>({ path: 'prompt.searchPrompts', { json: opts.input } })
			return result.map(flowgpt2pokettoApp)
		}),
	
})

