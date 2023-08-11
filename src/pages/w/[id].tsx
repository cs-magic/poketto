import { RootLayout } from '@/layouts/root.layout'
import { useRouter } from 'next/router'

export default function WorkspacePage() {
	
	const router = useRouter()
	const wid = router.query.id as string
	console.log({ wid })
	
	return (
		<RootLayout>
			Hello world
		</RootLayout>
	)
}
