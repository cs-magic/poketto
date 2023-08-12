import { type FlowgptComment } from '@/ds/flowgpt'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { api } from '@/lib/api'

export const FlowgptComment = (
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
export const FlowgptComments = ({ id }: { id: string }) => {
	const { data } = api.flowgpt.listComments.useQuery({ id })
	return (
		<div className={'w-full overflow-auto grid grid-cols-2 gap-2'}>
			{data
				? data.slice(0, 2).map((item) => (
					<FlowgptComment {...item} key={item.id}/>
				))
				: 'Loading'}
		</div>
	)
}
