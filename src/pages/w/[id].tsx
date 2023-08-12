import { RootLayout } from '@/layouts/root.layout'
import { useStore } from '@/store'
import { FlowgptDetail } from '@/components/flowgpt/detail'
import { ChatConversation } from '@/components/chat/conversation'
import { ChatList } from '@/components/chat/list'


export default function WorkspacePage() {
	
	const { prompt } = useStore()
	// console.log('[WorkspacePage] ', { wid, search, prompts, prompt })
	
	
	return (
		<RootLayout>
			<div className={'w-full h-full overflow-hidden | flex divide-x'}>
				
				<ChatList/>
				
				<ChatConversation/>
				
				<section id={'chat-detail'} className={'w-full min-w-[320px] max-w-sm p-4 | hidden xl:flex'}>
					{prompt && <FlowgptDetail prompt={prompt}/>}
				</section>
			</div>
		</RootLayout>
	)
}
