import React, { type ElementType, type HTMLProps } from 'react'

import CSCoin from '@/../public/images/cs-coin.svg'
import Logo from '../../public/images/logo/m/1280.svg'
import OpenchatIcon from '@/../public/brands/openchat.svg'
import MidjourneyIcon from '@/../public/brands/midjourney.svg'

import { clsx } from 'clsx'
import Image, { type ImageProps } from 'next/image'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { user } from '@/config/app'
import { IconCalendarFilled, IconDownload, IconStackPush, IconTelescope, IconThumbUp, IconTrendingUp, type TablerIconsProps } from '@tabler/icons-react'
import { SortOrder } from '@/ds/flowgpt'
import localFont from 'next/font/local'

export const ICON_DIMENSION_SM = 'wh-4'
export const ICON_DIMENSION_MD = 'wh-8'
export const ICON_DIMENSION_LG = 'wh-12'

// todo: avoid alt
export const ImageFactory = ({ src, alt, className = '', ...props }: ImageProps) =>
	<Image src={src} alt={alt} className={clsx(ICON_DIMENSION_SM, className)} {...props}/>
type ImageProps_ = Omit<ImageProps, 'src' | 'alt'>

export const TablerIconFactory = ({ Comp, presetClassName = '', className = '', ...props }: TablerIconsProps & {
	Comp: ElementType
	presetClassName?: string
}) =>
	<Comp className={clsx(ICON_DIMENSION_SM, presetClassName, className)} {...props}/>
export type TablerIconProps = Omit<TablerIconsProps, ''>

export const SVGFactory = ({ Comp, presetClassName = '', className = '', ...props }: HTMLProps<SVGSVGElement> & {
	Comp: ElementType
	presetClassName?: string
}) =>
	<Comp className={clsx(ICON_DIMENSION_SM, presetClassName, className)} {...props}/>
export type SVGProps = Omit<HTMLProps<SVGSVGElement>, ''>

export const Assets = {
	logo: (props: SVGProps) => <SVGFactory Comp={Logo} presetClassName={'bg-black text-white'} {...props}/>,
	csCoin: (props: SVGProps) => <SVGFactory Comp={CSCoin} {...props}/>,
	openchat: (props: SVGProps) => <SVGFactory Comp={OpenchatIcon}  {...props}/>,
	midjourney: (props: SVGProps) => <SVGFactory Comp={MidjourneyIcon}  {...props}/>,
}

export const SelfUserAvatar = () => {
	return (
		<Avatar className={ICON_DIMENSION_MD}>
			<AvatarImage src={user.avatar}/>
			<AvatarFallback>{user.name}</AvatarFallback>
		</Avatar>
	)
}

export const order2icon: Record<SortOrder, JSX.ElementType> = {
	[SortOrder.recommended]: (props: TablerIconsProps) => <TablerIconFactory Comp={IconStackPush} {...props}/>,
	[SortOrder.top]: (props: TablerIconsProps) => <TablerIconFactory Comp={IconThumbUp} {...props}/>,
	[SortOrder.mostSaved]: (props: TablerIconsProps) => <TablerIconFactory Comp={IconDownload} {...props}/>,
	[SortOrder.trending]: (props: TablerIconsProps) => <TablerIconFactory Comp={IconTrendingUp} {...props}/>,
	[SortOrder.new]: (props: TablerIconsProps) => <TablerIconFactory Comp={IconCalendarFilled} {...props}/>,
	[SortOrder.follow]: (props: TablerIconsProps) => <TablerIconFactory Comp={IconTelescope} {...props}/>,
}

export const font = localFont({
	src: [
		{ path: '../../public/fonts/weilaiyinghei/GlowSansSC-Normal-v0.93/GlowSansSC-Normal-Thin.otf', weight: '100', style: 'normal' },
		{ path: '../../public/fonts/weilaiyinghei/GlowSansSC-Normal-v0.93/GlowSansSC-Normal-ExtraLight.otf', weight: '200', style: 'normal' },
		{ path: '../../public/fonts/weilaiyinghei/GlowSansSC-Normal-v0.93/GlowSansSC-Normal-Light.otf', weight: '300', style: 'normal' },
		{ path: '../../public/fonts/weilaiyinghei/GlowSansSC-Normal-v0.93/GlowSansSC-Normal-Regular.otf', weight: '400', style: 'normal' },
		{ path: '../../public/fonts/weilaiyinghei/GlowSansSC-Normal-v0.93/GlowSansSC-Normal-Book.otf', weight: '500', style: 'normal' },
		{ path: '../../public/fonts/weilaiyinghei/GlowSansSC-Normal-v0.93/GlowSansSC-Normal-Medium.otf', weight: '600', style: 'normal' },
		{ path: '../../public/fonts/weilaiyinghei/GlowSansSC-Normal-v0.93/GlowSansSC-Normal-Bold.otf', weight: '700', style: 'normal' },
		{ path: '../../public/fonts/weilaiyinghei/GlowSansSC-Normal-v0.93/GlowSansSC-Normal-ExtraBold.otf', weight: '800', style: 'normal' },
		{ path: '../../public/fonts/weilaiyinghei/GlowSansSC-Normal-v0.93/GlowSansSC-Normal-Heavy.otf', weight: '900', style: 'normal' },
	],
})
