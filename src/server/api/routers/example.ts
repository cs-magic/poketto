import { z } from 'zod'
import { createTRPCRouter, protectedProcedure, publicProcedure } from '@/server/api/helpers'
import { type Invitation } from '.prisma/client'
import _ from 'lodash'

export const exampleRouter = createTRPCRouter({
	hello: publicProcedure
		.input(z.object({ text: z.string() }))
		.query(({ input }) => {
			return {
				greeting: `Hello ${input.text}`,
			}
		}),
	
	getAll: publicProcedure.query(({ ctx }) => {
		return ctx.prisma.example.findMany()
	}),
	
	getSecretMessage: protectedProcedure.query(() => {
		return 'you can now see this secret message!'
	}),
	
	getInvitations: protectedProcedure.query(async ({ ctx }) => {
		const user = ctx.session.user
		
		if ((await ctx.prisma.invitation.count({ where: { fromId: user.id } })) === 0) {
			await ctx.prisma.invitation.createMany({ data: _.range(5).map(() => ({ fromId: user.id })) })
		}
		return await ctx.prisma.invitation.findMany({ where: { fromId: user.id } })
	}),
})
