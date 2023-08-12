import { FlowgptDetail } from '@/components/flowgpt/detail'
import { useRouter } from 'next/router'
import { RootLayout } from '@/layouts/root.layout'
import { useStore } from '@/store'
import { useEffect } from 'react'

export default function AppPage() {
	const router = useRouter()
	const id = router.query.id as string // string | undefined
	
	const { setPromptId, prompt } = useStore()
	
	useEffect(() => {
		setPromptId(id)
	}, [id])
	
	return (
		<RootLayout>
			{prompt && <FlowgptDetail prompt={prompt}/>}
		</RootLayout>
	)
}
