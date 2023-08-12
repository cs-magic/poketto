import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { api } from '@/lib/api'
import { type IPokettoComment } from '@/ds/poketto'

export const Comment = (
	{
		id,
		body,
	}: IPokettoComment) => {
	
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

export const Comments = ({ id }: { id: string }) => {
	const { data } = api.flowgpt.listComments.useQuery({ id }, { enabled: id !== undefined })
	return (
		<div className={'w-full overflow-auto grid grid-cols-2 gap-2'}>
			{data
				? data.slice(0, 2).map((item) => (
					<Comment {...item} key={item.id}/>
				))
				: 'Loading'}
		</div>
	)
}
