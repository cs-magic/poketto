import React, { Fragment } from 'react'
import { clsx } from 'clsx'
import { PocketCardView } from '@/components/card.view'
import { RootLayout } from '@/layouts/root.layout'
import { api } from '@/lib/api'
import { GridContainer, MasonryContainer } from '@/components/utils/containers'
import { CardsLayoutType, useStore } from '@/store'
import { ScrollTrigger } from '@/components/utils/scroll-trigger'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import _ from 'lodash'
import { FrameIcon } from '@radix-ui/react-icons'


import { order2icon } from '@/components/utils/assets'

import { FlowGPTSortOrder } from '@/ds/flowgpt'

export default function ExplorePage() {
	
	const { cardsLayout, sort, setSortOrder } = useStore()
	const Container = cardsLayout === CardsLayoutType.grid ? GridContainer : MasonryContainer
	
	const query = api.poketto.listPoketto.useInfiniteQuery({ sort }, {
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
					{items.map((item) => <PocketCardView {...item} key={item.id}/>)}
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

