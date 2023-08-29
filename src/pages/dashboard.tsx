/**
 * Copyright (c) CS-Magic, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useElementSize } from "@mantine/hooks"
import { ChevronDownIcon, Pencil2Icon } from "@radix-ui/react-icons"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import React, { ReactNode } from "react"

import { MAX_MOBILE_WIDTH } from "@/config"

import { type NextPageWithAuth } from "@/ds"

import { RootLayout } from "@/layouts/root.layout"

import { consumptionHistoryColumns } from "@/components/consumption-history"
import { DataTable } from "@/components/data-table"
import { Loading } from "@/components/loading"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { UserProfile } from "@/components/user/profile.view"

import { useUserId } from "@/hooks/use-user"

import { api } from "@/lib/api"
import clsx from "@/lib/clsx"
import d from "@/lib/datetime"

export const AsyncListContainer = <T extends any>({ items, style }: { items?: T[]; style: (ele: T) => ReactNode }) => {
  return !items ? <Loading /> : !items.length ? "暂无！" : <>{items.map((p, index) => style(p))}</>
}

export const DashboardPage: NextPageWithAuth = () => {
  const userId = useUserId()!
  console.log("dashboard: ", { userId })
  const { data: userProfile } = api.user.getProfile.useQuery({ id: userId })
  const { data: payments } = api.bill.listPayments.useQuery()
  const { data: messages } = api.message.list.useQuery({ userId })

  return (
    <RootLayout>
      <div className="flex flex-col w-full md:max-w-[80%] mx-auto gap-4 overflow-auto">
        {!userProfile ? <Loading /> : <UserProfile user={userProfile} />}

        <Card>
          <CardHeader>
            <CardTitle>充值记录</CardTitle>
          </CardHeader>
          <CardContent className={"p-4"}>
            <AsyncListContainer items={payments} style={(p) => <div>{JSON.stringify(p)}</div>} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>使用记录</CardTitle>
          </CardHeader>
          <CardContent className={"p-4"}>
            {messages ? <DataTable columns={consumptionHistoryColumns} data={messages} /> : <Loading />}

            {/*<AsyncListContainer*/}
            {/*  items={messages ? messages.filter((m) => m.role === "user") : messages}*/}
            {/*  style={(p) => (*/}
            {/*    <div className={"w-full flex items-center overflow-hidden gap-2"}>*/}
            {/*      <div className={"whitespace-nowrap"}>{d(p.createdAt).format("YYYY-MM-DD HH:mm")}</div>*/}
            {/*      <div>{p.conversation.app.name}</div>*/}
            {/*      <div className={"truncate"}>{p.content}</div>*/}
            {/*    </div>*/}
            {/*  )}*/}
            {/*/>*/}
          </CardContent>
        </Card>
      </div>
    </RootLayout>
  )
}

DashboardPage.auth = true

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

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  }
}
