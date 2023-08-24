/**
 * Copyright (c) CS-Magic, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from "react"
import Link from "next/link"
import { StarIcon } from "@radix-ui/react-icons"
import { type AppForListView } from "@/ds"
import { useUserId } from "@/hooks/use-user"
import { getConversationLink } from "@/lib/string"
import { POKETTO_CREATOR_ID, POKETTO_CREATOR_NAME } from "@/config"
import { Badge } from "@/components/ui/badge"
import d from "@/lib/datetime"
import { Button } from "@/components/ui/button"

/**
 * 在 user/dashboard 里用，参考的 github profile page
 */
export function AppPlainListView({ app }: { app: AppForListView }) {
  const userId = useUserId()!
  return (
    <Link
      className="| | flex w-full justify-between gap-4 border-y p-4"
      key={app.id}
      href="/c/[userId]/[appId]"
      as={getConversationLink(userId, app.id)}
    >
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <h2>{app.name}</h2>
          <div className="flex items-center gap-2">
            {app.creatorId === POKETTO_CREATOR_ID && <Badge className="bg-blue-500 sm:text-xs md:text-sm">{POKETTO_CREATOR_NAME}</Badge>}
            <Badge className="sm:text-xs md:text-sm" variant="outline">
              {app.isOpenSource ? "Open Source" : "Close Source"}
            </Badge>
          </div>
        </div>
        <div className="line-clamp-3 text-muted-foreground">{app.desc}</div>
        <div className="| flex items-center gap-4 text-muted-foreground">
          <div className="inline-flex items-center gap-2">
            <div className="rounded-full bg-blue-500 wh-3" />
            <span>{`${app.category.main}-${app.category.sub}`}</span>
          </div>
          <span>Updated {d(app.updatedAt).fromNow()}</span>
        </div>
      </div>

      <div className="hidden flex-col gap-2 md:flex">
        <Button variant="outline" size="sm" className="h-8 gap-2">
          <StarIcon />
          <span>Star</span>
          {/* <Separator orientation={'vertical'}/> */}
          {/* <ChevronDownIcon/> */}
        </Button>
      </div>
    </Link>
  )
}
