// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card-consistent'
import { clsx } from 'clsx'
import { type IFlowgptBasicPrompt } from '@/ds/flowgpt'
import { uri } from '@/config'
import { useRouter } from 'next/router'
import React from 'react'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { IconDotsVertical, IconEye } from '@tabler/icons-react'
import { Badge } from '@/components/ui/badge'
import numeral from 'numeral'
import { CardsLayoutType, useStore } from '@/store'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import Image from 'next/image'


export const FlowgptAgentCard = (props: IFlowgptBasicPrompt) => {
	const router = useRouter()
	const { cardsLayout } = useStore()
	
	return (
		
		<div
			className="w-full relative group overflow-hidden rounded-2xl"
			onClick={() => {
				void router.push(`${uri.product.agent}/${props.id}`)
			}}
		>
			{
				cardsLayout === CardsLayoutType.grid
					? (
						<AspectRatio ratio={3 / 4} className={'overflow-hidden rounded-2xl'}>
							<Image src={props.thumbnailURL} fill className={'object-fill hover:scale-125'} alt={props.thumbnailURL}/>
						</AspectRatio>
					)
					: (
						<Image src={props.thumbnailURL} width={800} height={600} className={'object-fill hover:scale-125'} alt={props.thumbnailURL}/>
					)
			}
			
			{/* header desc */}
			<div className={'absolute top-0 w-full p-4 | flex justify-between'}>
				<div className={'flex items-center gap-2'}>
					{props.Tag.length && <Badge variant={'destructive'}>{props.Tag[0]!.name}</Badge>}
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
				<div className={'text-lg truncate'}>{props.title}</div>
				
				<div className={'text-md hidden group-hover:line-clamp-3'}>{props.description}</div>
				
				{/*	user - ranks */}
				<div className={'flex justify-between | text-xs text-muted-foreground'}>
					{/* user */}
					<div className={'w-1/2 | flex items-center gap-2'}>
						<Avatar className={'wh-5'}>
							<AvatarImage src={props.User.image}/>
						</Avatar>
						<span className={'truncate italic'}>{props.User.name}</span>
					</div>
					
					{/* ranks */}
					<div className={'flex items-center'}>
						<IconEye className={'wh-5'}/>
						<span>{numeral(props.views).format('0a')}</span>
					</div>
				</div>
			</div>
		
		</div>
	)
}
