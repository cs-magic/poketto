import React, { type PropsWithChildren, ReactNode, useEffect } from "react"
import { Sidebar } from "@/layouts/sidebar"
import Navbar from "@/layouts/navbar"
import { useMount } from "@/hooks/use-mount"
import { clsx } from "clsx"
import { navs, URI } from "@/config"
import { FooterNavItem } from "@/components/link"
import { useUserId } from "@/hooks/use-user"
import { api } from "@/lib/api"
import { useAppStore } from "@/store"

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
    <div className={"| hidden h-full w-full flex-col overflow-hidden md:flex"}>
      <Navbar />
      <div className="flex grow divide-x overflow-hidden">
        <Sidebar />
        <div className={"| flex h-full grow flex-col items-center justify-center gap-2 overflow-hidden"}>{props.children}</div>
      </div>
    </div>
  )
}

export function RootLayout({ children }: PropsWithChildren) {
  const mounted = useMount()
  if (!mounted) return null

  return (
    <>
      <MobileLayout>{children}</MobileLayout>
      <DesktopLayout>{children}</DesktopLayout>
    </>
  )
}
