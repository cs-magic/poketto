import dayjs from 'dayjs'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { UsesField, ViewsField } from '@/components/utils/responsive-field'
import { type IPokettoBasic } from '@/ds/poketto'
import Link from 'next/link'
import { getChannelUri } from '@/lib/poketto'

export const ChannelListView = ({ poketto }: { poketto: IPokettoBasic | undefined }) => {
	if (!poketto) return (
		<div className={'w-full pt-6 pb-3 | flex gap-8 text-muted-foreground'}>
			<Skeleton className={'wh-12'}/>
			
			<div className={'flex flex-col gap-2 grow'}>
				<Skeleton className={'h-4'}/>
				<Skeleton className={'h-8'}/>
				<Skeleton className={'h-4'}/>
			</div>
			
			<div className={'inline-flex gap-2 shrink-0'}>
				<Skeleton className={'w-40 h-8'}/>
			</div>
		</div>
	)
	
	return (
		<Link className={'w-full p-3 pt-6 | flex gap-8 text-muted-foreground | hocus:bg-accent cursor-pointer'} href={getChannelUri(poketto.id)}>
			<Avatar className={'rounded-sm'}>
				<AvatarImage src={poketto.basic.avatar}/>
			</Avatar>
			
			<div className={'flex flex-col gap-2 grow'}>
				<p className={'text-primary-foreground font-semibold'}>{poketto.basic.title}</p>
				<p className={'line-clamp-2 text-primary-foreground/75'}>{poketto.basic.desc}</p>
				
				<div className={'inline-flex gap-4'}>
					<p>By {poketto.user.name}</p>
					<p>Updated on {dayjs(poketto.basic.updatedAt).format('DD MMM, YYYY')}</p>
				</div>
			</div>
			
			<div className={'inline-flex gap-2 shrink-0'}>
				<UsesField v={poketto.state.users}/>
				<ViewsField v={poketto.state.views}/>
			</div>
		</Link>
	)
}
