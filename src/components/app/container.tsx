/**
 * Copyright (c) CS-Magic, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { type PropsWithChildren, useState } from "react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

import { AppDetailView } from "@/components/app/detail.view"

export function AppDialogContainer({ appId, children }: { appId: string } & PropsWithChildren) {
  const [open, setOpen] = useState(false)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="max-h-[80%] w-full overflow-auto sm:max-w-[60%]">
        <AppDetailView appId={appId} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  )
}
