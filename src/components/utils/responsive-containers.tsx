import { clsx } from 'clsx'
import { HTMLProps, type PropsWithChildren } from 'react'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'

export const GridContainer = ({ children }: PropsWithChildren) => {
	return (
		<div className={clsx(
			'w-full gap-2',
			// 'flex flex-wrap justify-between items-center',
			'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5',
		)}>
			{children}
		</div>
	)
}

export const MasonryContainer = ({ children }: PropsWithChildren) => {
	return (
		<ResponsiveMasonry
			columnsCountBreakPoints={{ 300: 1, 600: 2, 900: 3, 1200: 4, 1500: 5 }}
		>
			<Masonry gutter={'1rem'}>
				{children}
			</Masonry>
		</ResponsiveMasonry>
	
	)
}
