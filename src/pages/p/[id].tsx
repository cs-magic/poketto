import { RootLayout } from '@/layouts/root.layout'
import { ChannelDetail } from '@/components/channel/channel-detail'
import { ChannelList } from '@/components/channel/channel-list'
import { useAppStore } from '@/store'
import { POKETTO_CHANNEL_ID } from '@/config/poketto'
import { api } from '@/lib/api'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { ChannelContent } from '@/components/channel/channel-content'


export default function ConversationPage() {
	const { channels, pokettoBasic, setPokettoBasic, setPokettoComments, chatListVisible, chatDetailVisible, pokettoComments } = useAppStore()
	
	const router = useRouter()
	const id = router.query.id as string | undefined ?? POKETTO_CHANNEL_ID   // force not to be empty
	const platform = !id || id === POKETTO_CHANNEL_ID ? 'poketto' : 'flowgpt'
	const { data: withConversation } = api.poketto.getPoketto.useQuery({ id, platform })
	const { data: comments } = api.poketto.listComments.useQuery({ id, platform })
	
	console.log({ withConversation, comments, channels })
	
	useEffect(() => {
		// 防止闪烁
		if (withConversation) setPokettoBasic(withConversation)
		if (comments) setPokettoComments(comments)
	}, [withConversation, comments])
	
	
	return (<RootLayout>
		<div className={'w-full h-full overflow-hidden | flex divide-x'}>
			
			{chatListVisible && <ChannelList/>}
			
			<ChannelContent/>
			
			{chatDetailVisible && pokettoBasic && <ChannelDetail poketto={pokettoBasic} comments={pokettoComments}/>}
		</div>
	</RootLayout>)
}
