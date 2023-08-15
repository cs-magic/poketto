import dayjs from 'dayjs'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { UsesField, ViewsField } from '@/components/utils/responsive-field'
import Link from 'next/link'
import { getAppLink } from '@/lib/poketto'
import { type AppWithRelation } from '@/ds/poketto'

export const AppViewInHomePage = ({ app }: { app: AppWithRelation | undefined }) => {
	if (!app) return (
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
		<Link className={'w-full p-3 pt-6 | flex gap-8 text-muted-foreground | hocus:bg-accent cursor-pointer'} href={getAppLink(app.id)}>
			<Avatar className={'rounded-sm'}>
				<AvatarImage src={app.avatar}/>
			</Avatar>
			
			<div className={'flex flex-col gap-2 grow'}>
				<p className={'text-primary-foreground font-semibold'}>{app.name}</p>
				<p className={'line-clamp-2 text-primary-foreground/75'}>{app.desc}</p>
				
				<div className={'inline-flex gap-4'}>
					<p>By {app.name}</p>
					<p>Updated on {dayjs(app.updatedAt).format('DD MMM, YYYY')}</p>
				</div>
			</div>
			
			<div className={'inline-flex gap-2 shrink-0'}>
				<UsesField v={app.state?.calls ?? 0}/>
				<ViewsField v={app.state?.views ?? 0}/>
			</div>
		</Link>
	)
}
