import { useSession } from "next-auth/react"
import { api } from "@/lib/api"
import { type User } from ".prisma/client"

import { type UserWithRelations } from "@/ds"

export const useUserId = () => {
  const { data } = useSession()
  return data?.user.id
}

/**
 * 不要写 useUserId，不方便维护
 */
export const useUser = (): UserWithRelations | undefined => {
  const userId = useUserId()
  const { data: user } = api.user.getExactUser.useQuery(userId, { enabled: !!userId })
  return user
}
