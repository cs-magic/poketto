import React, { type ElementType, type HTMLProps } from 'react'

import CSCoin from '@/../public/images/cs-coin.svg'
import Logo from '../../public/images/logo/m/1280.svg'
import OpenchatIcon from '@/../public/brands/openchat.svg'

// import OpenchatIcon from '@/../public/brands/openchat.png'
import MidjourneyIcon from '@/../public/brands/midjourney.png'

import { clsx } from 'clsx'
import Image, { type ImageProps } from 'next/image'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { user } from '@/config/app'

export const ICON_DIMENSION_SM = 'wh-4'
export const ICON_DIMENSION_MD = 'wh-8'
export const ICON_DIMENSION_LG = 'wh-12'

// todo: avoid alt
export const ImageFactory = ({ src, alt, className = '', ...props }: ImageProps) =>
	<Image src={src} alt={alt} className={clsx(ICON_DIMENSION_SM, className)} {...props}/>
type ImageProps_ = Omit<ImageProps, 'src' | 'alt'>

export const SVGFactory = ({ Comp, presetClassName = '', className = '', ...props }: HTMLProps<SVGSVGElement> & {
	Comp: ElementType
	presetClassName?: string
}) =>
	<Comp className={clsx(ICON_DIMENSION_SM, presetClassName, className)} {...props}/>
export type SVGProps = Omit<HTMLProps<SVGSVGElement>, ''>

export const Icons = {
	logo: (props: SVGProps) => <SVGFactory Comp={Logo} presetClassName={'bg-black text-white'} {...props}/>,
	csCoin: (props: SVGProps) => <SVGFactory Comp={CSCoin} {...props}/>,
	openchat: (props: SVGProps) => <SVGFactory Comp={OpenchatIcon}  {...props}/>,
	
	midjourney: (props: ImageProps_) => <ImageFactory src={MidjourneyIcon} alt={'MidJourney'} {...props}/>,
}

export const SelfUserAvatar = () => {
	return (
		<Avatar className={ICON_DIMENSION_MD}>
			<AvatarImage src={user.avatar}/>
			<AvatarFallback>{user.name}</AvatarFallback>
		</Avatar>
	)
}
