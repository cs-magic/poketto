import { useSession } from "next-auth/react"

export const useSessionUser = () => {
  const { data } = useSession()
  return data?.user
}

export const useUserId = () => {
  const { data } = useSession()
  return data?.user.id
}
