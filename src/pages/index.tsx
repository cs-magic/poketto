import { RootLayout } from "@/layouts/root.layout"
import { ArrowRightIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
import { api } from "@/lib/api"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import _ from "lodash"
import Link from "next/link"

import { useUser } from "@/hooks/use-user"
import { type User } from ".prisma/client"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { todo } from "@/lib/helpers"
import { Skeleton } from "@/components/ui/skeleton"
import dayjs from "dayjs"
import { UsesField, ViewsField } from "@/components/field"
import { signIn } from "next-auth/react"
import { AppCardView } from "@/components/app-card-view"
import { CardsLayoutType } from "@/store/ui.slice"
import { getConversationLink, getLocalFlowgptImageUri } from "@/lib/string"
import { type AppWithRelation } from "@/ds"
import { DEFAULT_BATCH_CARDS, URI } from "@/config"
import { AppContainer } from "@/components/containers"

export default function HomePage() {
  const user = useUser()

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
              <RecentConversations user={user} />
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

const RecentConversations = ({ user }: { user: User }) => {
  const { data: conversations = [] } = api.conv.listConversations.useQuery({ userId: user.id })
  return (
    <>
      {conversations.slice(0, 10).map((c) => {
        return (
          <Link className={"w-48 shrink-0"} key={c.appId} href={getConversationLink(user.id, c.appId)}>
            <AppCardView app={c.app} cardsLayout={CardsLayoutType.grid} sort={"new"} key={c.appId} />
          </Link>
        )
      })}
    </>
  )
}

const ExploreApps = () => {
  const query = api.app.listApps.useInfiniteQuery(
    {},
    {
      getNextPageParam: (lastPage, allPages) => lastPage.nextCursor, // 这个必须加
    }
  )
  const apps = query.data?.pages.flatMap((item) => item.data) ?? []

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
          {_.sampleSize(_.range(DEFAULT_BATCH_CARDS), 3).map((i) => (
            <AppView app={apps[i]} key={i} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

const AppView = ({ app }: { app: AppWithRelation | undefined }) => {
  if (!app)
    return (
      <div className={"| flex w-full gap-8 pb-3 pt-6 text-muted-foreground"}>
        <Skeleton className={"wh-12"} />

        <div className={"flex grow flex-col gap-2"}>
          <Skeleton className={"h-4"} />
          <Skeleton className={"h-8"} />
          <Skeleton className={"h-4"} />
        </div>

        <div className={"inline-flex shrink-0 gap-2"}>
          <Skeleton className={"h-8 w-40"} />
        </div>
      </div>
    )

  const view = (
    <div className={"flex w-full cursor-pointer  items-center gap-8 p-3 pt-6 text-muted-foreground hocus:bg-accent"}>
      <Avatar className={"rounded-sm wh-[64px]"}>
        <AvatarImage src={getLocalFlowgptImageUri(app.avatar, "md")} />
      </Avatar>

      <div className={"flex grow flex-col items-start gap-2"}>
        <p className={"font-semibold text-primary-foreground"}>{app.name}</p>
        <p className={"line-clamp-2 text-primary-foreground/75"}>{app.desc}</p>

        <div className={"inline-flex gap-4"}>
          <p>By {app.name}</p>
          <p>Updated on {dayjs(app.updatedAt).format("DD MMM, YYYY")}</p>
        </div>
      </div>

      <div className={"inline-flex shrink-0 gap-2"}>
        <UsesField v={app.state?.calls ?? 0} />
        <ViewsField v={app.state?.views ?? 0} />
      </div>
    </div>
  )

  return <AppContainer app={app}>{view}</AppContainer>
}
