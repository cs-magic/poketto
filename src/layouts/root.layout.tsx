import Head from "next/head"
import React, { type PropsWithChildren } from "react"
import { Sidebar } from "@/layouts/sidebar"
import Navbar from "@/layouts/navbar"
import { useMount } from "@/hooks/use-mount"
import { product } from "@/config"

export function RootLayout(props: PropsWithChildren) {
  const mounted = useMount()

  return (
    <>
      <Navbar />
      {!mounted ? (
        <div className={"| flex w-full grow items-center justify-center"}>Loading...</div> // !IMPORTANT: avoid persistence ssr
      ) : (
        <div className={"| flex grow divide-x overflow-hidden"}>
          <Sidebar />
          <div className={"| flex h-full grow flex-col items-center justify-center gap-2 overflow-hidden"}>{props.children}</div>
        </div>
      )}
    </>
  )
}
