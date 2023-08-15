import { z } from 'zod'
import { createTRPCRouter, protectedProcedure, publicProcedure } from '@/server/routers/trpc.helpers'
import partialSearch from '../../data/partial-search.agg.json'
import { ChatMessageFormatType, PromptRoleType } from '.prisma/client'
import { type AppWithRelation, conversationInclude, type ConversationWithRelation, type IFlowgptPromptBasic } from '@/ds'
import { flowgpt2pokettoApp } from '@/lib/flowgpt'


export const pokettoRouter = createTRPCRouter({
	
	/**
	 * todo: public with permission control
	 */
	
	listConversations: protectedProcedure
		.input(z.object({}))
		.query(async ({ ctx: { prisma, session: { user } }, input: {} }) => {
			const result = await prisma.conversation
				.findMany({
					where: { userId: user.id }, include: conversationInclude,
				})
			return result as ConversationWithRelation[]
		}),
	
	getConversation: protectedProcedure
		.input(z.object({
			cid: z.string(),
		}))
		.query(async ({ ctx: { prisma, session: { user } }, input: { cid } }) => {
			const result = await prisma.conversation.findUnique({ where: { userId: user.id, id: cid }, include: conversationInclude })
			return result
		}),
	
	listMessages: protectedProcedure
		.input(z.object({
			cid: z.string(),
		}))
		.query(async ({ ctx: { prisma, session: { user } }, input: { cid } }) => {
			const result = await prisma.chatMessage.findMany({ where: { conversationId: cid } })
			return result
		}),
	
	pushMessage: protectedProcedure
		.input(z.object({
			content: z.string(),
			role: z.nativeEnum(PromptRoleType),
			cid: z.string(),
		}))
		.mutation(async ({ ctx: { prisma, session: { user } }, input: { cid, content, role } }) => {
			const result = await prisma.chatMessage.create({
				data: {
					conversationId: cid, content, role, userId: user.id, format: ChatMessageFormatType.text,
				},
			})
			return result
		}),
	
	addAppIntoConversation: protectedProcedure
		.input(z.object({
			appId: z.string(),
		}))
		.mutation(async ({ ctx: { prisma, session: { user } }, input: { appId } }) => {
				const result = await prisma.conversation.create({
					data: {
						userId: user.id,
						appId,
					},
				})
				return result
			},
		),
	
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

