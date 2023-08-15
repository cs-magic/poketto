import { type IApp } from '@/ds/poketto'
import { Badge } from '@/components/ui/badge'
import dayjs from 'dayjs'
import { Button } from '@/components/ui/button'
import { ChevronDownIcon, StarIcon } from '@radix-ui/react-icons'
import { Separator } from '@/components/ui/separator'

export const AppViewInProfile = ({ c }: { c: IApp }) => {
	
	return (
		<div className={'w-full p-4 | flex justify-between gap-4 | border-y'} key={c.flowgpt.id}>
			<div className={'flex flex-col gap-2'}>
				<div className={'flex gap-2 items-start'}>
					<h2>{c.flowgpt.name}</h2>
					<Badge variant={'outline'}>{c.flowgpt.model!.isOpenSource ? 'Open Source' : 'Close Source'}</Badge>
				</div>
				<div className={'text-muted-foreground'}>
					{c.flowgpt.desc}
				</div>
				<div className={'flex gap-4 items-center | text-muted-foreground'}>
					<div className={'inline-flex gap-2 items-center'}>
						<div className={'wh-3 rounded-full bg-blue-500'}/>
						<span>{c.flowgpt.categoryId}</span>
					</div>
					<span>Updated {dayjs(c.flowgpt.updatedAt).fromNow()}</span>
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
		
		</div>
	)
}
