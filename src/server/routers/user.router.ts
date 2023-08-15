import { z } from 'zod'
import { createTRPCRouter, protectedProcedure, publicProcedure } from '@/server/routers/trpc.helpers'
import _ from 'lodash'

import { USER_INVITATIONS_COUNT } from '@/config/system'
import { $Enums, type User } from '.prisma/client'
import { type UserWithRelations, userWithRelationsInclude } from '@/ds/user'
import User2AppType = $Enums.User2AppType


export const userRouter = createTRPCRouter({
	listApps: protectedProcedure
		.input(z.object({
			type: z.enum(User2AppType),
		}))
		.query(async ({ ctx }) => {
			const { user } = ctx.session
			if (!user) return []
			return ctx.prisma.user2App
				.findMany({ where: { userId: user.id }, include: { app: true } })
				.map((v) => v.app)
		}),
	
	getExactUser: protectedProcedure
		.input(z.string().optional())
		.query(async ({ ctx, input }): Promise<UserWithRelations | undefined> => {
			if (!input) return undefined
			const res = await ctx.prisma.user.findUnique({ where: { id: input }, include: userWithRelationsInclude }) as UserWithRelations | null
			return res || undefined
		}),
	
	getSecretMessage: protectedProcedure.query(() => {
		return 'you can now see this secret message!'
	}),
	
	getInvitations: protectedProcedure.query(async ({ ctx }) => {
		const user = ctx.session.user
		if (!user) return []
		const invitationsCount = await ctx.prisma.invitationRelation.count({ where: { fromId: user.id } })
		if (invitationsCount === 0) await ctx.prisma.invitationRelation.createMany({ data: _.range(USER_INVITATIONS_COUNT).map(() => ({ fromId: user.id })) })
		return ctx.prisma.invitationRelation.findMany({ where: { fromId: user.id } })
	}),
	
	getAllUser: publicProcedure.query(({ ctx }) => {
		return ctx.prisma.user.findMany({
			include: {
				followedBy: true,
			},
		})
	}),
	
})
