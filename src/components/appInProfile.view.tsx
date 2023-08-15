import { type AppWithRelation } from '@/ds/poketto'
import { Badge } from '@/components/ui/badge'
import dayjs from 'dayjs'
import { Button } from '@/components/ui/button'
import { StarIcon } from '@radix-ui/react-icons'
import { POKETTO_CREATOR_ID, POKETTO_CREATOR_NAME } from '@/config/poketto'

export const AppViewInDashboard = ({ c }: { c: AppWithRelation }) => {
	
	return (<div className={'w-full p-4 | flex justify-between gap-4 | border-y'} key={c.id}>
		<div className={'flex flex-col gap-2'}>
			<div className={'flex gap-2 items-center'}>
				<h2>{c.name}</h2>
				{c.creatorId === POKETTO_CREATOR_ID && <Badge className={'bg-blue-500'}>{POKETTO_CREATOR_NAME}</Badge>}
				<Badge variant={'outline'}>{c.model!.isOpenSource ? 'Open Source' : 'Close Source'}</Badge>
			</div>
			<div className={'text-muted-foreground'}>
				{c.desc}
			</div>
			<div className={'flex gap-4 items-center | text-muted-foreground'}>
				<div className={'inline-flex gap-2 items-center'}>
					<div className={'wh-3 rounded-full bg-blue-500'}/>
					<span>{c.categoryId}</span>
				</div>
				<span>Updated {dayjs(c.updatedAt).fromNow()}</span>
			</div>
		</div>
		
		<div className={'flex flex-col gap-2'}>
			<Button variant={'outline'} size={'sm'} className={'gap-2 h-8'}>
				<StarIcon/>
				<span>Star</span>
				{/*<Separator orientation={'vertical'}/>*/}
				{/*<ChevronDownIcon/>*/}
			</Button>
		</div>
	
	</div>)
}
