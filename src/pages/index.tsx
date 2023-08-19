import { RootLayout } from "@/layouts/root.layout"
import { ArrowRightIcon, SymbolIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
import { api } from "@/lib/api"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import _ from "lodash"
import Link from "next/link"

import { useUser } from "@/hooks/use-user"
import { todo } from "@/lib/helpers"
import { signIn } from "next-auth/react"
import { AppCardView } from "@/components/app-card-view"
import { CardsLayoutType } from "@/store/ui.slice"
import { getConversationLink } from "@/lib/string"
import { DEFAULT_BATCH_CARDS, URI } from "@/config"
import { AppListViewInHome } from "@/components/app/in-home.view"

export default function HomePage() {
  const user = useUser()

  const { data: conversations } = api.conv.listConversations.useQuery(undefined, { enabled: !!user })

  return (
    <RootLayout>
      <div className={"h-full w-full overflow-auto"}>
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
            {user ? (
              <>
                {(conversations ?? []).slice(0, 10).map((c) => {
                  return (
                    <Link className={"w-48 shrink-0"} key={c.appId} href={"/c/[userId]/[apId]"} as={getConversationLink(user.id, c.appId)}>
                      <AppCardView app={c.app} cardsLayout={CardsLayoutType.grid} sort={"new"} key={c.appId} />
                    </Link>
                  )
                })}
              </>
            ) : (
              <div>
                <Button variant={"link"} onClick={() => void signIn()}>
                  登录
                </Button>
                后才能查看最近使用的 App 哦！
              </div>
            )}
          </CardContent>
        </Card>

        <ExploreApps />
      </div>
    </RootLayout>
  )
}

const ExploreApps = () => {
  const query = api.app.listApps.useInfiniteQuery(
    {},
    {
      getNextPageParam: (lastPage, allPages) => lastPage.nextCursor, // 这个必须加
    }
  )
  const apps = query.data?.pages.flatMap((item) => item.data)

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
          {!apps ? <SymbolIcon /> : _.sampleSize(_.range(DEFAULT_BATCH_CARDS), 3).map((i) => <AppListViewInHome app={apps[i]} key={i} />)}
        </div>
      </CardContent>
    </Card>
  )
}
