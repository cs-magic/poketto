/**
 * Copyright (c) CS-Magic, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import capitalize from "lodash/capitalize"
import startCase from "lodash/startCase"
import Link from "next/link"
import React from "react"

import { type INavItem } from "@/ds"

import { ResponsiveTooltip } from "@/components/containers"

export function SidebarNavItem({ Icon, link, title }: INavItem) {
  const inner = (
    <ResponsiveTooltip content={title ?? startCase(capitalize(title))}>
      {Icon && <Icon className="wh-12 p-btn-horizontal" />}
    </ResponsiveTooltip>
  )
  return link ? <Link href={link}>{inner}</Link> : inner
}

export function FooterNavItem({ title, link, Icon }: INavItem) {
  return (
    <Link className="p-btn-vertical" href={link ?? `/${title}`}>
      {Icon && <Icon className="wh-[20px]" />}
      <span>{title ?? startCase(capitalize(title))}</span>
    </Link>
  )
}
