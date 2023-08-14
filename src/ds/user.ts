import { Prisma } from '.prisma/client'
import UserGetPayload = Prisma.UserGetPayload

export type UserWithRelations = UserGetPayload<{ include: { followedBy: true } }>
