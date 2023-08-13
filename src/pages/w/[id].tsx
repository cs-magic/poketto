import { RootLayout } from '@/layouts/root.layout'
import { PokettoDetail } from '@/components/detail'
import { ChatConversation } from '@/components/chat/conversation'
import { PokettoList } from '@/components/chat/list'
import { useAppStore } from '@/store'


export default function WorkspacePage() {
	
	const { pokettoBasic, chatListVisible, chatDetailVisible, pokettoComments } = useAppStore()
	
	return (
		<RootLayout>
			<div className={'w-full h-full overflow-hidden | flex divide-x'}>
				
				{chatListVisible && <PokettoList/>}
				
				<ChatConversation/>
				
				{chatDetailVisible && (
					<section id={'chat-detail'} className={'w-full min-w-[320px] max-w-sm p-4 | hidden xl:flex'}>
						{pokettoBasic && <PokettoDetail poketto={pokettoBasic} comments={pokettoComments}/>}
					</section>
				)}
			</div>
		</RootLayout>
	)
}
