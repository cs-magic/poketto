import React, { Fragment, useEffect } from 'react'
import { clsx } from 'clsx'
import { RootLayout } from '@/layouts/root.layout'
import { api } from '@/lib/api'
import { GridContainer, MasonryContainer } from '@/components/containers'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import _ from 'lodash'
import { FrameIcon } from '@radix-ui/react-icons'


import { FlowGPTSortOrder } from '@/ds/flowgpt'
import { CardsLayoutType } from '@/store/ui.slice'
import { useAppStore } from '@/store'
import { Carousel } from 'react-responsive-carousel'
import { carousals } from '@/config/product'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import Image from 'next/image'
import { type AppWithRelation, type ConversationWithRelation } from '@/ds/poketto'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { IconDotsVertical } from '@tabler/icons-react'
import Link from 'next/link'
import { getUserLink } from '@/lib/user'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import numeral from 'numeral'
import { order2icon } from '@/config/assets'
import { useIntersection } from '@mantine/hooks'
import { clsx } from 'clsx'


export default function ExplorePage() {
	
	const { cardsLayout, sortOrder, setSortOrder } = useAppStore()
	const Container = cardsLayout === CardsLayoutType.grid ? GridContainer : MasonryContainer
	
	const query = api.flowgpt.listPoketto.useInfiniteQuery({ sort: sortOrder }, {
		getNextPageParam: (lastPage, allPages) => lastPage.nextCursor, // 这个必须加
	})
	const items = query.data?.pages.flatMap((item) => item.data) ?? []
	console.log('[FlowGPT] ', items)
	return (
		<RootLayout>
			
			{/* main (content - load more) */}
			<div className={clsx(
				'w-full p-4 lg:p-8 max-w-[1360px] h-full overflow-auto | flex flex-col gap-4',
			)}>
				
				{/*<HomeCarousel/>*/}
				
				{/* title */}
				<div className={'w-full px-2 | flex items-center gap-2 whitespace-nowrap '}>
					<FrameIcon/>
					<span className={'text-lg'}>玩法推荐</span>
					
					<div className={'grow'}/>
					{/*<span className={'hidden md:block'}>Sort By</span>*/}
					<div className={'flex items-center'}>
						{
							Object.values(FlowGPTSortOrder)
								.map((order) => {
									const Icon = order2icon[order]
									return (
										<Fragment key={order}>
											<Separator orientation={'vertical'} className={'h-4 first:hidden'}/>
											<Button
												className={'hover:bg-transparent px-2 flex items-center gap-1'}
												variant={'ghost'}
												key={order} onClick={() => {setSortOrder(order)}}>
												<Icon className={''}/>
												<span className={'hidden lg:block'}>{_.startCase(_.capitalize(order))}</span>
											</Button>
										</Fragment>
									)
								})
						}
					</div>
				</div>
				
				{/* content (carousel - cards)*/}
				
				<Container>
					{items.map((item) => <AppCardViewInExplore convs={} app={app} key={item.id}/>)}
				</Container>
				
				{/* load more*/}
				{query.hasNextPage === false // note: 显式指明
					? (
						<div className={'w-80 p-4 m-auto | flex items-center justify-center text-center | bg-destructive text-destructive-foreground'}>
							You have loaded ALL the data.
						</div>
					)
					: <ScrollTrigger trigger={query.fetchNextPage}/>
				}
			</div>
		
		
		</RootLayout>
	)
}


const HomeCarousel = () => {
	return (
		<Carousel
			className={clsx(
				'w-full md:w-[788px] mx-auto rounded-2xl',
			)}
			showThumbs={false}
			infiniteLoop
			autoPlay
			interval={3000}
			showStatus={false}
			centerMode={true}
			centerSlidePercentage={92}
			stopOnHover={false}
		>
			{
				carousals.map((item) => (
					<AspectRatio ratio={2} key={item.title}>
						<Image src={item.src} className={'object-cover object-bottom'} alt={item.src} fill sizes={'w-full rounded-2xl'}/>
						<p className="legend">{item.title}</p>
					</AspectRatio>
				))
			}
		</Carousel>
	)
}


const AppCardViewInExplore = ({ convs, app }: {
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


const ScrollTrigger = ({ trigger }: {
	trigger: any
}) => {
	const { ref, entry } = useIntersection({ rootMargin: '400px' })
	
	useEffect(() => {
		if (entry?.isIntersecting) {
			trigger()
		} else {
			// 取消触底（往回拉）
		}
	}, [entry?.isIntersecting])
	return (
		<p
			ref={ref}
			className={clsx(
				'm-auto px-16 py-8 rounded-2xl flex-center shrink-0',
				' text-primary-foreground bg-card font-bold animate-pulse',
			)}>
			{entry?.isIntersecting && 'Loading More Data ...'}
		</p>
	)
}
