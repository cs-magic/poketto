import { FlowgptDetail } from '@/components/flowgpt/detail'
import { api } from '@/lib/api'
import { useRouter } from 'next/router'
import { IconTruckLoading } from '@tabler/icons-react'
import { RootLayout } from '@/layouts/root.layout'

export default function AgentPage() {
	const router = useRouter()
	const id = router.query.id as string
	const { data } = api.flowgpt.getPrompt.useQuery({ id })
	if (!data) return <IconTruckLoading/>
	return (
		<RootLayout>
			<FlowgptDetail {...data}/>
		</RootLayout>
	)
}
