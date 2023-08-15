import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { IconDotsVertical } from '@tabler/icons-react'
import { Badge } from '@/components/ui/badge'
import numeral from 'numeral'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import Image from 'next/image'
import _ from 'lodash'
import { Skeleton } from '@/components/ui/skeleton'
import clsx from 'clsx'
import Link from 'next/link'
import { toast } from '@/components/ui/use-toast'
import { getShortName } from '@/lib/string'
import { Button } from '@/components/ui/button'
import { order2icon } from '@/components/utils/assets'
import { type AppWithRelation, type ConversationWithRelation } from '@/ds/poketto'
import { getUserLink } from '@/lib/user'
import { CardsLayoutType } from '@/store/ui.slice'
import { useAppStore } from '@/store'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { AppDetail } from '@/components/app/app-detail'


export const AppCardViewInExplore = ({ convs, app }: {
	convs: ConversationWithRelation[]
	app: AppWithRelation
}) => {
	const { cardsLayout, sortOrder: sort } = useAppStore()
	const Icon = order2icon[sort]
	
	return (
		
		<Dialog>
			<DialogTrigger>
				<div className="w-full relative group overflow-hidden rounded-2xl">
					{cardsLayout === CardsLayoutType.grid ? (<AspectRatio ratio={3 / 4} className={'overflow-hidden rounded-2xl'}>
						<Image src={app.avatar} fill className={'object-fill group-hover:scale-125 transition-all'} alt={app.avatar}/>
					</AspectRatio>) : (<Image src={app.avatar}
					                          width={800}
					                          height={600}
					                          className={'object-fill group-hover:scale-125 transition-all'}
					                          alt={app.avatar}/>)}
					
					{/* header desc */}
					<div className={'absolute top-0 w-full p-4 | flex justify-between'}>
						<div className={'flex items-center gap-2'}>
							{app.tags.length && (<Badge variant={'destructive'}>
								{_.startCase(_.capitalize(app.tags[0]?.name))}
							</Badge>)}
						</div>
						<IconDotsVertical className={'hidden group-hover:flex'}/>
					</div>
					
					{/* footer desc */}
					<div className={clsx('absolute bottom-0 w-full p-4 | flex flex-col gap-2', 'backdrop-blur', 'backdrop-brightness-50')}>
						{/* title */}
						<div className={'text-lg truncate font-normal'}>{app.name}</div>
						
						<div className={'text-md hidden group-hover:line-clamp-3 transition-all'}>{app.desc}</div>
						
						{/*	user - ranks */}
						<div className={'flex justify-between | text-xs text-primary-foreground/75'}>
							{/* user */}
							<Link className={'w-1/2 | flex items-center gap-2'} href={getUserLink(app.creatorId)}>
								<Avatar className={'wh-5'}>
									<AvatarImage src={app.avatar}/>
								</Avatar>
								<span className={'truncate italic'}>{app.name}</span>
							</Link>
							
							{/* ranks */}
							<div className={'flex items-center gap-1'}>
								<Icon/>
								<span>{numeral(app.state?.views).format('0a')}</span>
							</div>
						</div>
					</div>
				
				</div>
			</DialogTrigger>
			
			<DialogContent className={'max-h-[80vh] overflow-auto'}>
				<AppDetail convs={convs} app={app} comments={[]}/>
			</DialogContent>
		</Dialog>)
}
export const User = ({ avatarAndName, app, forDetail }: {
	app: AppWithRelation | undefined
	avatarAndName?: boolean
	forDetail?: boolean
}) => {
	
	if (!app) return <Skeleton className={'h-8 w-16'}/>
	
	return (<Link href={getUserLink(app.creatorId)}
	              
	              className={clsx('inline-flex items-center whitespace-nowrap gap-2 overflow-hidden', !avatarAndName && 'flex-row-reverse')}
	              onClick={(event) => {
		              toast({ title: 'TODO~' })
		              event.preventDefault()
	              }}>
		
		<Avatar className={'w-4 h-4 rounded-full'}>
			<AvatarImage src={app.avatar}/>
			<AvatarFallback>{getShortName(app.creator.name ?? '佚名')}</AvatarFallback>
		</Avatar>
		
		<span className={clsx('truncate', // 'underline',
		)}>
					{app.name ?? <Skeleton className={'w-8'}/>}
				</span>
		
		{forDetail && <Button variant={'muted'} size={'thin'} className={'text-xs px-4'}>+ 关注</Button>}
	
	</Link>)
}
