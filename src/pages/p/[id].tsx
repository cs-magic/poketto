import { PokettoDetail } from '@/components/channel/channel-detail'
import { useRouter } from 'next/router'
import { RootLayout } from '@/layouts/root.layout'
import { useEffect } from 'react'
import { useAppStore } from '@/store'

export default function AppPage() {
	const router = useRouter()
	const id = router.query.id as string // string | undefined
	
	const { pokettoBasic, setPokettoId, pokettoComments } = useAppStore()
	
	useEffect(() => {
		setPokettoId(id)
	}, [id])
	
	return (
		<RootLayout>
			{pokettoBasic && <PokettoDetail poketto={pokettoBasic} comments={pokettoComments}/>}
		</RootLayout>
	)
}
