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
import { type ConvForListView } from "@/ds"
import { useMustache } from "@/hooks/use-mustache"
import { useUserId } from "@/hooks/use-user"
import Link from "next/link"
import { getConversationLink, getLocalFlowgptImageUri } from "@/lib/string"
import clsx from "@/lib/clsx"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import d from "@/lib/datetime"
import { AppDialogContainer } from "@/components/app/container"
import { SearchResultView } from "@/components/app/search-result.view"

export const ConversationList = () => {
  const { data: convs } = api.conv.list.useQuery()

  const [searchKey, setSearchKey] = useState("")
  const [toSearch] = useDebouncedValue(searchKey, 200)
  // todo: avoid empty call of trpc
  const queryApps = api.app.list.useInfiniteQuery(
    { searchKey: toSearch },
    {
      enabled: toSearch !== "",
      getNextPageParam: (lastPage, allPages) => lastPage.nextCursor,
    },
  )
  const searchedApps = queryApps.data?.pages.flatMap((item) => item.items) ?? []

  return (
    <div className={"flex h-full w-full shrink-[.1] flex-col overflow-hidden"}>
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
              {searchedApps.slice(0, 10).map((app) => (
                <AppDialogContainer appId={app.id} key={app.id}>
                  <SearchResultView app={app} />
                </AppDialogContainer>
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
    </div>
  )
}

export const SectionTitle = ({ children }: PropsWithChildren) => <div className={"| w-full bg-muted px-4 py-2"}>{children}</div>

export const ConversationListView = ({ c }: { c: ConvForListView }) => {
  const m = useMustache()
  const userId = useUserId()!
  const latestMessage = c.messages[0]!
  return (
    <Link
      href={"/c/[userId]/[appId]"}
      as={getConversationLink(userId, c.appId)}
      className={clsx("h-fit w-full px-4 py-2 hover:bg-accent", c.pinned && "bg-indigo-100 dark:bg-slate-900")}
    >
      <div className={"flex h-fit w-full items-center  gap-4"}>
        <Avatar className={"shrink-0"}>
          <AvatarImage src={getLocalFlowgptImageUri(c.app.avatar, "md")} />
        </Avatar>

        <div className={"| flex grow flex-col gap-2 overflow-hidden"}>
          <div className={"| flex w-full justify-between gap-2"}>
            <span className={"truncate "}>{c.app.name}</span>
            <span>{d(latestMessage.updatedAt).calendar()}</span>
          </div>
          <div className={"flex gap-2"}>
            {/* 只有 group 才需要打开 */}
            <span className={"truncate text-muted-foreground"}>{m(latestMessage.content)}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
