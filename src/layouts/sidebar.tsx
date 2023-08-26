/**
 * Copyright (c) CS-Magic, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { InvitationStatus } from ".prisma/client"
import { ChevronRightIcon, Cross1Icon } from "@radix-ui/react-icons"
import { UserIcon } from "lucide-react"
import { signIn } from "next-auth/react"
import Link from "next/link"
import React from "react"

import { ICON_DIMENSION_MD, URI, USER_INVITATIONS_COUNT, siteConfig } from "@/config"
import { navs } from "@/config-utils"

import { SidebarNavItem } from "@/components/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

import { useMustache } from "@/hooks/use-mustache"
import { useSessionUser } from "@/hooks/use-user"

import { api } from "@/lib/api"
import clsx from "@/lib/clsx"

export function InviteCard() {
  const { data = [] } = api.invitation.list.useQuery()
  // todo: include ? on enum type
  const surplus = data.filter((item) => item.status === InvitationStatus.Idle).length
  const m = useMustache()

  return (
    <div className="hidden lg:flex flex-col gap-2 whitespace-normal rounded-xl border p-4 text-sm">
      <div className="flex items-center justify-between">
        <Badge className="w-fit" variant="secondary">
          Tips
        </Badge>
        <Cross1Icon className="text-muted-foreground wh-4" />
      </div>
      <article className="p-prose">
        {m(
          "每位 [{{appName}}]({{appDoc}}) 用户都拥有 **{{cnt}}** 张邀请码，分享给您的好友注册成功后将有 [{{currencyName}}]({{currencyDoc}})" +
            " 赠送哦！当前剩余：[{{surplus}}](/dashboard)",
          {
            cnt: USER_INVITATIONS_COUNT,
            surplus,
            appName: siteConfig.name,
            appDoc: URI.app.docs.intro,
            currencyName: siteConfig.currency,
            currencyDoc: URI.app.docs.currency,
          }
        )}
      </article>
      <Button className="bg-blue-500/75 hover:bg-blue-500">Invite</Button>
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
      <section className="flex flex-col">
        <SidebarNavItem {...navs.home} />
        <SidebarNavItem {...navs.explore} />
        {/* <MenuLink field={'toolkits'}/> */}
      </section>
      <Separator />
      <section className="flex flex-col">
        <SidebarNavItem {...navs.dashboard} />
        <SidebarNavItem {...navs.gallery} />
        {/* <MenuLink field={'integrations'} link={uri.user.integrations}/> */}
      </section>
      <Separator />
      <section className="flex flex-col">
        <SidebarNavItem {...navs.waitlist} />
        {/*<SidebarNavItem {...navs.enterprise} />*/}
      </section>

      {/* footer */}
      <div className="grow" />

      {user && <InviteCard />}

      {user ? (
        <Link href={URI.user.dashboard} className="flex items-center justify-center gap-2 border-t py-4">
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
          <ChevronRightIcon className="hidden lg:flex shrink-0" />
        </Link>
      ) : (
        <Button variant="destructive" className="my-2" onClick={() => void signIn()}>
          登录
        </Button>
      )}
    </div>
  )
}
