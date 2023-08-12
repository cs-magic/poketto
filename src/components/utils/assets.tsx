import { IconCalendarFilled, IconDownload, IconStackPush, IconTelescope, IconThumbUp, IconTrendingUp, type TablerIconsProps } from '@tabler/icons-react'
import React, { type ElementType, type HTMLProps } from 'react'
import { clsx } from 'clsx'
import Image, { type ImageProps } from 'next/image'
import { ICON_DIMENSION_SM } from '@/config/assets'


import { FlowGPTSortOrder } from '@/ds/flowgpt'

// todo: avoid alt
type ImageProps_ = Omit<ImageProps, 'src' | 'alt'>
export const ImageFactory = ({ src, alt, className = '', ...props }: ImageProps) =>
	<Image src={src} alt={alt} className={clsx(ICON_DIMENSION_SM, className)} {...props}/>

export type TablerIconProps = Omit<TablerIconsProps, ''>
export const TablerIconFactory = ({ Comp, presetClassName = '', className = '', ...props }: TablerIconsProps & {
	Comp: ElementType
	presetClassName?: string
}) =>
	<Comp className={clsx(ICON_DIMENSION_SM, presetClassName, className)} {...props}/>

export type SVGProps = Omit<HTMLProps<SVGSVGElement>, ''>
export const SVGFactory = ({ Comp, presetClassName = '', className = '', ...props }: HTMLProps<SVGSVGElement> & {
	Comp: ElementType
	presetClassName?: string
}) =>
	<Comp className={clsx(ICON_DIMENSION_SM, presetClassName, className)} {...props}/>

export const order2icon: Record<FlowGPTSortOrder, JSX.ElementType> = {
	[FlowGPTSortOrder.recommended]: (props: TablerIconsProps) => <TablerIconFactory Comp={IconStackPush} {...props}/>,
	[FlowGPTSortOrder.top]: (props: TablerIconsProps) => <TablerIconFactory Comp={IconThumbUp} {...props}/>,
	[FlowGPTSortOrder.mostSaved]: (props: TablerIconsProps) => <TablerIconFactory Comp={IconDownload} {...props}/>,
	[FlowGPTSortOrder.trending]: (props: TablerIconsProps) => <TablerIconFactory Comp={IconTrendingUp} {...props}/>,
	[FlowGPTSortOrder.new]: (props: TablerIconsProps) => <TablerIconFactory Comp={IconCalendarFilled} {...props}/>,
	[FlowGPTSortOrder.follow]: (props: TablerIconsProps) => <TablerIconFactory Comp={IconTelescope} {...props}/>,
}
