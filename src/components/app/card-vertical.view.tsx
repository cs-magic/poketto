/**
 * Copyright (c) CS-Magic, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { DotsVerticalIcon } from "@radix-ui/react-icons"
import _ from "lodash"
import Image from "next/image"

import { type AppForListView, CardsLayoutType, type SortOrder } from "@/ds"

import { UsesField, ViewsField } from "@/components/field"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

import clsx from "@/lib/clsx"
import { getFlowgptUserLink, getLocalFlowgptImageUri } from "@/lib/string"

export function AppVerticalCardView({ app, cardsLayout, sort }: { app: AppForListView; cardsLayout: CardsLayoutType; sort: SortOrder }) {
  // console.log("app avatar: ", app.avatar)
  const appAvatar = getLocalFlowgptImageUri(app.avatar, "md")
  return (
    <div className="group relative w-full overflow-hidden rounded-2xl text-white">
      {cardsLayout === CardsLayoutType.grid ? (
        <AspectRatio ratio={3 / 4} className="overflow-hidden rounded-2xl">
          <Image src={appAvatar} priority fill className="object-fill transition-all group-hover:scale-125" alt={app.name} sizes="300px" />
        </AspectRatio>
      ) : (
        <Image
          src={appAvatar}
          priority
          width={300}
          height={400}
          className="object-fill transition-all group-hover:scale-125"
          alt={app.name}
          style={{ width: "100%", height: "auto" }}
          onError={(error) => {
            console.log({ error })
          }}
        />
      )}

      {/* header desc */}
      <div className="| absolute top-0 flex w-full justify-between p-4">
        <div className="flex items-center gap-2">
          {app.tags.length && <Badge variant="destructive">{_.startCase(_.capitalize(app.tags[0]?.name))}</Badge>}
        </div>
        <DotsVerticalIcon className="hidden group-hover:flex" />
      </div>

      {/* footer desc */}
      <div
        className={clsx(
          "| absolute bottom-0 flex w-full flex-col gap-2 p-4",
          "backdrop-blur",
          "backdrop-brightness-[.75] dark:backdrop-brightness-50 "
        )}
      >
        {/* title */}
        <div className="truncate text-lg font-normal">{app.name}</div>

        <div className="text-md hidden transition-all group-hover:line-clamp-3">{app.desc}</div>

        {/*	user - ranks */}
        <div className="| flex justify-between text-xs text-gray-100  dark:text-primary-foreground/75 ">
          {/* user */}
          <Button
            variant="link"
            className="| flex w-1/2 items-center gap-2"
            onClick={() => {
              window.location.href = getFlowgptUserLink(app.creatorId)
            }}
          >
            <Avatar className="wh-5">
              <AvatarImage src={getLocalFlowgptImageUri(app.avatar, "md")} />
            </Avatar>
            <span className="truncate italic">{app.name}</span>
          </Button>

          {/* ranks */}
          <div className="flex items-center gap-1">
            <UsesField value={app.state?.calls ?? 0} />
            <ViewsField value={app.state?.views ?? 0} />
          </div>
        </div>
      </div>
    </div>
  )
}
