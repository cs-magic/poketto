import { IconCalendarFilled, IconDownload, IconStackPush, IconTelescope, IconThumbUp, IconTrendingUp, type TablerIconsProps } from '@tabler/icons-react'
import React, { type ElementType, type HTMLProps } from 'react'
import { clsx } from 'clsx'
import Image, { type ImageProps } from 'next/image'
import { ICON_DIMENSION_SM } from '@/config/assets'
import { SortOrder } from '@/ds/flowgpt'

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
export const order2icon: Record<SortOrder, JSX.ElementType> = {
	[SortOrder.recommended]: (props: TablerIconsProps) => <TablerIconFactory Comp={IconStackPush} {...props}/>,
	[SortOrder.top]: (props: TablerIconsProps) => <TablerIconFactory Comp={IconThumbUp} {...props}/>,
	[SortOrder.mostSaved]: (props: TablerIconsProps) => <TablerIconFactory Comp={IconDownload} {...props}/>,
	[SortOrder.trending]: (props: TablerIconsProps) => <TablerIconFactory Comp={IconTrendingUp} {...props}/>,
	[SortOrder.new]: (props: TablerIconsProps) => <TablerIconFactory Comp={IconCalendarFilled} {...props}/>,
	[SortOrder.follow]: (props: TablerIconsProps) => <TablerIconFactory Comp={IconTelescope} {...props}/>,
}
