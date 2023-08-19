import React, { type PropsWithChildren } from "react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

import { AppDetailView } from "@/components/app/detail.view"

export const AppDialogContainer = ({ appId, children }: { appId: string } & PropsWithChildren) => {
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="max-h-[80%] w-full overflow-auto sm:max-w-[60%]">
        <AppDetailView appId={appId} />
      </DialogContent>
    </Dialog>
  )
}
