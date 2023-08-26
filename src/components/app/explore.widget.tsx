/**
 * Copyright (c) CS-Magic, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { ArrowRightIcon } from "@radix-ui/react-icons"
import range from "lodash/range"
// import _ from "lodash"
import sampleSize from "lodash/sampleSize"
import Link from "next/link"

import { URI } from "@/config"

import { AppHorizontalCardView } from "@/components/app/card-horizontal.view"
import { AppDialogContainer } from "@/components/app/container"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { api } from "@/lib/api"

const limit = 5

export function ExploreAppsWidget() {
  const query = api.app.list.useInfiniteQuery(
    { limit },
    {
      getNextPageParam: (lastPage, allPages) => lastPage.nextCursor, // 这个必须加
    }
  )
  const apps = query.data?.pages.flatMap((item) => item.items)

  // console.log({ apps })

  return (
    <Card id="explore" variant="ghost" className="w-full grow">
      <CardHeader>
        <div className="| flex shrink-0 items-end justify-between">
          <CardTitle>Explore trending apps</CardTitle>
          <Link href={URI.app.explore}>
            <Button variant="link" className="| flex h-fit items-center gap-2 py-0 text-xs">
              <span>Explore all</span>
              <ArrowRightIcon />
            </Button>
          </Link>
        </div>
      </CardHeader>

      <CardContent className="flex w-full justify-between">
        <div className="flex w-full flex-col divide-y">
          {apps &&
            apps.length >= limit &&
            sampleSize(range(limit), 3).map((i) => (
              <AppDialogContainer appId={apps[i]!.id} key={i}>
                <AppHorizontalCardView app={apps[i]} key={i} />
              </AppDialogContainer>
            ))}
        </div>
      </CardContent>
    </Card>
  )
}
