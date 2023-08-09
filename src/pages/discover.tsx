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
			
			{/* main (content - load more) */}
			<div className={'w-full h-full p-2 overflow-auto | flex flex-col gap-2'}>
				{/* content (carousel - cards)*/}
				<div className={'w-full | flex flex-wrap justify-center items-center gap-2'}>
					
					<Carousel
						className={clsx(
							'w-full md:w-[788px] rounded-2xl',
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
