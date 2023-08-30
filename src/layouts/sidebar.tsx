/**
 * Copyright (c) CS-Magic, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { InvitationStatus } from ".prisma/client"
import { BellIcon, ChevronRightIcon, Cross1Icon } from "@radix-ui/react-icons"
import { UserIcon } from "lucide-react"
import { signIn } from "next-auth/react"
import { useTranslation } from "next-i18next"
import Link from "next/link"
import React from "react"
import ReactMarkdown from "react-markdown"

import { ICON_DIMENSION_MD, ICON_DIMENSION_SM, URI, siteConfig } from "@/config"
import { menuItems, sidebarSections } from "@/config-utils"

import { ChargeContainer, IconContainer } from "@/components/containers"
import { SidebarNavItem } from "@/components/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

import { useSessionUser } from "@/hooks/use-user"

import { api } from "@/lib/api"
import clsx from "@/lib/clsx"

export function Sidebar() {
  const { t } = useTranslation()
  const user = useSessionUser()

  return (
    <div
      className={clsx(
        "shrink-0 h-full overflow-auto pt-8 gap-6 | hidden md:flex flex-col items-center | whitespace-nowrap bg-sidebar text-sm text-primary-foreground"
      )}
    >
      {Object.entries(sidebarSections).map(([key, keys]) => (
        <>
          <Separator className={"first:hidden"} />
          <section className="w-full flex flex-col">
            {keys.map((key) => (
              <SidebarNavItem key={key} {...menuItems.find((i) => i.field === key)!} />
            ))}
          </section>
        </>
      ))}

      {/* footer */}
      <div className="grow" />

      {/*{user && <InviteCard />}*/}

      {user ? (
        <Link href={URI.user.mySpace} className="flex items-center justify-center gap-2 border-t py-4">
          <Avatar className={ICON_DIMENSION_MD}>
            <AvatarImage src={user?.image ?? undefined} />
            <AvatarFallback>
              <UserIcon />
            </AvatarFallback>
          </Avatar>

          <div className="hidden lg:flex grow flex-col gap-0 overflow-hidden">
            <span className="text-xs">{user.name}</span>
            <span className="truncate text-xs text-muted-foreground italic">@{user.id}</span>
          </div>
          <IconContainer className="hidden lg:flex shrink-0">
            <BellIcon />
          </IconContainer>
          {/*<ChevronRightIcon className="hidden lg:flex shrink-0" />*/}
        </Link>
      ) : (
        <div className={"w-full p-2 flex justify-center"}>
          <Button variant="destructive" className="w-full hidden lg:block" onClick={() => void signIn()}>
            {t("common:Login")}
          </Button>
          <Avatar className={"block lg:hidden"} onClick={() => void signIn()}>
            <AvatarFallback>
              <UserIcon />
            </AvatarFallback>
          </Avatar>
        </div>
      )}
    </div>
  )
}

export function InviteCard() {
  const { data = [] } = api.invitation.list.useQuery()
  // todo: include ? on enum type
  const surplus = data.filter((item) => item.status === InvitationStatus.Idle).length

  return (
    <div className="hidden lg:flex flex-col gap-2 whitespace-normal rounded-xl border p-4 text-sm">
      <div className="flex items-center justify-between">
        <Badge className="w-fit" variant="secondary">
          Tips
        </Badge>
        <Cross1Icon className={clsx("text-muted-foreground", ICON_DIMENSION_SM)} />
      </div>
      <article className="p-prose">
        <ReactMarkdown>
          {`每位 ${siteConfig.name} 用户都拥有 **5** 张邀请码，分享给您的好友注册成功后将有优惠券赠送哦！当前剩余：[${surplus}](/dashboard)`}
        </ReactMarkdown>
      </article>
      <Button className="bg-blue-500/75 hover:bg-blue-500">立即邀请</Button>
    </div>
  )
}
