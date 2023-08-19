import { RootLayout } from "@/layouts/root.layout"
import { useSessionUser, useUserId } from "@/hooks/use-user"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ChevronDownIcon, Pencil2Icon, SymbolIcon } from "@radix-ui/react-icons"
import React from "react"
import { MAX_MOBILE_WIDTH, URI } from "@/config"
import { useElementSize } from "@mantine/hooks"
import { clsx } from "clsx"
import { AppPlainListView } from "@/components/app/plain.view"
import { api } from "@/lib/api"
import { UserProfile } from "@/components/user/profile.view"
import { getSession, useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { type GetServerSideProps } from "next"
import { prisma } from "@/server/db"
import { appInclude } from "@/ds"
import superjson from "superjson"
import { type User } from "next-auth"

export default function DashboardPage({ sessionUser }: { sessionUser: User }) {
  const { data: userProfile } = api.user.getProfile.useQuery({ userId: sessionUser.id })
  const { data: convs } = api.conv.listConversations.useQuery(undefined)

  return (
    <RootLayout>
      <div className={"grid grid-cols-1 gap-4 overflow-auto p-4 md:grid-cols-2"}>
        {!userProfile ? <SymbolIcon /> : <UserProfile user={userProfile} />}

        <div className={"flex flex-col gap-2"}>
          <ConversationsToolView />
          {!convs ? <SymbolIcon /> : convs.map((c) => <AppPlainListView app={c.app} key={c.appId} />)}
        </div>
      </div>
    </RootLayout>
  )
}

export const ConversationsToolView = () => {
  const { ref, width, height } = useElementSize()
  const expand = width > MAX_MOBILE_WIDTH
  return (
    <div ref={ref} className={clsx("my-2 gap-2", expand ? "flex " : "grid grid-cols-1")}>
      <Input className={"grow"} placeholder={"Find an app..."} />
      <div className={"flex grow items-center justify-between gap-2"}>
        <Button variant={"outline"} className={"h-full gap-2"}>
          Category {expand && <ChevronDownIcon />}
        </Button>
        <Button variant={"outline"} className={"h-full gap-2"}>
          Language {expand && <ChevronDownIcon />}
        </Button>
        <Button variant={"outline"} className={"h-full gap-2"}>
          Sort {expand && <ChevronDownIcon />}
        </Button>
        <Button className={"h-full gap-2 bg-primary"}>{expand && <Pencil2Icon />} New</Button>
      </div>
    </div>
  )
}

/**
 * protected router
 */
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx)

  if (!session) {
    return {
      redirect: {
        destination: URI.user.auth.signin,
        permanent: false,
      },
    }
  }

  return {
    props: {
      sessionUser: session.user,
    },
  }
}
