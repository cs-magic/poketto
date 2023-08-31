/**
 * Copyright (c) CS-Magic, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import "./styles.css"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { type PropsWithChildren } from "react"

import { siteConfig } from "@/config"

import { getOrigin } from "@/lib/edge"

export const metadata: Metadata = {
  metadataBase: new URL(getOrigin()),
  title: {
    default: "TypeScript Next.js Stripe Example",
    template: "%s | Next.js + TypeScript Example",
  },
  twitter: {
    card: "summary_large_image",
    description: "Full-stack TypeScript example using Next.js, react-stripe-js, and stripe-node.",
    images: [
      {
        url: "https://nextjs-typescript-react-stripe-js.vercel.app/social_card.png",
      },
    ],
    site: "@StripeDev",
    title: "TypeScript Next.js Stripe Example",
  },
}

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body>
        <div className="container">
          <header>
            <div className="header-content">
              <div className="inline-flex items-center gap-8 flex-nowrap">
                {/* <span className="light">Donate 🍩 to  ️</span> */}
                <h1>{siteConfig.name}</h1>
                <Link href="/" className="shrink-0 inline-flex items-center justify-center">
                  <Image width={24} height={24} src="/logo.png" alt="logo" />
                </Link>
              </div>
            </div>
          </header>
          {children}
        </div>
        <div className="banner">
          <span>
            Powered by{" "}
            <a href="https://stripe.com" target="_blank" rel="noreferrer">
              stripe
            </a>
          </span>
        </div>
      </body>
    </html>
  )
}
