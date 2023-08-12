import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { api } from '@/lib/api'
import { type FlowgptComment } from '@/ds/flowgpt'

export const FlowgptCommentComp = (
	{
		id,
		body,
	}: FlowgptComment) => {
	
	return (
		<Card>
			<CardHeader>
				{/* todo: title of comment like Apple */}
				{/*<CardTitle>{item.title}</CardTitle>*/}
				<div className={'flex items-center justify-between'}>
					<p className={'font-semibold'}>{'No Title (todo)'}</p>
					<p>{}</p>
				</div>
			</CardHeader>
			<CardContent>
				{body}
				{/*	todo: body */}
			</CardContent>
		</Card>
	)
}
export const FlowGPTComments = ({ id }: { id: string }) => {
	console.log('[FlowGPT Comments] ', { id })
	const { data } = api.flowgpt.listComments.useQuery({ id }, { enabled: id !== undefined })
	return (
		<div className={'w-full overflow-auto grid grid-cols-2 gap-2'}>
			{data
				? data.slice(0, 2).map((item) => (
					<FlowgptCommentComp {...item} key={item.id}/>
				))
				: 'Loading'}
		</div>
	)
}
