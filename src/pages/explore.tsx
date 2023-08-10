import React, { Fragment } from 'react'
import { clsx } from 'clsx'
import { FlowgptAgentCard } from '@/components/flowgpt/card'
import { RootLayout } from '@/layouts/root.layout'
import { api } from '@/lib/api'
import { GridContainer, MasonryContainer } from '@/components/responsive-containers'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { CardsLayoutType, useStore } from '@/store'
import { ScrollTrigger } from '@/components/scroll-trigger'
import { SortOrder } from '@/ds/flowgpt'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import _ from 'lodash'
import { FrameIcon } from '@radix-ui/react-icons'
import { Skeleton } from '@/components/ui/skeleton'
import { order2icon } from '@/config/assets'

export const SelectCardsLayout = () => {
	const { cardsLayout, setCardsLayout } = useStore()
	
	// todo: in settings
	return (
		<Select value={cardsLayout} onValueChange={setCardsLayout}>
			<SelectTrigger className={'w-28 hidden md:flex'}>
				<SelectValue placeholder={'卡片布局'}/>
			</SelectTrigger>
			<SelectContent>
				{Object.values(CardsLayoutType).map((cl) => (
					<SelectItem value={cl} key={cl}>{cl}</SelectItem>
				))}
			</SelectContent>
		</Select>
	)
}

export const AgentsPage = () => {
	
	const { cardsLayout, order, setOrder } = useStore()
	const Container = cardsLayout === CardsLayoutType.grid ? GridContainer : MasonryContainer
	
	const query = api.flowgpt.listPrompts.useInfiniteQuery({ order }, {
		getNextPageParam: (lastPage, allPages) => lastPage.nextCursor, // 这个必须加
	})
	const items = query.data?.pages.flatMap((item) => item.data) ?? []
	console.log('[FlowGPT] ', items)
	return (
		<RootLayout>
			
			{/* main (content - load more) */}
			<div className={clsx(
				'w-full max-w-[1360px] h-full overflow-auto | flex flex-col gap-4',
			)}>
				
				{/*<HomeCarousel/>*/}
				
				{/* title */}
				<div className={'w-full px-2 | flex items-center gap-2 whitespace-nowrap '}>
					<FrameIcon/>
					<span className={'text-lg'}>玩法推荐</span>
					
					<div className={'grow'}/>
					<span className={'hidden md:block'}>Sort By</span>
					<div className={'flex items-center'}>
						{
							Object.values(SortOrder)
								.map((order) => {
									const Icon = order2icon[order]
									return (
										<Fragment key={order}>
											<Separator orientation={'vertical'} className={'h-4 first:hidden'}/>
											<Button
												className={'hover:bg-transparent px-2 flex items-center gap-1'}
												variant={'ghost'}
												key={order} onClick={() => {setOrder(order)}}>
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
					{items.map((item) => <FlowgptAgentCard {...item} key={item.id}/>)}
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

export default AgentsPage
