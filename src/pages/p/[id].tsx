import { FlowgptDetail } from '@/components/flowgpt/detail'
import { api } from '@/lib/api'
import { useRouter } from 'next/router'
import { IconTruckLoading } from '@tabler/icons-react'
import { RootLayout } from '@/layouts/root.layout'

export default function AppPage() {
	const router = useRouter()
	const id = router.query.id as string // string | undefined
	const { data } = api.flowgpt.getPrompt.useQuery({ id }, { enabled: id !== undefined })
	console.log('[App] ', data)
	
	if (!data) return <IconTruckLoading/>
	
	return (
		<RootLayout>
			{data && <FlowgptDetail prompt={data}/>}
		</RootLayout>
	)
}
