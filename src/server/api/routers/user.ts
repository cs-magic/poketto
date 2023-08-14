import { z } from 'zod'
import { createTRPCRouter, protectedProcedure, publicProcedure } from '@/server/api/helpers'
import _ from 'lodash'

import { USER_INVITATIONS_COUNT } from '@/config/system'
import { type User } from '.prisma/client'


export const userRouter = createTRPCRouter({
	
	getExactUser: protectedProcedure
		.input(z.string().optional())
		.query(async ({ ctx, input }): Promise<User | undefined> => {
			return (input && await ctx.prisma.user.findUnique({ where: { id: input } })) || undefined
		}),
	
	getSecretMessage: protectedProcedure.query(() => {
		return 'you can now see this secret message!'
	}),
	
	getInvitations: protectedProcedure.query(async ({ ctx }) => {
		const user = ctx.session.user
		if (!user) return []
		const invitationsCount = await ctx.prisma.invitation.count({ where: { fromId: user.id } })
		if (invitationsCount === 0) await ctx.prisma.invitation.createMany({ data: _.range(USER_INVITATIONS_COUNT).map(() => ({ fromId: user.id })) })
		return ctx.prisma.invitation.findMany({ where: { fromId: user.id } })
	}),
	
	getAllUser: publicProcedure.query(({ ctx }) => {
		return ctx.prisma.user.findMany({
			include: {
				followedBy: true,
			},
		})
	}),
	
})
