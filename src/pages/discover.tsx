import React, { useEffect } from 'react'
import { useIntersection } from '@mantine/hooks'
import { clsx } from 'clsx'
import { FlowgptAgentCard } from '@/components/flowgpt/agent.card'
import { RootLayout } from '@/layouts/root.layout'
import { api } from '@/utils/api'
import { HomeCarousel } from '@/components/home.carousel'
import { IconArrowBadgeDownFilled, IconAsterisk } from '@tabler/icons-react'


export const AgentsPage = () => {
	
	const query = api.flowgpt.listPrompts.useInfiniteQuery({ order: undefined }, {
		getNextPageParam: (lastPage, allPages) => lastPage.nextCursor, // 这个必须加
	})
	const { ref, entry } = useIntersection({
		// root: containerRef.current, // 不指定就是 window
		rootMargin: '400px',
	})
	
	useEffect(() => {
		if (entry?.isIntersecting) {
			// 触底，准备获取数据
			query.fetchNextPage()
				.catch(console.error)
		} else {
			// 取消触底（往回拉）
		}
	}, [entry?.isIntersecting])
	
	
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
				</div>
				
				{/* content (carousel - cards)*/}
				<div className={clsx(
					'w-full gap-2',
					// 'flex flex-wrap justify-between items-center',
					'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
				)}>
					
					{(query.data?.pages.flatMap((item) => item.data) ?? []).map((item) => (
						<FlowgptAgentCard {...item} key={item.id}/>
					))}
					{/*// <div className={'w-40 h-60 bg-accent'} key={item.id}/>*/}
				</div>
				
				{/* load more*/}
				<p
					ref={ref}
					className={clsx(
						'm-auto px-16 py-8 rounded-2xl flex-center shrink-0',
						' text-primary-foreground bg-card font-bold  animate-pulse',
					)}>
					{entry?.isIntersecting && 'Loading More Data ...'}
				</p>
			</div>
		
		
		</RootLayout>
	)
}

export default AgentsPage
