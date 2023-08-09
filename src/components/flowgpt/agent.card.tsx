// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card-consistent'
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@/components/ui/card'
import { clsx } from 'clsx'
import { AgentCardInteraction } from '@/components/flowgpt/agent.card.interaction'
import { PromptCardHeader } from '@/components/flowgpt/agent.card.header'
import { type IFlowgptBasicPrompt } from '@/ds/flowgpt'
import { uri } from '@/config'
import { useRouter } from 'next/router'


export const FlowgptAgentCard = (props: IFlowgptBasicPrompt) => {
	const router = useRouter()
	
	return (
		
		<Card
			className={clsx(
				'w-full', // columns 划分之后占满
				'break-inside-avoid', // 防止被自动排布时被cut，ref: https://stackoverflow.com/a/76525368
				'border-none rounded-xl', // pinterest 页面里的图是没有border但有倒角的
				' text-sm text-muted-foreground group px-1',
				// 'm-2 lg:m-4 ',
				'mb-2 lg:mb-4',
				'transition-all',
				'cursor-pointer hocus:scale-[1.02] hocus:shadow-xl hocus:bg-accent',
			)}
			onClick={() => {
				void router.push(`${uri.product.agent}/${props.id}`)
			}}
		>
			
			<CardHeader>
				<PromptCardHeader data={props}/>
			</CardHeader>
			
			<CardContent>
				
				<CardDescription className={clsx(
					'line-clamp-6',
				)}>
					{props.description}
				</CardDescription>
			
			</CardContent>
			
			<CardFooter>
				<AgentCardInteraction data={props} twoSide/>
			</CardFooter>
		</Card>
	)
}
