import { useSession } from 'next-auth/react'

export const useUser = () => {
	const { data } = useSession()
	return data?.user
}

export const useUserId = () => {
	const user = useUser()
	return user?.id
}
