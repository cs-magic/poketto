/**
 [left] conversation list
 */
import { api } from "@/lib/api"
import { type PropsWithChildren, useState } from "react"
import { useDebouncedValue } from "@mantine/hooks"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { XIcon } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import _ from "lodash"
import { type AppWithRelation, type ConversationWithRelation } from "@/ds"
import { useMustache } from "@/hooks/use-mustache"
import { useUserId } from "@/hooks/use-user"
import Link from "next/link"
import { getConversationLink, getLocalFlowgptImageUri } from "@/lib/string"
import clsx from "clsx"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import d from "@/lib/datetime"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { ViewsField } from "@/components/field"
import { AppDetail } from "@/components/app-detail-view"

export const ConversationList = () => {
  const { data: convs = [] } = api.conv.listConversations.useQuery({})
  const [searchKey, setSearchKey] = useState("")
  const [toSearch] = useDebouncedValue(searchKey, 200)
  // todo: avoid empty call of trpc
  const queryApps = api.app.listApps.useInfiniteQuery(
    { searchKey: toSearch },
    {
      enabled: toSearch !== "",
      getNextPageParam: (lastPage, allPages) => lastPage.nextCursor,
    }
  )
  const searchedApps = queryApps.data?.pages.flatMap((item) => item.data) ?? []

  return (
    <>
      {/* 搜索框 */}
      <div className={"relative w-full"}>
        <Input
          value={searchKey}
          placeholder={"Search: Title / Description / Init Prompt"}
          className={"mx-auto my-2 w-[95%] rounded-2xl bg-accent"}
          onChange={(event) => {
            setSearchKey(event.currentTarget.value)
          }}
        />
        {searchKey && (
          <Button className={"absolute bottom-2 right-4 text-muted-foreground"} variant={"ghost"} onClick={() => setSearchKey("")}>
            <XIcon className={" wh-5"} />
          </Button>
        )}
      </div>

      <div className={"flex w-full grow flex-col overflow-y-auto overflow-x-hidden"}>
        {/* 列表 */}
        {searchKey ? ( // 搜索时
          searchedApps ? (
            <>
              <SectionTitle>Global search results {searchedApps.length ? "" : " (0)"}</SectionTitle>
              {searchedApps.slice(0, 10).map((prompt) => (
                <SearchResultItem app={prompt} key={prompt.id} />
              ))}
            </>
          ) : (
            <>
              <SectionTitle>Global search results</SectionTitle>
              <Skeleton className={"h-8"} />
            </>
          ) // 	没有搜索时显示最近聊天列表
        ) : (
          <>
            <SectionTitle>Poketto Apps</SectionTitle>
            {_.orderBy(convs, ["pinned", "updatedAt"], ["desc", "desc"]).map((c) => (
              <ConversationListView key={c.appId} c={c} />
            ))}
          </>
        )}
      </div>
    </>
  )
}

export const SectionTitle = ({ children }: PropsWithChildren) => <div className={"| w-full bg-muted px-4 py-2"}>{children}</div>

export const ConversationListView = ({ c }: { c: ConversationWithRelation }) => {
  const m = useMustache()
  const userId = useUserId()!

  return (
    <Link
      href={"/c/[userId]/[appId]"}
      as={getConversationLink(userId, c.appId)}
      className={clsx("h-fit w-full px-4 py-2 hover:bg-accent", c.pinned && "bg-accent/50")}
    >
      <div className={"flex h-fit w-full items-center  gap-4"}>
        <Avatar className={"shrink-0"}>
          <AvatarImage src={getLocalFlowgptImageUri(c.app.avatar, "md")} />
        </Avatar>

        <div className={"| flex grow flex-col gap-2 overflow-hidden"}>
          <div className={"| flex w-full justify-between gap-2"}>
            <span className={"truncate "}>{c.app.name}</span>
            <span>{d(c.latestMessage.updatedAt).calendar()}</span>
          </div>
          <div className={"flex gap-2"}>
            {/* 只有 group 才需要打开 */}
            <span className={"truncate text-muted-foreground"}>{m(c.latestMessage.content)}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export const SearchResultItem = ({ app }: { app: AppWithRelation }) => {
  const [open, setOpen] = useState(false)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className={"flex w-full items-center gap-2 p-2 hover:bg-accent"}>
        <Avatar className={"shrink-0"}>
          <AvatarImage src={getLocalFlowgptImageUri(app.avatar, "md")} />
        </Avatar>
        <div className={"| flex grow flex-col gap-1 overflow-hidden"}>
          <p className={"| truncate text-sm font-semibold text-primary-foreground/75"}>{app.name}</p>
          <p className={"| truncate "}>{app.desc}</p>
        </div>
        <div className={"| flex w-20 shrink-0 flex-col gap-1 overflow-hidden whitespace-nowrap"}>
          <ViewsField v={app.state?.views ?? 0} />
          <p className={"truncate"}>@{app.creator.name}</p>
        </div>
      </DialogTrigger>
      <DialogContent className={"max-h-[80vh] overflow-auto"}>
        <AppDetail app={app} comments={[]} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  )
}
