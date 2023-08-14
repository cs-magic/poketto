import { RootLayout } from '@/layouts/root.layout'
import { UserProfile } from '@/components/user'
import { useUser } from '@/hooks/use-user'

export default function DashboardPage() {
	const user = useUser()
	return (
		<RootLayout>
			<UserProfile user={user}/>
		</RootLayout>
	)
}

