/**
 * Copyright (c) CS-Magic, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { DialogTriggerProps } from "@radix-ui/react-dialog"
import React, { useState } from "react"

import { AppDetailView } from "@/components/app/detail.view"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

export function AppDetailContainer({
  appId,
  open,
  onOpenChange,
  children,
  ...props
}: {
  appId: string
  open?: boolean
  onOpenChange?: (v: boolean) => void
} & DialogTriggerProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger {...props}>{children}</DialogTrigger>
      <DialogContent className="max-h-[80%] w-full overflow-auto sm:max-w-[60%]">
        <AppDetailView appId={appId} setOpen={onOpenChange} />
      </DialogContent>
    </Dialog>
  )
}
