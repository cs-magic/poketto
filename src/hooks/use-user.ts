import { useSession } from 'next-auth/react'
import { api } from '@/lib/api'
import { type User } from '.prisma/client'

/**
 * 不要写 useUserId，不方便维护
 */
export const useUser = (): User | undefined => {
	const { data } = useSession()
	const userId = data?.user.id
	const { data: user } = api.user.getExactUser.useQuery(userId, { enabled: !!userId })
	return user
}
