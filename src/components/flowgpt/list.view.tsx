import { type FlowgptPromptBasic } from '@/ds/flowgpt'
import dayjs from 'dayjs'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import React from 'react'
import { IconEye, IconGitFork } from '@tabler/icons-react'
import { ICON_DIMENSION_SM } from '@/config/assets'
import numeral from 'numeral'
import { Skeleton } from '@/components/ui/skeleton'
import { ResponsiveField, UsesField, ViewsField } from '@/components/utils/responsive-field'

export const PocketListView = ({ props }: { props: FlowgptPromptBasic | undefined }) => {
	if (!props) return (
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
		<div className={'w-full pt-6 pb-3 | flex gap-8 text-muted-foreground'}>
			<Avatar className={'rounded-sm'}>
				<AvatarImage src={props.thumbnailURL}/>
			</Avatar>
			
			<div className={'flex flex-col gap-2 grow'}>
				<p className={'text-primary-foreground font-semibold'}>{props.title}</p>
				<p className={'line-clamp-2 text-primary-foreground/75'}>{props.description}</p>
				
				<div className={'inline-flex gap-4'}>
					<p>By {props.User.name}</p>
					<p>Updated on {dayjs(props?.updatedAt).format('DD MMM, YYYY')}</p>
				</div>
			</div>
			
			<div className={'inline-flex gap-2 shrink-0'}>
				<UsesField v={props.uses}/>
				<ViewsField v={props.views}/>
			</div>
		</div>
	)
}
