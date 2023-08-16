import React, { type HTMLProps, type PropsWithChildren, type ReactNode, useCallback, useState } from 'react'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import { type DEVICE_TYPE, DEVICES } from '@/config'
import clsx from 'clsx'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { AppDetail } from '@/components/app-detail-view'
import { type AppWithRelation } from '@/ds'

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

export const DeviceContainerInner = ({ height, width, ratio = 1, children }: PropsWithChildren & {
	height: number
	width: number
	ratio?: number
}) => {
	return (
		<div style={{ height: height * ratio, width: width * ratio }} className={'overflow-hidden shrink-0'}>
			<div className={'origin-top-left'} style={{ transform: `scale(${ratio})` }}>
				{children}
			</div>
		</div>
	)
}

export const DeviceContainer = ({ device = 'iphone-14-pro', ratio = 1, children }: PropsWithChildren & {
	device?: DEVICE_TYPE
	ratio?: number
}) => {
	const { w, h, r = 68 } = DEVICES[device]
	return (
		<DeviceContainerInner width={w} height={h} ratio={ratio}>
			<div className={clsx('device', `device-${device}`)}>
				<div className="device-frame">
					{/* ref: https://codesandbox.io/s/react-phone-mockup-slider-wsdy5?file=/src/App.js:1232-1296 */}
					<div className={'w-full h-full overflow-hidden bg-white'} style={{ borderRadius: r }}>
						{children}
					</div>
				</div>
				<div className="device-stripe "></div>
				<div className="device-header "></div>
				<div className="device-sensors "></div>
				<div className="device-btns "></div>
				<div className="device-power "></div>
			</div>
		</DeviceContainerInner>
	)
}


export const AppContainer = ({ app, view }: { app: AppWithRelation, view: ReactNode }) => {
	return (
		<Dialog>
			<DialogTrigger asChild>{view}</DialogTrigger>
			<DialogContent>
				<AppDetail app={app} comments={[]}/>
			</DialogContent>
		</Dialog>
	)
}
