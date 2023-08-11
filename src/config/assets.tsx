import React from 'react'

import CSCoin from '@/../public/images/cs-coin.svg'
import Logo from '../../public/images/logo/m/1280.svg'
import OpenchatIcon from '@/../public/brands/openchat.svg'
import MidjourneyIcon from '@/../public/brands/midjourney.svg'
import localFont from 'next/font/local'
import { SVGFactory, type SVGProps } from '@/components/utils/assets'

import { Inter } from 'next/font/google'

export const ICON_DIMENSION_SM = 'wh-4'
export const ICON_DIMENSION_MD = 'wh-8'
export const ICON_DIMENSION_LG = 'wh-12'

export const Icons = {
	logo: (props: SVGProps) => <SVGFactory Comp={Logo} presetClassName={'bg-black text-white'} {...props}/>,
	csCoin: (props: SVGProps) => <SVGFactory Comp={CSCoin} {...props}/>,
	openchat: (props: SVGProps) => <SVGFactory Comp={OpenchatIcon}  {...props}/>,
	midjourney: (props: SVGProps) => <SVGFactory Comp={MidjourneyIcon}  {...props}/>,
}

const interFont = Inter({ subsets: ['latin'] })
export const font = localFont({
	src: [
		// { path: '../../public/fonts/weilaiyinghei/GlowSansSC-Normal-v0.93/GlowSansSC-Normal-Thin.otf', weight: '100', style: 'normal' },
		// { path: '../../public/fonts/weilaiyinghei/GlowSansSC-Normal-v0.93/GlowSansSC-Normal-ExtraLight.otf', weight: '200', style: 'normal' },
		// { path: '../../public/fonts/weilaiyinghei/GlowSansSC-Normal-v0.93/GlowSansSC-Normal-Light.otf', weight: '300', style: 'normal' },
		// { path: '../../public/fonts/weilaiyinghei/GlowSansSC-Normal-v0.93/GlowSansSC-Normal-Regular.otf', weight: '400', style: 'normal' },
		// { path: '../../public/fonts/weilaiyinghei/GlowSansSC-Normal-v0.93/GlowSansSC-Normal-Book.otf', weight: '500', style: 'normal' },
		{ path: '../../public/fonts/weilaiyinghei/GlowSansSC-Normal-v0.93/GlowSansSC-Normal-Medium.otf', weight: '600', style: 'normal' },
		// { path: '../../public/fonts/weilaiyinghei/GlowSansSC-Normal-v0.93/GlowSansSC-Normal-Bold.otf', weight: '700', style: 'normal' },
		// { path: '../../public/fonts/weilaiyinghei/GlowSansSC-Normal-v0.93/GlowSansSC-Normal-ExtraBold.otf', weight: '800', style: 'normal' },
		// { path: '../../public/fonts/weilaiyinghei/GlowSansSC-Normal-v0.93/GlowSansSC-Normal-Heavy.otf', weight: '900', style: 'normal' },
	],
	fallback: ['system-ui', 'arial'],
})
