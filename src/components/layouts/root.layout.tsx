"use client"

import React, { type PropsWithChildren, useEffect } from "react"
import Navbar from "src/components/layouts/navbar"

import { useAppStore } from "@/store"

import { menuGroups } from "@/config"

import { MenuItems } from "@/components/icons"
import { Sidebar } from "@/components/layouts/sidebar"
import { FooterNavItem } from "@/components/link"

import { useMount } from "@/hooks/use-mount"
import { useUser } from "@/hooks/use-user"

export const Footer = () => (
  <footer className="w-full shrink-0 | grid grid-cols-4">
    {menuGroups
      .mobileFooters!.map((f) => MenuItems.find((i) => i.field === f)!)
      .map((k) => (
        <FooterNavItem key={k.field} {...k} />
      ))}
  </footer>
)

export function MobileLayout(props: PropsWithChildren) {
  const { fullscreen } = useAppStore()

  return (
    <div className="md:hidden | h-full w-full | flex flex-col">
      {!fullscreen && <Navbar />}

      <div className="w-full grow overflow-auto | flex flex-col items-center gap-2">{props.children}</div>

      {!fullscreen && <Footer />}
    </div>
  )
}

export function DesktopLayout(props: PropsWithChildren) {
  const { setSearchOpen } = useAppStore()

  /**
   * 快速搜索（全局）， from gpt4
   * 不能用 mantine 的 useHotkey，因为它不是全局的
   */
  React.useEffect(() => {
    function handleKeyDownCapture(event: KeyboardEvent) {
      // console.log("in layout: ", event)
      if (event.metaKey && event.key === "k") {
        setSearchOpen(true)
        // 要两个结合
        event.stopPropagation()
        event.preventDefault()
      }
    }

    // The third parameter 'true' means we're using the capturing phase
    window.addEventListener("keydown", handleKeyDownCapture, true)

    return () => {
      window.removeEventListener("keydown", handleKeyDownCapture, true)
    }
  }, [])

  return (
    <div className="hidden h-full w-full flex-col md:flex overflow-hidden">
      <Navbar />
      <div className="flex grow divide-x overflow-hidden">
        <Sidebar />
        <div className="flex h-full grow flex-col items-center gap-2 overflow-auto">{props.children}</div>
      </div>
    </div>
  )
}

export function RootLayout({ children }: PropsWithChildren) {
  const mounted = useMount()

  /**
   * set height for mobile browser (safari, chrome ...) to be full of inner height (but invalid !)
   */
  useEffect(() => {
    const setInnerHeight = () => {
      console.log("add setInnerHeight")
      document.documentElement.style.setProperty("--app-height", `${window.innerHeight}px`)
    }
    window.addEventListener("resize", setInnerHeight)

    setInnerHeight()
    return () => {
      console.log("remove setInnerHeight")
      window.removeEventListener("resize", setInnerHeight)
    }
  }, [])

  const { user } = useUser()
  // console.log({ user })

  if (!mounted) {
    return null
  }

  return (
    <>
      <MobileLayout>{children}</MobileLayout>
      <DesktopLayout>{children}</DesktopLayout>
    </>
  )
}
