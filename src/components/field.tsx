import React, { type HTMLProps, type ReactNode } from "react"
import { IconEye, IconGitFork } from "@tabler/icons-react"
import { ICON_DIMENSION_SM } from "@/lib/assets"
import numeral from "numeral"
import { clsx } from "clsx"
import { BookmarkFilledIcon, EyeOpenIcon, VideoIcon } from "@radix-ui/react-icons"

export const ResponsiveField = ({
  icon,
  value,
  suffix,
  className,
  ...props
}: {
  icon: ReactNode
  value: number
  suffix?: string
} & HTMLProps<HTMLDivElement>) => {
  return (
    <div
      className={clsx("inline-flex cursor-pointer items-center gap-1 whitespace-nowrap hover:text-primary-foreground/75", className)}
      {...props}
    >
      {icon}
      <span> {numeral(value).format("0a")}</span>
      <span className={"hidden md:block"}>{suffix}</span>
    </div>
  )
}

export const UsesField = ({ value }: { value: number }) => <ResponsiveField icon={<VideoIcon />} value={value} />
export const ViewsField = ({ value }: { value: number }) => <ResponsiveField icon={<EyeOpenIcon />} value={value} />
export const SavesField = ({ value }: { value: number }) => <ResponsiveField icon={<BookmarkFilledIcon />} value={value} />
