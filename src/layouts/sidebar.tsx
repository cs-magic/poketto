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

import { ICON_DIMENSION_MD, URI, siteConfig } from "@/config"
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
        <Cross1Icon className="text-muted-foreground wh-4" />
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

export function Sidebar() {
  const user = useSessionUser()

  return (
    <div
      className={clsx(
        "hidden md:flex | max-w-[240px] shrink-0 h-full overflow-auto px-4 pt-8 | flex-col gap-6 | whitespace-nowrap bg-sidebar text-sm text-primary-foreground"
      )}
    >
      {Object.entries(sidebarSections).map(([key, keys]) => (
        <>
          <Separator className={"first:hidden"} />
          <section className="flex flex-col">
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
            <span className="truncate text-xs text-muted-foreground">{user.id}</span>
          </div>
          <IconContainer className="hidden lg:flex shrink-0">
            <BellIcon />
          </IconContainer>
          {/*<ChevronRightIcon className="hidden lg:flex shrink-0" />*/}
        </Link>
      ) : (
        <Button variant="destructive" className="my-2" onClick={() => void signIn()}>
          登录
        </Button>
      )}
    </div>
  )
}
