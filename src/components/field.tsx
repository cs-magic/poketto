/**
 * Copyright (c) CS-Magic, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { type HTMLProps, type ReactNode } from "react"
import { IconEye, IconGitFork } from "@tabler/icons-react"
import numeral from "numeral"
import { BookmarkFilledIcon, EyeOpenIcon, VideoIcon } from "@radix-ui/react-icons"
import clsx from "@/lib/clsx"
import { ICON_DIMENSION_SM } from "@/config"

export function ResponsiveField({
  icon,
  value,
  suffix,
  className,
  ...props
}: {
  icon: ReactNode
  value: number
  suffix?: string
} & HTMLProps<HTMLDivElement>) {
  return (
    <div
      className={clsx("inline-flex cursor-pointer items-center gap-1 whitespace-nowrap hover:text-primary-foreground/75", className)}
      {...props}
    >
      {icon}
      <span> {numeral(value).format("0a")}</span>
      <span className="hidden md:block">{suffix}</span>
    </div>
  )
}

export function UsesField({ value }: { value: number }) {
  return <ResponsiveField icon={<VideoIcon />} value={value} />
}
export function ViewsField({ value }: { value: number }) {
  return <ResponsiveField icon={<EyeOpenIcon />} value={value} />
}
export function SavesField({ value }: { value: number }) {
  return <ResponsiveField icon={<BookmarkFilledIcon />} value={value} />
}
