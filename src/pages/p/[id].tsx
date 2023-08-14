import { RootLayout } from '@/layouts/root.layout'
import { AppDetail } from '@/components/app/app-detail'
import { AppList } from '@/components/app/app-list'
import { useAppStore } from '@/store'
import { POKETTO_APP_ID } from '@/config/poketto'
import { api } from '@/lib/api'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { AppContent } from '@/components/app/app-content'
import { PlatformType } from '.prisma/client'


export default function ConversationPage() {
	const { apps, app, setApp, setAppComments, chatListVisible, chatDetailVisible, appComments } = useAppStore()
	
	const router = useRouter()
	const id = router.query.id as string | undefined ?? POKETTO_APP_ID   // force not to be empty
	const platform = !id || id === POKETTO_APP_ID ? PlatformType.Poketto : PlatformType.FlowGPT
	const { data: withConversation } = api.poketto.getPoketto.useQuery({ id, platform })
	const { data: comments } = api.poketto.listComments.useQuery({ id, platform })
	
	
	useEffect(() => {
		// 防止闪烁
		if (withConversation) setApp(withConversation)
		if (comments) setAppComments(comments)
	}, [withConversation, comments])
	
	
	return (<RootLayout>
		<div className={'w-full h-full overflow-hidden | flex divide-x'}>
			
			{chatListVisible && <AppList/>}
			
			<AppContent/>
			
			{chatDetailVisible && app && <AppDetail app={app} comments={appComments}/>}
		</div>
	</RootLayout>)
}
