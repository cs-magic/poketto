import { RootLayout } from "@/layouts/root.layout"
import { ArrowRightIcon, SymbolIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
import { api } from "@/lib/api"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import _ from "lodash"
import Link from "next/link"

import { todo } from "@/lib/helpers"
import { signIn } from "next-auth/react"
import { CardsLayoutType } from "@/store/ui.slice"
import { getConversationLink } from "@/lib/string"
import { DEFAULT_BATCH_CARDS, URI } from "@/config"
import { AppHorizontalCardView } from "@/components/app/card-horizontal.view"
import { AppDialogContainer } from "@/components/app/container"
import { AppVerticalCardView } from "@/components/app/card-vertical.view"
import { useSessionUser } from "@/hooks/use-user"

export default function HomePage() {
  return (
    <RootLayout>
      <div className={"h-full w-full overflow-auto"}>
        <RecentConversations />
        <ExploreApps />
      </div>
    </RootLayout>
  )
}

export const RecentConversations = () => {
  const user = useSessionUser()
  const { data: conversations } = api.conv.listConversations.useQuery(undefined, { enabled: !!user })

  return (
    <Card id={"recent-apps"} variant={"ghost"} className={"w-full"}>
      <CardHeader>
        <div className={"| flex shrink-0 items-end justify-between"}>
          <CardTitle>Recently used apps</CardTitle>
          <Button
            variant={"link"}
            className={"| flex h-fit items-center gap-2 py-0 text-xs"}
            onClick={() => {
              if (!user) return void signIn()
              todo()
            }}
          >
            <span>See all</span>
            <ArrowRightIcon />
          </Button>
        </div>
      </CardHeader>
      <CardContent className={"flex w-full gap-2 overflow-auto"}>
        {!conversations ? (
          <div>
            <Button variant={"link"} onClick={() => void signIn()}>
              登录
            </Button>
            后才能查看最近使用的 App 哦！
          </div>
        ) : (
          conversations.slice(0, 10).map((c) => {
            return (
              //   正常情况下，我们应该用 PopContent，然后进入，不过这里是已经安装好的app，因此直接link过去比较好
              <Link className={"w-48 shrink-0"} key={c.appId} href={"/c/[userId]/[apId]"} as={getConversationLink(c.userId, c.appId)}>
                <AppVerticalCardView app={c.app} cardsLayout={CardsLayoutType.grid} sort={"new"} key={c.appId} />
              </Link>
            )
          })
        )}
      </CardContent>
    </Card>
  )
}

const ExploreApps = () => {
  const query = api.app.listApps.useInfiniteQuery(
    {},
    {
      getNextPageParam: (lastPage, allPages) => lastPage.nextCursor, // 这个必须加
    }
  )
  const apps = query.data?.pages.flatMap((item) => item.items)

  return (
    <Card id={"explore"} variant={"ghost"} className={"w-full grow"}>
      <CardHeader>
        <div className={"| flex shrink-0 items-end justify-between"}>
          <CardTitle>Explore trending apps</CardTitle>
          <Link href={URI.app.explore}>
            <Button variant={"link"} className={"| flex h-fit items-center gap-2 py-0 text-xs"}>
              <span>Explore all</span>
              <ArrowRightIcon />
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent className={"flex w-full justify-between"}>
        <div className={"flex w-full flex-col divide-y"}>
          {!apps ? (
            <SymbolIcon />
          ) : (
            _.sampleSize(_.range(DEFAULT_BATCH_CARDS), 3).map((i) => (
              <AppDialogContainer appId={apps[i]!.id} key={i}>
                <AppHorizontalCardView app={apps[i]} key={i} />
              </AppDialogContainer>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
