import { CardsLayoutType } from "@/store/ui.slice"
import { order2icon } from "@/lib/assets"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import _ from "lodash"
import { IconDotsVertical } from "@tabler/icons-react"
import clsx from "clsx"
import Link from "next/link"
import { getUserLink } from "@/lib/user"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import numeral from "numeral"
import React from "react"
import { type AppWithRelation, type SortOrder } from "@/ds"

export const AppCardView = ({ app, cardsLayout, sort }: { app: AppWithRelation; cardsLayout: CardsLayoutType; sort: SortOrder }) => {
  const Icon = order2icon[sort]
  return (
    <div className="group relative w-full overflow-hidden rounded-2xl text-white">
      {cardsLayout === CardsLayoutType.grid ? (
        <AspectRatio ratio={3 / 4} className={"overflow-hidden rounded-2xl"}>
          <Image src={app.avatar} fill className={"object-fill transition-all group-hover:scale-125"} alt={app.avatar} />
        </AspectRatio>
      ) : (
        <Image src={app.avatar} width={800} height={600} className={"object-fill transition-all group-hover:scale-125"} alt={app.avatar} />
      )}

      {/* header desc */}
      <div className={"| absolute top-0 flex w-full justify-between p-4"}>
        <div className={"flex items-center gap-2"}>
          {app.tags.length && <Badge variant={"destructive"}>{_.startCase(_.capitalize(app.tags[0]?.name))}</Badge>}
        </div>
        <IconDotsVertical className={"hidden group-hover:flex"} />
      </div>

      {/* footer desc */}
      <div
        className={clsx(
          "| absolute bottom-0 flex w-full flex-col gap-2 p-4",
          "backdrop-blur",
          "dark:backdropbrightness-50 backdrop-brightness-[.75] "
        )}
      >
        {/* title */}
        <div className={"truncate text-lg font-normal"}>{app.name}</div>

        <div className={"text-md hidden transition-all group-hover:line-clamp-3"}>{app.desc}</div>

        {/*	user - ranks */}
        <div className={"| flex justify-between text-xs text-gray-100  dark:text-primary-foreground/75 "}>
          {/* user */}
          <Link className={"| flex w-1/2 items-center gap-2"} href={getUserLink(app.creatorId)}>
            <Avatar className={"wh-5"}>
              <AvatarImage src={app.avatar} />
            </Avatar>
            <span className={"truncate italic"}>{app.name}</span>
          </Link>

          {/* ranks */}
          <div className={"flex items-center gap-1"}>
            <Icon />
            <span>{numeral(app.state?.views).format("0a")}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
