import { useUser } from '@/hooks/use-user'
import Mustache from 'mustache'

export const useMustache = () => {
	const user = useUser()
	return (s: string, dict?: Record<string, string | number | boolean>) => Mustache.render(s, { userName: user?.name, ...dict ?? {} })
}
