import { z } from 'zod'
import { type IFlowgptPromptBasic } from '@/ds/flowgpt'
import { createTRPCRouter, protectedProcedure, publicProcedure } from '@/server/routers/trpc.helpers'
import partialSearch from '../../data/partial-search.agg.json'
import { type AppWithRelation, flowgpt2pokettoApp } from '@/ds/poketto'
import { Prisma } from '.prisma/client'
import SpaceGetPayload = Prisma.SpaceGetPayload

export const pokettoRouter = createTRPCRouter({
	
	listSpaces: protectedProcedure
		.input(z.object({
			userId: z.string(),
		}))
		.query<SpaceGetPayload<any>[]>(async ({ ctx, input }) => {
			const result = await ctx.prisma.userSpaceRelation.findMany({
				where: {
					userId: input.userId,
				},
				include: {
					space: true,
				},
			})
			return result.map((s) => s.space)
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

