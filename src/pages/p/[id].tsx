import { PokettoDetail } from '@/components/detail'
import { useRouter } from 'next/router'
import { RootLayout } from '@/layouts/root.layout'
import { useStore } from '@/store'
import { useEffect } from 'react'

export default function AppPage() {
	const router = useRouter()
	const id = router.query.id as string // string | undefined
	
	const { pokettoBasic, setPokettoId, pokettoComments } = useStore()
	
	useEffect(() => {
		setPokettoId(id)
	}, [id])
	
	return (
		<RootLayout>
			{pokettoBasic && <PokettoDetail poketto={pokettoBasic} comments={pokettoComments}/>}
		</RootLayout>
	)
}
