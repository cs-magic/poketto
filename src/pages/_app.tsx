import { type Session } from "next-auth"
import { SessionProvider } from "next-auth/react"
import { type AppType } from "next/app"
import { api } from "@/lib/api"
import React from "react"
import { ThemeProvider } from "next-themes"
import { Toaster } from "sonner"
import ErrorBoundary from "@/components/error-boundary"
import clsx from "clsx"

import "@/styles/globals.css"
import Head from "next/head"
import { PRODUCT } from "@/config"
// import { font } from "@/lib/assets"

const MyApp: AppType<{ session: Session | null }> = ({ Component, pageProps: { session, ...pageProps } }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme={"dark"}>
      <SessionProvider session={session}>
        <ErrorBoundary>
          <Head>
            <title>{PRODUCT.name}</title>
            <meta name="description" content={PRODUCT.desc} />
            <link rel="icon" href={PRODUCT.icon} />
          </Head>

          <main
            className={clsx(
              "| | flex h-screen w-screen flex-col text-sm font-light text-foreground",
              "bg-background" // 'bg-zinc-900',
              // font.className
            )}
          >
            <Component {...pageProps} />
          </main>
        </ErrorBoundary>
        <Toaster />
      </SessionProvider>
    </ThemeProvider>
  )
}

export default api.withTRPC(MyApp)
