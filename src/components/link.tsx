/**
 * Copyright (c) CS-Magic, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useTranslation } from "next-i18next"
import Link from "next/link"
import React from "react"

import { type IMenuItem } from "@/ds"

import { ResponsiveTooltip } from "@/components/containers"

export function SidebarNavItem({ field, Icon, link }: IMenuItem) {
  const { t } = useTranslation()

  const inner = (
    <ResponsiveTooltip content={t(`common:menus.${field}`)} className={"md:pr-2 lg:pr-4"} disableHoverableContent>
      {Icon && <Icon className="wh-12 p-btn-horizontal" />}
    </ResponsiveTooltip>
  )
  return link ? <Link href={link}>{inner}</Link> : inner
}

export function FooterNavItem({ field, link, Icon }: IMenuItem) {
  const { t } = useTranslation()
  const content = t(`common:menus.${field}`)
  // console.log({ field, content })

  const inner = (
    <>
      {Icon && <Icon className="wh-[20px]" />}
      <span>{content}</span>
    </>
  )
  return link ? (
    <Link className="p-btn-vertical" href={link}>
      {inner}
    </Link>
  ) : (
    inner
  )
}
