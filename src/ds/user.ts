import { Prisma } from '.prisma/client'
import UserGetPayload = Prisma.UserGetPayload

export const userWithRelationsInclude = {
	followedBy: true,
	following: true,
}

export type UserWithRelations = UserGetPayload<{ include: typeof userWithRelationsInclude }> & {
	impact: number
}
