import React, { type ElementType, type HTMLProps } from "react"

import CSCoin from "../../public/images/cs-coin.svg"
import Logo from "../../public/images/logo/m/1280.svg"
import OpenchatIcon from "../../public/brands/openchat.svg"
import MidjourneyIcon from "../../public/brands/midjourney.svg"
import localFont from "next/font/local"

import { Inter } from "next/font/google"
import {
  IconCalendarFilled,
  IconDownload,
  IconStackPush,
  IconTelescope,
  IconThumbUp,
  IconTrendingUp,
  type TablerIconsProps,
} from "@tabler/icons-react"
import { clsx } from "clsx"

import { type SortOrder } from "@/ds"
import { EyeIcon } from "lucide-react"

export const ICON_DIMENSION_SM = "wh-4"
export const ICON_DIMENSION_MD = "wh-8"
export const ICON_DIMENSION_LG = "wh-12"

export const TablerIconFactory = ({
  Comp,
  presetClassName = "",
  className = "",
  ...props
}: TablerIconsProps & {
  Comp: ElementType
  presetClassName?: string
}) => <Comp className={clsx(ICON_DIMENSION_SM, presetClassName, className)} {...props} />
export type SVGProps = Omit<HTMLProps<SVGSVGElement>, "">
export const SVGFactory = ({
  Comp,
  presetClassName = "",
  className = "",
  ...props
}: HTMLProps<SVGSVGElement> & {
  Comp: ElementType
  presetClassName?: string
}) => <Comp className={clsx(ICON_DIMENSION_SM, presetClassName, className)} {...props} />
export const order2icon: Record<SortOrder, JSX.ElementType> = {
  recommend: (props: TablerIconsProps) => <TablerIconFactory Comp={IconStackPush} {...props} />,
  top: (props: TablerIconsProps) => <TablerIconFactory Comp={IconThumbUp} {...props} />,
  "most-saved": (props: TablerIconsProps) => <TablerIconFactory Comp={IconDownload} {...props} />,
  trending: (props: TablerIconsProps) => <TablerIconFactory Comp={IconTrendingUp} {...props} />,
  new: (props: TablerIconsProps) => <TablerIconFactory Comp={IconCalendarFilled} {...props} />,
  follow: (props: TablerIconsProps) => <TablerIconFactory Comp={IconTelescope} {...props} />,
  mostViewed: (props: TablerIconsProps) => <TablerIconFactory Comp={EyeIcon} {...props} />,
}
export const Icons = {
  logo: (props: SVGProps) => <SVGFactory Comp={Logo} presetClassName={"bg-black text-white"} {...props} />,
  csCoin: (props: SVGProps) => <SVGFactory Comp={CSCoin} {...props} />,
  openchat: (props: SVGProps) => <SVGFactory Comp={OpenchatIcon} {...props} />,
  midjourney: (props: SVGProps) => <SVGFactory Comp={MidjourneyIcon} {...props} />,
}

const interFont = Inter({ subsets: ["latin"] })
export const font = localFont({
  src: [
    // { path: '../../public/fonts/weilaiyinghei/GlowSansSC-Normal-v0.93/GlowSansSC-Normal-Thin.otf', weight: '100', style: 'normal' },
    // { path: '../../public/fonts/weilaiyinghei/GlowSansSC-Normal-v0.93/GlowSansSC-Normal-ExtraLight.otf', weight: '200', style: 'normal' },
    // { path: '../../public/fonts/weilaiyinghei/GlowSansSC-Normal-v0.93/GlowSansSC-Normal-Light.otf', weight: '300', style: 'normal' },
    // { path: '../../public/fonts/weilaiyinghei/GlowSansSC-Normal-v0.93/GlowSansSC-Normal-Regular.otf', weight: '400', style: 'normal' },
    // { path: '../../public/fonts/weilaiyinghei/GlowSansSC-Normal-v0.93/GlowSansSC-Normal-Book.otf', weight: '500', style: 'normal' },
    { path: "../../public/fonts/weilaiyinghei/GlowSansSC-Normal-v0.93/GlowSansSC-Normal-Medium.otf", weight: "600", style: "normal" },
    // { path: '../../public/fonts/weilaiyinghei/GlowSansSC-Normal-v0.93/GlowSansSC-Normal-Bold.otf', weight: '700', style: 'normal' },
    // { path: '../../public/fonts/weilaiyinghei/GlowSansSC-Normal-v0.93/GlowSansSC-Normal-ExtraBold.otf', weight: '800', style: 'normal' },
    // { path: '../../public/fonts/weilaiyinghei/GlowSansSC-Normal-v0.93/GlowSansSC-Normal-Heavy.otf', weight: '900', style: 'normal' },
  ],
  fallback: ["system-ui", "arial"],
})
