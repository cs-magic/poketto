/**
 * Copyright (c) CS-Magic, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { ArrowRightIcon } from "@radix-ui/react-icons"
import range from "lodash/range"
import sampleSize from "lodash/sampleSize"
import { useTranslation } from "next-i18next"
import Link from "next/link"

import { URI } from "@/config"

import { AppHorizontalCardView } from "@/components/app/card-horizontal.view"
import { AppDetailContainer } from "@/components/app/container"
import { Loading } from "@/components/loading"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { api } from "@/lib/api"

const limit = 5

export function ExploreAppsWidget() {
  const { i18n, t } = useTranslation()

  const query = api.app.list.useInfiniteQuery(
    {
      limit,
      language: i18n.language === "zh-CN" ? "zh" : "en",
    },
    {
      getNextPageParam: (lastPage, allPages) => lastPage.nextCursor, // 这个必须加
    }
  )
  const apps = query.data?.pages.flatMap((item) => item.items)

  // console.log({ apps })

  return (
    <Card id="explore" variant="ghost" className="w-full grow | flex flex-col">
      <CardHeader>
        <div className="| flex shrink-0 items-end justify-between">
          <CardTitle>{t("homepage:exploreTrendingApps")}</CardTitle>
          <Link href={URI.app.explore}>
            <Button variant="link" className="| flex h-fit items-center gap-2 py-0 text-xs">
              <span>{t("homepage:exploreAll")}</span>
              <ArrowRightIcon />
            </Button>
          </Link>
        </div>
      </CardHeader>

      <CardContent className="w-full grow | flex justify-between">
        <div className="w-full h-full | flex flex-col divide-y">
          {!apps ? (
            <Loading />
          ) : (
            apps.length >= limit &&
            sampleSize(range(limit), 3).map((i) => (
              <AppDetailContainer appId={apps[i]!.id} key={i}>
                <AppHorizontalCardView app={apps[i]} key={i} />
              </AppDetailContainer>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
