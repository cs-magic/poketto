import { CardsLayoutType } from "@/store/ui.slice"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import _ from "lodash"
import { IconDotsVertical } from "@tabler/icons-react"
import clsx from "clsx"
import Link from "next/link"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { type AppWithRelation, type SortOrder } from "@/ds"
import { UsesField, ViewsField } from "@/components/field"
import { getLocalFlowgptImageUri, getUserLink } from "@/lib/string"
import { Button } from "./ui/button"

export const AppCardView = ({ app, cardsLayout, sort }: { app: AppWithRelation; cardsLayout: CardsLayoutType; sort: SortOrder }) => {
  return (
    <div className="group relative w-full overflow-hidden rounded-2xl text-white">
      {cardsLayout === CardsLayoutType.grid ? (
        <AspectRatio ratio={3 / 4} className={"overflow-hidden rounded-2xl"}>
          <Image
            src={app.avatar}
            priority
            fill
            className={"object-fill transition-all group-hover:scale-125"}
            alt={app.avatar}
            sizes={"300px"}
          />
        </AspectRatio>
      ) : (
        <Image
          src={app.avatar}
          priority
          width={300}
          height={400}
          className={"object-fill transition-all group-hover:scale-125"}
          alt={app.avatar}
          style={{ width: "100%", height: "auto" }}
        />
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
          "backdrop-brightness-[.75] dark:backdrop-brightness-50 "
        )}
      >
        {/* title */}
        <div className={"truncate text-lg font-normal"}>{app.name}</div>

        <div className={"text-md hidden transition-all group-hover:line-clamp-3"}>{app.desc}</div>

        {/*	user - ranks */}
        <div className={"| flex justify-between text-xs text-gray-100  dark:text-primary-foreground/75 "}>
          {/* user */}
          <Button
            variant={"link"}
            className={"| flex w-1/2 items-center gap-2"}
            onClick={() => {
              window.location.href = getUserLink(app.creatorId)
            }}
          >
            <Avatar className={"wh-5"}>
              <AvatarImage src={getLocalFlowgptImageUri(app.avatar, "md")} />
            </Avatar>
            <span className={"truncate italic"}>{app.name}</span>
          </Button>

          {/* ranks */}
          <div className={"flex items-center gap-1"}>
            <UsesField value={app.state?.calls ?? 0} />
            <ViewsField value={app.state?.views ?? 0} />
          </div>
        </div>
      </div>
    </div>
  )
}
