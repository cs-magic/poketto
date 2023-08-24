/**
 * Copyright (c) CS-Magic, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from "react"
import _ from "lodash"
import Link from "next/link"
import { useAppStore } from "@/store"
import { type INavItem } from "@/ds"

export function SidebarNavItem({ Icon, link, title }: INavItem) {
  const { sidebarVisible } = useAppStore()

  return (
    <Link href={link ?? `/${title}`} className="p-btn-horizontal">
      {Icon && <Icon />}
      {sidebarVisible && <span>{title ?? _.startCase(_.capitalize(title))}</span>}
    </Link>
  )
}

export function FooterNavItem({ title, link, Icon }: INavItem) {
  return <Link className="p-btn-vertical" href={link ?? `/${title}`}>
    {Icon && <Icon className="wh-[20px]" />}
    <span>{title ?? _.startCase(_.capitalize(title))}</span>
  </Link>
}
