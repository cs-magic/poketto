/**
 * Copyright (c) CS-Magic, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useElementSize } from "@mantine/hooks"
import { ChevronDownIcon, Pencil2Icon } from "@radix-ui/react-icons"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useRouter } from "next/router"
import React from "react"

import { MAX_MOBILE_WIDTH } from "@/config"

import { type NextPageWithAuth } from "@/ds"

import { RootLayout } from "@/layouts/root.layout"

import { AppPlainListView } from "@/components/app/plain.view"
import { Loading } from "@/components/loading"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { UserProfile } from "@/components/user/profile.view"

import { api } from "@/lib/api"
import clsx from "@/lib/clsx"

export const DashboardPage: NextPageWithAuth = () => {
  const router = useRouter()
  const userId = router.query.id as string
  console.log("dashboard: ", { userId })
  const { data: userProfile } = api.user.getProfile.useQuery({ userId }, { enabled: !!userId })
  const { data: convs } = api.conv.list.useQuery(undefined, { enabled: !!userId })

  return (
    <RootLayout>
      <div className="grid grid-cols-1 gap-4 overflow-auto p-4 md:grid-cols-2">
        {!userProfile ? <Loading /> : <UserProfile user={userProfile} />}

        <div className="flex flex-col gap-2">
          <ConversationsToolView />
          {!convs ? <Loading /> : convs.map((c) => <AppPlainListView app={c.app} key={c.appId} />)}
        </div>
      </div>
    </RootLayout>
  )
}

export default DashboardPage

export function ConversationsToolView() {
  const { ref, width, height } = useElementSize()
  const expand = width > MAX_MOBILE_WIDTH
  return (
    <div ref={ref} className={clsx("my-2 gap-2", expand ? "flex " : "grid grid-cols-1")}>
      <Input className="grow" placeholder="Find an app..." />
      <div className="flex grow items-center justify-between gap-2">
        <Button variant="outline" className="h-full gap-2">
          Category {expand && <ChevronDownIcon />}
        </Button>
        <Button variant="outline" className="h-full gap-2">
          Language {expand && <ChevronDownIcon />}
        </Button>
        <Button variant="outline" className="h-full gap-2">
          Sort {expand && <ChevronDownIcon />}
        </Button>
        <Button className="h-full gap-2 bg-primary">{expand && <Pencil2Icon />} New</Button>
      </div>
    </div>
  )
}

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  }
}
