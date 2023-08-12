import { PokettoDetail } from '@/components/detail'
import { useRouter } from 'next/router'
import { RootLayout } from '@/layouts/root.layout'
import { useStore } from '@/store'
import { useEffect } from 'react'

export default function AppPage() {
	const router = useRouter()
	const id = router.query.id as string // string | undefined
	
	const { poketto, setPokettoId } = useStore()
	
	useEffect(() => {
		setPokettoId(id)
	}, [id])
	
	return (
		<RootLayout>
			{poketto && <PokettoDetail poketto={poketto}/>}
		</RootLayout>
	)
}
