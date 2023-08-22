import React, { ElementType } from "react"

import localFont from "next/font/local"
import Image, { type ImageProps } from "next/image"
import CSCoin from "../../public/images/cs-coin.svg"
import OpenchatIcon from "../../public/brands/openchat.svg"
import MidjourneyIcon from "../../public/brands/midjourney.svg"
import CatLogo from "../../public/images/logo/poketto/Your-Sole-Poketto.png"
import { Order2icon } from "@/components/icons"

// const interFont = Inter({ subsets: ["latin"] })
export const font = localFont({
  src: [
    // { path: '../../public/fonts/weilaiyinghei/GlowSansSC-Normal-v0.93/GlowSansSC-Normal-Thin.otf', weight: '100', style: 'normal' },
    // { path: '../../public/fonts/weilaiyinghei/GlowSansSC-Normal-v0.93/GlowSansSC-Normal-ExtraLight.otf', weight: '200', style: 'normal' },
    // { path: '../../public/fonts/weilaiyinghei/GlowSansSC-Normal-v0.93/GlowSansSC-Normal-Light.otf', weight: '300', style: 'normal' },
    // { path: '../../public/fonts/weilaiyinghei/GlowSansSC-Normal-v0.93/GlowSansSC-Normal-Regular.otf', weight: '400', style: 'normal' },
    // { path: '../../public/fonts/weilaiyinghei/GlowSansSC-Normal-v0.93/GlowSansSC-Normal-Book.otf', weight: '500', style: 'normal' },
    {
      path: "../../public/fonts/weilaiyinghei/GlowSansSC-Normal-v0.93/GlowSansSC-Normal-Medium.otf",
      weight: "600",
      style: "normal",
    },
    // { path: '../../public/fonts/weilaiyinghei/GlowSansSC-Normal-v0.93/GlowSansSC-Normal-Bold.otf', weight: '700', style: 'normal' },
    // { path: '../../public/fonts/weilaiyinghei/GlowSansSC-Normal-v0.93/GlowSansSC-Normal-ExtraBold.otf', weight: '800', style: 'normal' },
    // { path: '../../public/fonts/weilaiyinghei/GlowSansSC-Normal-v0.93/GlowSansSC-Normal-Heavy.otf', weight: '900', style: 'normal' },
  ],
  fallback: ["system-ui", "arial"],
})
