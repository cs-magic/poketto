/**
 * Copyright (c) CS-Magic, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useRouter } from "next/router"

import { RootLayout } from "@/layouts/root.layout"

import { AppDetailView } from "@/components/app/detail.view"
import { ConversationCore } from "@/components/conv/core"
import { ConversationList } from "@/components/conv/list"

import { api } from "@/lib/api"
import clsx from "@/lib/clsx"

export default function ConversationPage() {
  const router = useRouter()
  const userId = router.query.userId as string
  const appId = router.query.appId as string
  const { data: curConv } = api.conv.get.useQuery(
    {
      conversation: {
        userId,
        appId,
      },
    },
    { enabled: !!(userId && appId) }
  )

  return (
    <RootLayout>
      <div className={clsx("flex h-full w-full", "overflow-hidden")}>
        <section className="hidden w-full shrink-[.1] lg:flex lg:w-[375px]">
          <ConversationList />
        </section>

        <section className={clsx("relative w-full lg:grow", " overflow-hidden")}>
          {curConv && <ConversationCore cid={curConv.id} />}
        </section>

        <section className={clsx("hidden shrink-[.1] xl:flex xl:w-[375px]")}>{curConv && <AppDetailView appId={curConv.appId} />}</section>
      </div>
    </RootLayout>
  )
}
