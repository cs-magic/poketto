import { clsx } from 'clsx'
import { HTMLProps, type PropsWithChildren } from 'react'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'

export const GridContainer = ({ children }: PropsWithChildren) => {
	return (
		<div className={clsx(
			'w-full gap-2',
			// 'flex flex-wrap justify-between items-center',
			'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
		)}>
			{children}
		</div>
	)
}

export const MasonryContainer = ({ children }: PropsWithChildren) => {
	return (
		<ResponsiveMasonry
			columnsCountBreakPoints={{ 360: 1, 1000: 2, 1440: 3, 1700: 4 }}
		>
			<Masonry gutter={'1rem'}>
				{children}
			</Masonry>
		</ResponsiveMasonry>
	
	)
}
