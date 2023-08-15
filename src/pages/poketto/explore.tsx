import React, { Fragment, useEffect } from 'react'
import clsx from 'clsx'
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
import { type AppWithRelation } from '@/ds/poketto'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { order2icon } from '@/config/assets'
import { useIntersection } from '@mantine/hooks'
import { AppCardView } from '@/components/app-card-view'
import log from '@/lib/log'
import { AppDetail } from '@/components/app-detail-view'


export default function ExplorePage() {
	
	const { cardsLayout, sortOrder, setSortOrder } = useAppStore()
	const Container = cardsLayout === CardsLayoutType.grid ? GridContainer : MasonryContainer
	
	const query = api.flowgpt.listPoketto.useInfiniteQuery({ sort: sortOrder }, {
		getNextPageParam: (lastPage, allPages) => lastPage.nextCursor, // 这个必须加
	})
	const apps = query.data?.pages.flatMap((item) => item.data) ?? []
	log.info('[FlowGPT] ', apps)
	
	return (<RootLayout>
		
		{/* main (content - load more) */}
		<div className={clsx('w-full p-4 lg:p-8 max-w-[1360px] h-full overflow-auto | flex flex-col gap-4')}>
			
			{/*<HomeCarousel/>*/}
			
			{/* title */}
			<div className={'w-full px-2 | flex items-center gap-2 whitespace-nowrap '}>
				<FrameIcon/>
				<span className={'text-lg'}>玩法推荐</span>
				
				<div className={'grow'}/>
				{/*<span className={'hidden md:block'}>Sort By</span>*/}
				<div className={'flex items-center'}>
					{Object.values(FlowGPTSortOrder)
						.map((order) => {
							const Icon = order2icon[order]
							return (<Fragment key={order}>
								<Separator orientation={'vertical'} className={'h-4 first:hidden'}/>
								<Button
									className={'hover:bg-transparent px-2 flex items-center gap-1'}
									variant={'ghost'}
									key={order} onClick={() => {setSortOrder(order)}}>
									<Icon className={''}/>
									<span className={'hidden lg:block'}>{_.startCase(_.capitalize(order))}</span>
								</Button>
							</Fragment>)
						})}
				</div>
			</div>
			
			{/* content (carousel - cards)*/}
			
			<Container>
				{apps.map((app) => (
					<Dialog key={app.id}>
						<DialogTrigger>
							<AppCardView app={app} cardsLayout={cardsLayout} sort={sortOrder}/>
						</DialogTrigger>
						
						<DialogContent className={'max-h-[80vh] overflow-auto'}>
							<AppDetail app={app} comments={[]}/>
						</DialogContent>
					</Dialog>
				))}
			</Container>
			
			{/* load more*/}
			{query.hasNextPage === false // note: 显式指明
				? (<div className={'w-80 p-4 m-auto | flex items-center justify-center text-center | bg-destructive text-destructive-foreground'}>
					You have loaded ALL the data.
				</div>) : <ScrollTrigger trigger={query.fetchNextPage}/>}
		</div>
	
	
	</RootLayout>)
}


const HomeCarousel = () => {
	return (<Carousel
		className={clsx('w-full md:w-[788px] mx-auto rounded-2xl')}
		showThumbs={false}
		infiniteLoop
		autoPlay
		interval={3000}
		showStatus={false}
		centerMode={true}
		centerSlidePercentage={92}
		stopOnHover={false}
	>
		{carousals.map((item) => (<AspectRatio ratio={2} key={item.title}>
			<Image src={item.src} className={'object-cover object-bottom'} alt={item.src} fill sizes={'w-full rounded-2xl'}/>
			<p className="legend">{item.title}</p>
		</AspectRatio>))}
	</Carousel>)
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
	return (<p
		ref={ref}
		className={clsx('m-auto px-16 py-8 rounded-2xl flex-center shrink-0', ' text-primary-foreground bg-card font-bold animate-pulse')}>
		{entry?.isIntersecting && 'Loading More Data ...'}
	</p>)
}
