import { type IPokettoChannel } from '@/ds/poketto'
import { Badge } from '@/components/ui/badge'
import dayjs from 'dayjs'
import { Button } from '@/components/ui/button'
import { ChevronDownIcon, StarIcon } from '@radix-ui/react-icons'
import { Separator } from '@/components/ui/separator'

export const ChannelViewInProfile = ({ c }: { c: IPokettoChannel }) => {
	return (
		<div className={'w-full p-4 | flex justify-between gap-4 | border-y'} key={c.poketto.id}>
			<div className={'flex flex-col gap-2'}>
				<div className={'flex gap-2 items-start'}>
					<h2>{c.poketto.basic.title}</h2>
					<Badge variant={'outline'}>{c.poketto.permissions.visible ? 'Public' : 'Private'}</Badge>
					<Badge variant={'outline'}>{c.poketto.permissions.openSource ? 'Open Source' : 'Close Source'}</Badge>
				</div>
				<div className={'text-muted-foreground'}>
					{c.poketto.basic.desc}
				</div>
				<div className={'flex gap-4 items-center | text-muted-foreground'}>
					<div className={'inline-flex gap-2 items-center'}>
						<div className={'wh-3 rounded-full bg-blue-500'}/>
						<span>{c.poketto.basic.category[0]}</span>
					</div>
					<span>Updated {dayjs(c.poketto.basic.updatedAt).fromNow()}</span>
				</div>
			</div>
			
			<div className={'flex flex-col gap-2'}>
				<Button variant={'outline'} size={'sm'} className={'gap-2 h-8'}>
					<StarIcon/>
					<span>Star</span>
					<Separator orientation={'vertical'}/>
					<ChevronDownIcon/>
				</Button>
			</div>
		
		</div>
	)
}
