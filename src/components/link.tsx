import Link from "next/link"
import { Button } from "@/components/ui/button"
import { clsx } from "clsx"
import _ from "lodash"
import React, { type ForwardRefExoticComponent, type ReactNode, type RefAttributes } from "react"
import { useAppStore } from "@/store"
import { useRouter } from "next/router"
import { useUser } from "@/hooks/use-user"
import { toast } from "sonner"
import { type IconProps } from "@radix-ui/react-icons/dist/types"

export interface INavItem {
  title: string
  link: string
  Icon?: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>
}

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
