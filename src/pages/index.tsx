/**
 * Copyright (c) CS-Magic, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { ArrowRightIcon } from "@radix-ui/react-icons"
import { signIn } from "next-auth/react"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import Link from "next/link"

import { CardsLayoutType } from "@/ds"

import { RootLayout } from "@/layouts/root.layout"

import { AppVerticalCardView } from "@/components/app/card-vertical.view"
import { ExploreAppsWidget } from "@/components/app/explore.widget"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { useSessionUser } from "@/hooks/use-user"

import { api } from "@/lib/api"
import { getConversationLink, getConversationsLink } from "@/lib/string"

export default function HomePage() {
  return (
    <RootLayout>
      <div className="h-full w-full overflow-auto | flex flex-col">
        <RecentConversations />
        <ExploreAppsWidget />
      </div>
    </RootLayout>
  )
}

export function RecentConversations() {
  const { t } = useTranslation()
  const user = useSessionUser()
  const { data: conversations } = api.conv.list.useQuery(undefined, { enabled: !!user })

  return (
    <Card id="recent-apps" variant="ghost" className="w-full">
      <CardHeader>
        <div className="| flex shrink-0 items-end justify-between">
          <CardTitle>{t("homepage:recentlyUsedApps")}</CardTitle>
          {user && (
            <Link
              href={getConversationsLink(user.id)}
              className="h-fit | flex items-center gap-2 py-0 text-xs text-primary"
            >
              <span>{t("common:general.seeAll")}</span>
              <ArrowRightIcon />
            </Link>
          )}
        </div>
      </CardHeader>

      <CardContent className="flex w-full gap-2 p-2 overflow-auto">
        {!conversations ? (
          <div>
            <Button variant="link" onClick={() => void signIn()}>
              登录
            </Button>
            后才能查看最近使用的 App 哦！
          </div>
        ) : (
          conversations.slice(0, 10).map((c) => (
            //   正常情况下，我们应该用 PopContent，然后进入，不过这里是已经安装好的app，因此直接link过去比较好
            <Link
              className="w-48 shrink-0"
              key={c.appId}
              href="/c/[userId]/[appId]"
              as={getConversationLink(c.userId, c.appId)}
            >
              <AppVerticalCardView app={c.app} cardsLayout={CardsLayoutType.grid} sort="newest" key={c.appId} />
            </Link>
          ))
        )}
      </CardContent>
    </Card>
  )
}

export async function getStaticProps({ locale }) {
  const localeContent = await serverSideTranslations(locale, ["common", "homepage"])
  console.log({ locale }, localeContent._nextI18Next)

  return {
    props: {
      ...localeContent,
    },
  }
}
