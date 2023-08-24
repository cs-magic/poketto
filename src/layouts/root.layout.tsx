import React, { type PropsWithChildren } from "react"
import { useMount } from "@/hooks/use-mount"
// import clsx from "@/lib/clsx"

export const MobileLayout = (props: PropsWithChildren) => {
  return (
    <div className={"| flex h-full w-full flex-col overflow-hidden md:hidden"}>
      {/*<Navbar />*/}

      <div className={"| flex h-full grow flex-col items-center justify-center gap-2 overflow-hidden"}>{props.children}</div>

      <footer className={"grid shrink-0 grid-cols-4"}>
        {/*<FooterNavItem {...navs.home} />*/}
        {/*<FooterNavItem {...navs.explore} />*/}
        {/*<FooterNavItem {...navs.gallery} />*/}
        {/*<FooterNavItem {...navs.dashboard} />*/}
      </footer>
    </div>
  )
}

export const DesktopLayout = (props: PropsWithChildren) => {
  return (
    <div className={"hidden h-full w-full flex-col md:flex overflow-hidden"}>
      {/*<Navbar />*/}
      <div className={"flex grow divide-x overflow-hidden"}>
        {/*<Sidebar />*/}
        <div className={"flex h-full grow flex-col items-center justify-center gap-2 overflow-hidden"}>{props.children}</div>
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
