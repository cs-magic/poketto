import { ComponentProps } from "react"
import * as React from "react"

import { SpinnerIcon } from "@/components/icons"
import { Button } from "@/components/ui/button"

import { cn } from "@/lib/utils"

export const ButtonWithLoading = ({
  disabled,
  children,
  loading,
  className,
  ...props
}: ComponentProps<typeof Button> & {
  loading?: boolean
}) => {
  return (
    <Button disabled={disabled || loading} className={cn(className)} {...props}>
      {loading ? <SpinnerIcon className="mr-2 h-4 w-4 animate-spin" /> : children}
    </Button>
  )
}
