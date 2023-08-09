import { toast, useToast } from '@/components/ui/use-toast'
import { IconFlame, IconHeart, IconPlayerPlay } from '@tabler/icons-react'
import numeral from 'numeral'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'
import { type IFlowgptBasicPrompt } from '@/ds/flowgpt'
import { getShortName } from '@/lib/string'
import { clsx } from 'clsx'
import { Button } from '@/components/ui/button'

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
