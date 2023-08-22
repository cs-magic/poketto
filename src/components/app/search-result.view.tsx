import { type AppForListView } from "@/ds"
import { DialogTrigger } from "@/components/ui/dialog"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { getLocalFlowgptImageUri } from "@/lib/string"
import { ViewsField } from "@/components/field"

export const SearchResultView = ({ app }: { app: AppForListView }) => (
  <div className={"flex w-full items-center gap-2 p-2 hover:bg-accent"}>
    <Avatar className={"shrink-0"}>
      <AvatarImage src={getLocalFlowgptImageUri(app.avatar, "md")} />
    </Avatar>
    <div className={"| flex grow flex-col gap-1 overflow-hidden"}>
      <p className={"| truncate text-sm font-semibold text-primary-foreground/75"}>{app.name}</p>
      <p className={"| truncate "}>{app.description}</p>
    </div>
    <div className={"| flex w-20 shrink-0 flex-col gap-1 overflow-hidden whitespace-nowrap"}>
      <ViewsField value={app.state?.views ?? 0} />
      <p className={"truncate"}>@{app.creator.name}</p>
    </div>
  </div>
)
