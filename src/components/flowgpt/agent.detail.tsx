import { type IFlowgptBasicPrompt, type IFlowgptComment } from '@/ds/flowgpt'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PromptCardHeader } from '@/components/flowgpt/agent.card.header'
import { AgentCardInteraction } from '@/components/flowgpt/agent.card.interaction'
import { Skeleton } from '@/components/ui/skeleton'
import { Comment } from '@/components/flowgpt/comment'

export const AgentDetail = ({ prompt, comments }: {
	prompt: IFlowgptBasicPrompt | undefined,
	comments: IFlowgptComment[]
}) => {
	return (
		<Card className={'h-full overflow-hidden | flex flex-col gap-2 | border-none bg-transparent px-2'}>
			<CardHeader className={'flex flex-col gap-2 p-2'}>
				<PromptCardHeader data={prompt} forDetail/>
				<AgentCardInteraction data={prompt} forDetail/>
			</CardHeader>
			
			<CardContent className={'grow overflow-auto px-2'}>
				
				<Card className={'border-none bg-transparent'}>
					<CardHeader className={'border-b mb-2 py-2 px-0'}>
						<CardTitle className={'text-lg'}>详情信息</CardTitle>
					</CardHeader>
					<CardContent className={'px-0'}>
						{prompt?.description ?? <Skeleton className={'w-full h-20'}/>}
					</CardContent>
				</Card>
				
				<Card className={'border-none bg-transparent'}>
					<CardHeader className={'border-b mb-2 py-2 px-0'}>
						<CardTitle className={'text-lg'}>评论列表</CardTitle>
					</CardHeader>
					<CardContent className={'flex flex-col gap-2 px-0'}>
						{
							comments.map((comment) => <Comment data={comment} key={comment.id}/>)
						}
					</CardContent>
				</Card>
			</CardContent>
		</Card>
	)
}
