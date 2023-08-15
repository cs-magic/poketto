import { z } from 'zod'
import { type IFlowgptPromptBasic } from '@/ds/flowgpt'
import { createTRPCRouter, protectedProcedure, publicProcedure } from '@/server/routers/trpc.helpers'
import partialSearch from '../../data/partial-search.agg.json'
import { type AppWithRelation, conversationInclude, flowgpt2pokettoApp, type UsingAppWithRelation } from '@/ds/poketto'
import { Prisma } from '.prisma/client'
import { UserAppRelationType } from '@/ds/website'
import UsingAppWhereInput = Prisma.UsingAppWhereInput


export const pokettoRouter = createTRPCRouter({
	
	listConversations: protectedProcedure
		.input(z.object({
			spaceId: z.string().optional(),
			relationType: z.nativeEnum(UserAppRelationType),
		}))
		.query(async ({ ctx: { prisma }, input: { spaceId, relationType } }) => {
			// todo: dict
			const where: UsingAppWhereInput = { isActive: true }
			if (spaceId && relationType === UserAppRelationType.used) where.spaceId = spaceId
			const result = await prisma.usingApp
				.findMany({
					where,
					include: conversationInclude,
				})
			return result as UsingAppWithRelation[]
		}),
	
	listSpaces: protectedProcedure
		.input(z.object({
			userId: z.string(),
		}))
		.query(async ({ ctx: { prisma }, input: { userId } }) => {
			const result = await prisma.userSpaceRelation.findMany({
				where: {
					userId,
				}, include: {
					space: true, // 	user: undefined,
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

