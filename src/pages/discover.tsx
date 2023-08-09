import React, { useEffect } from 'react'
import { useIntersection } from '@mantine/hooks'
import { clsx } from 'clsx'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import { FlowgptAgentCard } from '@/components/flowgpt/agent.card'
import { Carousel } from 'react-responsive-carousel'
import Image from 'next/image'
import { carousals } from '@/config'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { RootLayout } from '@/layouts/root.layout'
import { api } from '@/utils/api'

import 'react-responsive-carousel/lib/styles/carousel.min.css'


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
			
			<div className={'w-full h-full p-2 overflow-auto | flex flex-col gap-2'}>
				<Carousel showThumbs={false}
				          infiniteLoop
				          autoPlay
				          interval={3000}
				          className={clsx(
					          'rounded-2xl',
				          )}
				          showStatus={false}
				          centerMode={true}
				          centerSlidePercentage={92}
				          stopOnHover={false}
				>
					{
						carousals.map((item) => (
							<div key={item.src} className={'rounded-2xl'}>
								<AspectRatio ratio={16 / 5} className={'rounded-2xl'}>
									<Image src={item.src} className={'object-cover object-bottom'} alt={item.src} fill sizes={'w-full rounded-2xl'}/>
								</AspectRatio>
								<p className="legend">{item.title}</p>
							</div>
						))
					}
				</Carousel>
				
				<div className={'w-full | flex flex-col gap-2'}>
					
					<ResponsiveMasonry
						columnsCountBreakPoints={{ 360: 1, 1000: 2, 1440: 3, 1700: 4 }}
					>
						<Masonry gutter={'1rem'}>
							
							{(query.data?.pages.flatMap((item) => item.data) ?? []).map((item) => (
								<FlowgptAgentCard {...item} key={item.id}/>
							))}
						</Masonry>
					</ResponsiveMasonry>
					
					<p
						ref={ref}
						className={clsx(
							'm-auto  px-16 py-8 rounded-2xl flex-center shrink-0',
							' text-primary-foreground bg-card font-bold  animate-pulse',
						)}>
						{entry?.isIntersecting && 'Loading More Data ...'}
					</p>
				
				</div>
			</div>
		
		
		</RootLayout>
	)
}

export default AgentsPage
