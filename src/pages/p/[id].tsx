import { RootLayout } from '@/layouts/root.layout'
import { ChannelDetail } from '@/components/channel/channel-detail'
import { ChannelList } from '@/components/channel/channel-list'
import { useAppStore } from '@/store'
import { useChat } from 'ai/react'
import { toast } from 'sonner'
import clsx from 'clsx'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ControlTool } from '@/components/utils/tools'
import { POKETTO_CHANNEL_ID } from '@/config/poketto'
import { api } from '@/lib/api'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useWindowScroll } from '@mantine/hooks'
import { ChannelCoontent } from '@/components/channel/channel-coontent'


export default function ConversationPage() {
	const { channels, pokettoBasic, setPokettoBasic, setPokettoComments, chatListVisible, chatDetailVisible, pokettoComments } = useAppStore()
	
	const router = useRouter()
	const id = router.query.id as string
	const platform = !id || id === POKETTO_CHANNEL_ID ? 'poketto' : 'flowgpt'
	const { data: withConversation } = api.poketto.getPoketto.useQuery({ id, platform })
	const { data: comments } = api.poketto.listComments.useQuery({ id, platform })
	
	console.log({ withConversation, comments, channels })
	
	useEffect(() => {
		// 防止闪烁
		if (withConversation) setPokettoBasic(withConversation)
		if (comments) setPokettoComments(comments)
	}, [withConversation, comments])
	
	
	return (
		<RootLayout>
			<div className={'w-full h-full overflow-hidden | flex divide-x'}>
				
				{chatListVisible && <ChannelList/>}
				
				<ChannelCoontent/>
				
				{chatDetailVisible && pokettoBasic && <ChannelDetail poketto={pokettoBasic} comments={pokettoComments}/>}
			</div>
		</RootLayout>
	)
}
