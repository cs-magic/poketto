import Link from "next/link"
import _ from "lodash"
import React from "react"
import { useAppStore } from "@/store"
import { type INavItem } from "@/ds"

export const SidebarNavItem = ({ Icon, link, title }: INavItem) => {
  const { sidebarVisible } = useAppStore()

  return (
    <Link href={link ?? `/${title}`} className={"p-btn-horizontal"}>
      {Icon && <Icon />}
      {sidebarVisible && <span>{title ?? _.startCase(_.capitalize(title))}</span>}
    </Link>
  )
}

export const FooterNavItem = ({ title, link, Icon }: INavItem) => (
  <Link className={"p-btn-vertical"} href={link ?? `/${title}`}>
    {Icon && <Icon className={"wh-[20px]"} />}
    <span>{title ?? _.startCase(_.capitalize(title))}</span>
  </Link>
)
