import { type HTMLProps, type PropsWithChildren, useCallback, useState } from 'react'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import clsx from 'clsx'

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

export const MarqueeContainer = ({ children, className, ...props }: PropsWithChildren & HTMLProps<HTMLDivElement>) => {
	// ref:
	// 1. https://play.tailwindcss.com/VJvK9YXBoB?layout=horizontal
	// 2. https://flowgpt.com/prompt/vqxUPqsxdZ1swXykpypj8?isModal=true
	const [isOverflow, setOverflow] = useState(false)
	const ref = useCallback((node: HTMLDivElement | null) => {
		if (node) {
			const { scrollWidth, offsetWidth } = node
			if (scrollWidth > offsetWidth)
				setOverflow(true)
		}
	}, [])
	
	return (
		<div ref={ref} className={clsx(
			'w-full overflow-hidden relative flex',
			!isOverflow && 'justify-center',
			className,
		)}
		     {...props}
		>
			<div className={clsx('whitespace-nowrap ', isOverflow && 'animate-marquee ')}>{children}</div>
			{isOverflow && <div className={'absolute top-0 animate-marquee2'}>{children}</div>}
		</div>
	)
}
