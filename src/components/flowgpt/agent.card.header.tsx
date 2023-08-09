import { AspectRatio } from '@/components/ui/aspect-ratio'
import Image from 'next/image'
import { CardTitle } from '@/components/ui/card'
import clsx from 'clsx'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '../ui/skeleton'
import _ from 'lodash'
import { type IFlowgptBasicPrompt } from '@/ds/flowgpt'
import { User } from '@/components/flowgpt/agent.card.interaction'

export const PromptCardHeader = ({ data, forDetail }: {
	data?: IFlowgptBasicPrompt
	forDetail?: boolean
}) => {
	return (
		<div className={'flex flex-row items-center space-x-4'}>
			<div className={'w-16 rounded shrink-0'}>
				<AspectRatio ratio={1}>
					{
						data
							? <Image src={data.thumbnailURL} alt={'thumbnailURL'}
							         className={'object-cover rounded-xl'}
							         fill sizes="64px"/>
							: <Skeleton className={'w-8 h-8 rounded-full'}/>
					}
				</AspectRatio>
			</div>
			
			<div className={'grow h-full overflow-hidden flex flex-col items-start gap-2'}>
				<CardTitle className={clsx(
					' text-accent-foreground',
					'line-clamp-2',
					'text-lg lg:text-xl',
				)}>
					{data?.title ?? <Skeleton className={'w-full'}/>}
				</CardTitle>
				
				<div className={'w-full inline-flex whitespace-nowrap items-center gap-2 overflow-y-hidden overflow-x-auto'}>
					{data?.Tag.slice(0, 3).map((item) => (
						<Badge key={item.name} variant={'outline'}>{item.name}</Badge>
					)) ?? _.range(3).map((i) => (
						<Skeleton className={'w-8'} key={i}/>
					))}
				</div>
				
				{forDetail && <User data={data} avatarAndName/>}
			</div>
		</div>
	)
}

