import React from 'react'
import { clsx } from 'clsx'
import { FlowgptAgentCard } from '@/components/flowgpt/agent.card'
import { RootLayout } from '@/layouts/root.layout'
import { api } from '@/utils/api'
import { HomeCarousel } from '@/components/home.carousel'
import { IconArrowBadgeDownFilled } from '@tabler/icons-react'
import { GridContainer, MasonryContainer } from '@/layouts/responsive-containers'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { CardsLayoutType, DataDimension, useStore } from '@/store'
import { ScrollTrigger } from '@/components/scroll-trigger'


export const AgentsPage = () => {
	
	const query = api.flowgpt.listPrompts.useInfiniteQuery({ order: undefined }, {
		getNextPageParam: (lastPage, allPages) => lastPage.nextCursor, // 这个必须加
	})
	
	const { cardsLayout, setCardsLayout, rank, setRank } = useStore()
	const Container = cardsLayout === CardsLayoutType.grid ? GridContainer : MasonryContainer
	
	
	return (
		<RootLayout>
			
			{/* main (content - load more) */}
			<div className={clsx(
				'w-full max-w-[1360px] h-full p-2 overflow-auto | flex flex-col gap-4',
				// ' bg-cyan-800',
			)}>
				
				<HomeCarousel/>
				
				{/* title */}
				<div className={'flex items-center gap-2 | text-2xl text-muted-foreground '}>
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
					
					<Select onValueChange={setCardsLayout}>
						<SelectTrigger className={'w-28'}>
							<SelectValue placeholder={'排序指标'}/>
						</SelectTrigger>
						<SelectContent>
							{Object.values(DataDimension).map((cl) => (
								<SelectItem value={cl} key={cl}>{cl}</SelectItem>
							))}
						</SelectContent>
					</Select>
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
