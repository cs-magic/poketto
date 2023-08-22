import { SessionProvider, useSession } from "next-auth/react"
import { api } from "@/lib/api"
import React from "react"
import { Toaster } from "sonner"
import ErrorBoundary from "@/components/error-boundary"
import clsx from "@/lib/clsx"

import "@/styles/globals.css"
import Head from "next/head"
import { siteConfig } from "@/config-const"
import { font } from "@/lib/assets"
import { type ExtendedAppProps } from "@/ds"
import { ThemeProvider } from "@/components/theme-provider"

const MyApp = ({ Component, pageProps: { session, ...pageProps } }: ExtendedAppProps) => {
  return (
    <>
      <Head>
        <title>{siteConfig.name}</title>
        <meta name="description" content={siteConfig.description} />
        {/* prevent screen scale when input, ref: https://github.com/vercel/next.js/issues/7176#issuecomment-487350103*/}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link rel="icon" href={siteConfig.icon} />
      </Head>

      <ThemeProvider>
        <SessionProvider session={session}>
          <ErrorBoundary>
            <main
              className={clsx(
                "max-w-screen h-screen w-auto min-w-[375px] bg-background text-sm font-light text-foreground", // 'bg-zinc-900',
                font.className
              )}
            >
              {/*{Component.auth ? (*/}
              {/*  <Auth>*/}
              <Component {...pageProps} />
              {/*</Auth>*/}
              {/*) : (*/}
              {/*  <Component {...pageProps} />*/}
              {/*)}*/}
            </main>
          </ErrorBoundary>
          <Toaster richColors closeButton position={"top-right"} />
        </SessionProvider>
      </ThemeProvider>
    </>
  )
}

export default api.withTRPC(MyApp)
//
// function Auth({ children }) {
//   // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
//   const { status } = useSession({ required: true })
//
//   if (status === "loading") {
//     return <div>Loading...</div>
//   }
//
//   return children
// }
