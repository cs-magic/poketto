/**
 * Copyright (c) CS-Magic, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { SessionProvider } from "next-auth/react"
import Head from "next/head"
import React from "react"
import { Toaster } from "sonner"

import { siteConfig } from "@/config"

import { type ExtendedAppProps } from "@/ds"

import ErrorBoundary from "@/components/error-boundary"
import { ThemeProvider } from "@/components/theme-provider"
import { TooltipProvider } from "@/components/ui/tooltip"

import { api } from "@/lib/api"
import clsx from "@/lib/clsx"

import "@/styles/globals.css"

export function reportWebVitals(metric) {
  console.log(metric)
}

function MyApp({ Component, pageProps: { session, ...pageProps } }: ExtendedAppProps) {
  return (
    <>
      <Head>
        <title>{siteConfig.name}</title>
        <meta name="description" content={siteConfig.description} />
        {/* prevent screen scale when input, ref: https://github.com/vercel/next.js/issues/7176#issuecomment-487350103 */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link rel="icon" href={siteConfig.icon} />
      </Head>

      <ThemeProvider>
        <SessionProvider session={session}>
          <ErrorBoundary>
            <TooltipProvider>
              <main
                className={clsx(
                  "min-w-[375px] max-w-screen w-auto | bg-background text-foreground text-sm font-light" // 'bg-zinc-900',
                  // fontChinese.className
                )}
              >
                <Component {...pageProps} />
              </main>
            </TooltipProvider>
          </ErrorBoundary>
          <Toaster richColors closeButton position="top-right" />
        </SessionProvider>
      </ThemeProvider>
    </>
  )
}

export default api.withTRPC(MyApp)
