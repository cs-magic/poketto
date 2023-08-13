import { RootLayout } from '@/layouts/root.layout'
import { PokettoDetail } from '@/components/channel/channel-detail'
import { ChatConversation } from '@/components/channel/channel-conv'
import { PokettoList } from '@/components/channel/channel-list'
import { useAppStore } from '@/store'


export default function WorkspacePage() {
	
	const { pokettoBasic, chatListVisible, chatDetailVisible, pokettoComments } = useAppStore()
	
	return (
		<RootLayout>
			<div className={'w-full h-full overflow-hidden | flex divide-x'}>
				
				{chatListVisible && <PokettoList/>}
				
				<ChatConversation/>
				
				{chatDetailVisible && pokettoBasic && <PokettoDetail poketto={pokettoBasic} comments={pokettoComments}/>}
			</div>
		</RootLayout>
	)
}
