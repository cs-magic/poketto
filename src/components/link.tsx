/**
 * Copyright (c) CS-Magic, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import _ from "lodash"
import Link from "next/link"
import React from "react"

import { type INavItem } from "@/ds"

import { ResponsiveTooltip } from "@/components/containers"

export function SidebarNavItem({ Icon, link, title }: INavItem) {
  return (
    <Link href={link ?? `/${title}`}>
      <ResponsiveTooltip content={title ?? _.startCase(_.capitalize(title))}>
        {Icon && <Icon className="wh-12 p-btn-horizontal" />}
      </ResponsiveTooltip>
    </Link>
  )
}

export function FooterNavItem({ title, link, Icon }: INavItem) {
  return (
    <Link className="p-btn-vertical" href={link ?? `/${title}`}>
      {Icon && <Icon className="wh-[20px]" />}
      <span>{title ?? _.startCase(_.capitalize(title))}</span>
    </Link>
  )
}
