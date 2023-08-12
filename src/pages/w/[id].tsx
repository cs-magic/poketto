import { RootLayout } from '@/layouts/root.layout'
import { useStore } from '@/store'
import { FlowgptDetail } from '@/components/detail'
import { ChatConversation } from '@/components/chat/conversation'
import { ChatList } from '@/components/chat/list'


export default function WorkspacePage() {
	
	const { prompt, showChatList, showChatDetail } = useStore()
	// console.log('[WorkspacePage] ', { wid, search, prompts, prompt })
	
	
	return (
		<RootLayout>
			<div className={'w-full h-full overflow-hidden | flex divide-x'}>
				
				{showChatList && <ChatList/>}
				
				<ChatConversation/>
				
				{showChatDetail && (
					<section id={'chat-detail'} className={'w-full min-w-[320px] max-w-sm p-4 | hidden xl:flex'}>
						{prompt && <FlowgptDetail prompt={prompt}/>}
					</section>
				)}
			</div>
		</RootLayout>
	)
}
