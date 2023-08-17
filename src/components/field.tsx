import React, { type HTMLProps, type ReactNode } from "react"
import { IconEye, IconGitFork } from "@tabler/icons-react"
import { ICON_DIMENSION_SM } from "@/lib/assets"
import numeral from "numeral"
import { clsx } from "clsx"

export const ResponsiveField = ({
  icon,
  title,
  className,
  ...props
}: {
  icon: ReactNode
  title?: string
} & HTMLProps<HTMLDivElement>) => {
  return (
    <div
      className={clsx("inline-flex cursor-pointer items-center gap-1 whitespace-nowrap hover:text-primary-foreground/75", className)}
      {...props}
    >
      {icon}
      {title && <span> {title}</span>}
    </div>
  )
}

export const UsesField = ({ v, size = "md" }: { v: number; size?: "md" | "sm" }) => (
  <ResponsiveField icon={<IconGitFork className={ICON_DIMENSION_SM} />} title={numeral(v).format("0a") + (size === "md" ? "Uses" : "")} />
)

export const ViewsField = ({ v, size = "md" }: { v: number; size?: "md" | "sm" }) => (
  <ResponsiveField icon={<IconEye className={ICON_DIMENSION_SM} />} title={numeral(v).format("0a") + (size === "md" ? "Views" : "")} />
)
