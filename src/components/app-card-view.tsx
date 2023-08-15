import { type AppWithRelation, type SortOrder } from '@/ds/poketto'
import { CardsLayoutType } from '@/store/ui.slice'
import { order2icon } from '@/config/assets'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import _ from 'lodash'
import { IconDotsVertical } from '@tabler/icons-react'
import clsx from 'clsx'
import Link from 'next/link'
import { getUserLink } from '@/lib/user'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import numeral from 'numeral'
import React from 'react'

export const AppCardView = ({ app, cardsLayout, sort }: {
	app: AppWithRelation,
	cardsLayout: CardsLayoutType,
	sort: SortOrder
}) => {
	const Icon = order2icon[sort]
	return (
		<div className="w-full relative group overflow-hidden rounded-2xl">
			{cardsLayout === CardsLayoutType.grid
				? (
					<AspectRatio ratio={3 / 4} className={'overflow-hidden rounded-2xl'}>
						<Image src={app.avatar} fill className={'object-fill group-hover:scale-125 transition-all'} alt={app.avatar}/>
					</AspectRatio>
				) : (
					<Image src={app.avatar}
					       width={800}
					       height={600}
					       className={'object-fill group-hover:scale-125 transition-all'}
					       alt={app.avatar}/>
				)}
			
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
	)
}
