import React, { type PropsWithChildren, ReactNode, useEffect } from "react"
import Navbar from "@/layouts/navbar"
import { useMount } from "@/hooks/use-mount"
import clsx from "@/lib/clsx"
import { navs, URI } from "@/config"
import { FooterNavItem } from "@/components/link"
import { useUserId } from "@/hooks/use-user"
import { api } from "@/lib/api"
import { useAppStore } from "@/store"

import { Sidebar } from "@/layouts/sidebar"

export const MobileLayout = (props: PropsWithChildren) => {
  return (
    <div className={"| flex h-full w-full flex-col overflow-hidden md:hidden"}>
      <Navbar />

      <div className={"| flex h-full grow flex-col items-center justify-center gap-2 overflow-hidden"}>{props.children}</div>

      <footer className={"grid shrink-0 grid-cols-4"}>
        <FooterNavItem {...navs.home} />
        <FooterNavItem {...navs.explore} />
        <FooterNavItem {...navs.gallery} />
        <FooterNavItem {...navs.dashboard} />
      </footer>
    </div>
  )
}

export const DesktopLayout = (props: PropsWithChildren) => {
  return (
    <div className={clsx("hidden h-full w-full flex-col md:flex", "overflow-hidden")}>
      <Navbar />
      <div className={clsx("flex grow divide-x", "overflow-hidden")}>
        <Sidebar />
        <div className={clsx("flex h-full grow flex-col items-center justify-center gap-2", "overflow-hidden")}>{props.children}</div>
      </div>
    </div>
  )
}

export function RootLayout({ children }: PropsWithChildren) {
  const mounted = useMount()

  // useEffect(() => {
  //   const path = window.location.hash
  //   if (path && path.includes("#")) {
  //     const id = path.replace("#", "")
  //     const el = window.document.getElementById(id)
  //     console.log({ path, id, el })
  //     if (el) {
  //       const r = el.getBoundingClientRect()
  //       window.scrollTo({
  //         top: r.top,
  //         behavior: "smooth",
  //       })
  //     }
  //   }
  // })

  if (!mounted) return null

  return (
    <>
      <MobileLayout>{children}</MobileLayout>
      <DesktopLayout>{children}</DesktopLayout>
    </>
  )
}
