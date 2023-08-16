import { RootLayout } from "@/layouts/root.layout"
import { useUser } from "@/hooks/use-user"
import { useSearchParams } from "next/navigation"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ChevronDownIcon, Pencil2Icon, StarIcon } from "@radix-ui/react-icons"
import { api } from "@/lib/api"
import React, { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { IconUser } from "@tabler/icons-react"
import { Separator } from "@/components/ui/separator"
import { type AppWithRelation, UserAppRelationType, type UserWithRelations } from "@/ds"
import { DEFAULT_USER_AVATAR, DEFAULT_USER_ID, DEFAULT_USER_NAME, POKETTO_CREATOR_ID, POKETTO_CREATOR_NAME } from "@/config"
import d from "@/lib/datetime"
import { todo } from "@/lib/helpers"
import { signOut } from "next-auth/react"

export default function DashboardPage() {
  const user = useUser()
  const sp = useSearchParams()
  const v = (sp?.get("tab") || "") as UserAppRelationType
  const tab = Object.values(UserAppRelationType).includes(v) ? v : UserAppRelationType.used
  const [relationType, setRelationType] = useState<UserAppRelationType>(tab)

  return (
    <RootLayout>
      <div className={"| flex h-full w-full gap-4 p-4"}>
        <UserProfile user={user} />

        <div className={"| flex grow flex-col overflow-auto"}>
          {user && <ConversationsView userId={user.id} relationType={relationType} />}
        </div>
      </div>
    </RootLayout>
  )
}

const ConversationsView = ({ userId, relationType }: { userId: string; relationType: UserAppRelationType }) => {
  const { data: convs = [] } = api.poketto.listConversations.useQuery({ userId, relationType })
  return (
    <>
      <div className={"my-4 flex h-8 items-center gap-2"}>
        <Input className={"h-full grow"} placeholder={"Find an app..."} />
        <Button variant={"outline"} className={"h-full gap-2"}>
          Category <ChevronDownIcon />
        </Button>
        <Button variant={"outline"} className={"h-full gap-2"}>
          Language <ChevronDownIcon />
        </Button>
        <Button variant={"outline"} className={"h-full gap-2"}>
          Sort <ChevronDownIcon />
        </Button>
        <Button className={"h-full gap-2 bg-green-700"}>
          <Pencil2Icon /> New
        </Button>
      </div>

      {relationType === UserAppRelationType.used && convs.map((c) => <AppView app={c.app} key={c.id} />)}
    </>
  )
}

const AppView = ({ app }: { app: AppWithRelation }) => {
  return (
    <div className={"| | flex w-full justify-between gap-4 border-y p-4"} key={app.id}>
      <div className={"flex flex-col gap-2"}>
        <div className={"flex items-center gap-2"}>
          <h2>{app.name}</h2>
          {app.creatorId === POKETTO_CREATOR_ID && <Badge className={"bg-blue-500"}>{POKETTO_CREATOR_NAME}</Badge>}
          <Badge variant={"outline"}>{app.model?.isOpenSource ? "Open Source" : "Close Source"}</Badge>
        </div>
        <div className={"line-clamp-3 text-muted-foreground"}>{app.desc}</div>
        <div className={"| flex items-center gap-4 text-muted-foreground"}>
          <div className={"inline-flex items-center gap-2"}>
            <div className={"rounded-full bg-blue-500 wh-3"} />
            <span>{`${app.categoryMain}-${app.categorySub}`}</span>
          </div>
          <span>Updated {d(app.updatedAt).fromNow()}</span>
        </div>
      </div>

      <div className={"flex flex-col gap-2"}>
        <Button variant={"outline"} size={"sm"} className={"h-8 gap-2"}>
          <StarIcon />
          <span>Star</span>
          {/*<Separator orientation={'vertical'}/>*/}
          {/*<ChevronDownIcon/>*/}
        </Button>
      </div>
    </div>
  )
}

const UserProfile = ({ user }: { user?: UserWithRelations }) => {
  return (
    <div
      className={
        "| flex h-fit w-full shrink-0 flex-col justify-around gap-4 overflow-y-auto overflow-x-hidden rounded-2xl p-4" + " md:w-[375px]"
      }
    >
      <Avatar className={"mx-auto wh-[256px]"}>
        <AvatarImage src={user?.image ?? DEFAULT_USER_AVATAR} className={""} />
        <AvatarFallback>
          <IconUser />
        </AvatarFallback>
      </Avatar>

      {/* avatar info*/}
      <div className={"flex flex-col  overflow-hidden"}>
        <h2 className={"text-2xl"}>{user?.name ?? DEFAULT_USER_NAME}</h2>
        <p className={"truncate text-muted-foreground"}>@{user?.id ?? DEFAULT_USER_ID}</p>
        <p className={"lines-clamp-2 my-2 text-primary-foreground/75"}>{user?.desc ?? "You haven't said anything about yourself ~"}</p>
      </div>

      {/*	stat */}
      <div className={"flex items-center justify-around gap-2"}>
        <Button disabled={!user} className={"flex h-fit grow flex-col items-center gap-2 p-2"} variant={"ghost"}>
          <span>关注</span>
          <span>{user?.following.length ?? 0}</span>
        </Button>
        <Separator orientation={"vertical"} className={"h-8"} />
        <Button disabled={!user} className={"flex h-fit grow  flex-col items-center gap-2 p-2"} variant={"ghost"}>
          <span>粉丝</span>
          <span>{user?.followedBy.length ?? 0}</span>
        </Button>
        <Separator orientation={"vertical"} className={"h-8"} />
        <Button disabled={!user} className={"flex h-fit grow  flex-col items-center gap-2 p-2"} variant={"ghost"}>
          <span>影响力</span>
          <span>{user?.impact ?? 0}</span>
        </Button>
        <Separator orientation={"vertical"} className={"h-8"} />
        <Button disabled={!user} className={"flex h-fit grow  flex-col items-center gap-2 p-2"} variant={"ghost"}>
          <span>甜甜圈</span>
          <span>{user?.balance ?? 0}</span>
        </Button>
      </div>

      {/*	collections */}
      <div className={"grid grid-cols-2 gap-4"}>
        <Button variant={"outline"} disabled={!user} onClick={todo}>
          编辑简介
        </Button>

        <Button disabled={!user} variant={"ghost"} onClick={() => void signOut()}>
          退出登录
        </Button>
        {/* <Button disabled={!user}>收藏</Button> */}
      </div>
    </div>
  )
}
