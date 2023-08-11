import { type IFlowgptBasicPrompt } from '@/ds/flowgpt'
import { useRouter } from 'next/router'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { IconDotsVertical, IconFlame, IconHeart, IconPlayerPlay } from '@tabler/icons-react'
import { Badge } from '@/components/ui/badge'
import numeral from 'numeral'
import { CardsLayoutType, useStore } from '@/store'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import Image from 'next/image'
import _ from 'lodash'
import { Skeleton } from '@/components/ui/skeleton'
import { CardTitle } from '@/components/ui/card'
import clsx from 'clsx'
import Link from 'next/link'
import { toast } from '@/components/ui/use-toast'
import { getShortName } from '@/lib/string'
import { Button } from '@/components/ui/button'
import { order2icon } from '@/components/utils/assets'
import { uri } from '@/config/app'


export const FlowgptAgentCard = (props: IFlowgptBasicPrompt) => {
	const router = useRouter()
	const { cardsLayout, order } = useStore()
	const Icon = order2icon[order]
	
	return (
		
		<div
			className="w-full relative group overflow-hidden rounded-2xl"
			onClick={() => {
				void router.push(`${uri.app.prompt}/${props.id}`)
			}}
		>
			{
				cardsLayout === CardsLayoutType.grid
					? (
						<AspectRatio ratio={3 / 4} className={'overflow-hidden rounded-2xl'}>
							<Image src={props.thumbnailURL} fill className={'object-fill group-hover:scale-125 transition-all'} alt={props.thumbnailURL}/>
						</AspectRatio>
					)
					: (
						<Image src={props.thumbnailURL} width={800} height={600} className={'object-fill group-hover:scale-125 transition-all'} alt={props.thumbnailURL}/>
					)
			}
			
			{/* header desc */}
			<div className={'absolute top-0 w-full p-4 | flex justify-between'}>
				<div className={'flex items-center gap-2'}>
					{props.Tag.length && (
						<Badge variant={'destructive'}>
							{_.startCase(_.capitalize(props.Tag[0]!.name))}
						</Badge>
					)}
				</div>
				<IconDotsVertical className={'hidden group-hover:flex'}/>
			</div>
			
			{/* footer desc */}
			<div className={clsx(
				'absolute bottom-0 w-full p-4 | flex flex-col gap-2',
				'backdrop-blur',
				'backdrop-brightness-50',
			)}>
				{/* title */}
				<div className={'text-lg truncate font-normal'}>{props.title}</div>
				
				<div className={'text-md hidden group-hover:line-clamp-3 transition-all'}>{props.description}</div>
				
				{/*	user - ranks */}
				<div className={'flex justify-between | text-xs text-primary-foreground/75'}>
					{/* user */}
					<div className={'w-1/2 | flex items-center gap-2'}>
						<Avatar className={'wh-5'}>
							<AvatarImage src={props.User.image}/>
						</Avatar>
						<span className={'truncate italic'}>{props.User.name}</span>
					</div>
					
					{/* ranks */}
					<div className={'flex items-center gap-1'}>
						<Icon/>
						<span>{numeral(props.views).format('0a')}</span>
					</div>
				</div>
			</div>
		
		</div>
	)
}
export const User = ({ avatarAndName, data, forDetail }: {
	data: IFlowgptBasicPrompt | undefined
	avatarAndName?: boolean
	forDetail?: boolean
}) => {
	
	if (!data) return <Skeleton className={'h-8 w-16'}/>
	
	return (
		<Link href={data.User.uri ?? ''}
		      
		      className={clsx(
			      'inline-flex items-center whitespace-nowrap gap-2 overflow-hidden',
			      !avatarAndName && 'flex-row-reverse',
		      )}
		      onClick={(event) => {
			      toast({ title: 'TODO~' })
			      event.preventDefault()
		      }}>
			
			<Avatar className={'w-4 h-4 rounded-full'}>
				<AvatarImage src={data.User.image}/>
				<AvatarFallback>{getShortName(data.User.name ?? '佚名')}</AvatarFallback>
			</Avatar>
			
			<span className={clsx(
				'truncate',
				// 'underline',
			)}>
					{data.User.name ?? <Skeleton className={'w-8'}/>}
				</span>
			
			{
				forDetail && <Button variant={'muted'} size={'thin'} className={'text-xs px-4'}>+ 关注</Button>
			}
		
		</Link>
	)
}
export const AgentCardInteraction = ({ data, twoSide, forDetail }: {
	data: IFlowgptBasicPrompt | undefined
	twoSide?: boolean
	forDetail?: boolean
}) => {
	if (forDetail) return (
		<div className={'flex items-center gap-2'}>
			
			<Button variant={'muted'} size={'thin'} className={'inline-flex items-center gap-1'}>
				<IconFlame size={16}/>
				<span>{data ? numeral(data.popularity * 10).format('0 a').toUpperCase() : <Skeleton className={'w-8'}/>}</span>
			</Button>
			
			<Button variant={'muted'} size={'thin'} className={'inline-flex items-center gap-1'}>
				<IconPlayerPlay size={16}/>
				<span>{data?.upvotes ?? <Skeleton className={'w-8'}/>}</span>
			</Button>
			
			<Button variant={'muted'} size={'thin'} className={'inline-flex items-center gap-1'}>
				<IconHeart size={16}/>
				<span>{data?.saves ?? <Skeleton className={'w-8'}/>}</span>
			</Button>
		</div>
	)
	
	return (
		
		<div className={clsx(
			'w-full flex gap-2',
			twoSide && ' justify-between',
		)}>
			<div className={clsx(
				'inline-flex items-center whitespace-nowrap space-x-1 shrink-0',
				!twoSide && 'order-last',
			)}>
				
				<IconFlame size={16}/>
				<span>{data ? numeral(data.popularity * 10).format('0 a').toUpperCase() : <Skeleton className={'w-8'}/>}</span>
				
				<IconPlayerPlay size={16}/>
				<span>{data?.upvotes ?? <Skeleton className={'w-8'}/>}</span>
				
				<IconHeart size={16}/>
				<span>{data?.saves ?? <Skeleton className={'w-8'}/>}</span>
			
			</div>
			
			<User data={data} avatarAndName={!twoSide}/>
		</div>
	
	)
}
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
