import { useSession } from 'next-auth/react'

export const useUser = () => {
	const { data } = useSession()
	const user = data?.user
	// console.log('[useUser] ', user)
	return user
}

export const useUserId = () => {
	const user = useUser()
	return user?.id
}
