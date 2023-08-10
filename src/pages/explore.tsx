import React, { Fragment } from 'react'
import { clsx } from 'clsx'
import { FlowgptAgentCard } from '@/components/flowgpt/agent.card'
import { RootLayout } from '@/layouts/root.layout'
import { api } from '@/lib/api'
import { IconArrowBadgeDownFilled } from '@tabler/icons-react'
import { GridContainer, MasonryContainer } from '@/components/responsive-containers'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { CardsLayoutType, useStore } from '@/store'
import { ScrollTrigger } from '@/components/scroll-trigger'
import { SortOrder } from '@/ds/flowgpt'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import _ from 'lodash'
// import SelectDemo from '@/components/radix-ui/select.demo'


export const AgentsPage = () => {
	
	const { cardsLayout, setCardsLayout, order, setOrder } = useStore()
	const Container = cardsLayout === CardsLayoutType.grid ? GridContainer : MasonryContainer
	
	const query = api.flowgpt.listPrompts.useInfiniteQuery({ order }, {
		getNextPageParam: (lastPage, allPages) => lastPage.nextCursor, // 这个必须加
	})
	
	return (
		<RootLayout>
			
			{/* main (content - load more) */}
			<div className={clsx(
				'w-full max-w-[1360px] h-full p-2 overflow-auto | flex flex-col gap-4',
				// ' bg-cyan-800',
			)}>
				
				{/*<HomeCarousel/>*/}
				
				{/* title */}
				<div className={'w-full | flex items-center gap-2 | text-2xl text-muted-foreground '}>
					<IconArrowBadgeDownFilled/>
					<span>玩法推荐</span>
					
					<Select onValueChange={setCardsLayout}>
						<SelectTrigger className={'w-28'}>
							<SelectValue placeholder={'卡片布局'}/>
						</SelectTrigger>
						<SelectContent>
							{Object.values(CardsLayoutType).map((cl) => (
								<SelectItem value={cl} key={cl}>{cl}</SelectItem>
							))}
						</SelectContent>
					</Select>
					
					{/*<Select onValueChange={setOrder}>*/}
					{/*	<SelectTrigger className={'w-28'}>*/}
					{/*		<SelectValue placeholder={'排序指标'}/>*/}
					{/*	</SelectTrigger>*/}
					{/*	<SelectContent>*/}
					{/*		{Object.values(SortOrder).map((cl) => (*/}
					{/*			<SelectItem value={cl} key={cl}>{cl}</SelectItem>*/}
					{/*		))}*/}
					{/*	</SelectContent>*/}
					{/*</Select>*/}
					<div className={'grow'}/>
					<div className={'flex items-center'}>
						{
							Object.values(SortOrder)
								.map((order) => (
									<Fragment key={order}>
										<Separator orientation={'vertical'} className={'h-4 first:hidden'}/>
										<Button
											className={'hover:bg-transparent px-2'}
											variant={'ghost'}
											key={order} onClick={() => {setOrder(order)}}>
											{_.startCase(_.capitalize(order))}
										</Button>
									</Fragment>
								))
						}
					</div>
				</div>
				
				{/* content (carousel - cards)*/}
				
				<Container>
					{(query.data?.pages.flatMap((item) => item.data) ?? []).map((item) => (
						<FlowgptAgentCard {...item} key={item.id}/>
					))}
				</Container>
				
				{/* load more*/}
				<ScrollTrigger trigger={query.fetchNextPage}/>
			</div>
		
		
		</RootLayout>
	)
}

export default AgentsPage
