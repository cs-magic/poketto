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

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function SidebarNavItem({ Icon, link, title }: INavItem) {
  const textContent = title ?? _.startCase(_.capitalize(title))
  return (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger>
          <Link href={link ?? `/${title}`} className="p-btn-horizontal">
            {Icon && <Icon />}
            <span className="hidden lg:flex">{textContent}</span>
          </Link>
        </TooltipTrigger>

        <TooltipContent>{textContent}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
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
