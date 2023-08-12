import { RootLayout } from '@/layouts/root.layout'
import { useStore } from '@/store'
import { PokettoDetail } from '@/components/detail'
import { ChatConversation } from '@/components/chat/conversation'
import { PokettoList } from '@/components/chat/list'


export default function WorkspacePage() {
	
	const { pokettoBasic, chatListVisible, chatDetailVisible, pokettoComments } = useStore()
	
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
