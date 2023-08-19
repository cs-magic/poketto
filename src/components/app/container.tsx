import React, { type PropsWithChildren } from "react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

import { AppDetailView } from "@/components/app/detail.view"

export const AppDialogContainer = ({ appId, children }: { appId: string } & PropsWithChildren) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-h-[80%] overflow-auto">
        <AppDetailView appId={appId} />
      </DialogContent>
    </Dialog>
  )
}
