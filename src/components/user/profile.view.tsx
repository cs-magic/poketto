/**
 * Copyright (c) CS-Magic, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { AvatarIcon } from "@radix-ui/react-icons"
import { signIn, signOut } from "next-auth/react"
import { useTranslation } from "next-i18next"
import Link from "next/link"
import React from "react"

import { DEFAULT_USER_ID, DEFAULT_USER_NAME } from "@/config"

import { type UserForProfile } from "@/ds"

import { ChargeContainer } from "@/components/containers"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

import { useUserId } from "@/hooks/use-user"

import { todo } from "@/lib/helpers"
import { getFlowgptUserLink, getImageUri } from "@/lib/string"

export function UserProfile({ user }: { user: UserForProfile }) {
  const { t } = useTranslation()
  const userId = useUserId()
  const isSelf = userId === user.id

  return (
    <div className="| mx-auto flex h-fit max-w-[375px] flex-col justify-around gap-4 rounded-2xl p-4">
      <Avatar className="mx-auto wh-[128px]">
        <AvatarImage src={getImageUri(user?.image ?? user.id, "md")} className="" />
        <AvatarFallback>
          <AvatarIcon />
        </AvatarFallback>
      </Avatar>

      {/* avatar info */}
      <div className="flex flex-col  overflow-hidden">
        {user.platformType === "FlowGPT" ? (
          <Link className="flex items-center gap-2" href={getFlowgptUserLink(user.platformArgs?.uri)} target="_blank">
            <span className={"text-2xl"}>
              {user?.name ?? user?.email ?? user.platformArgs?.uri ?? DEFAULT_USER_NAME}
            </span>
            <Badge className="text-xs" variant="secondary">
              {user.platformType}
            </Badge>
          </Link>
        ) : (
          <span className={"text-2xl "}>
            {user?.name ?? user?.email ?? user.platformArgs?.uri ?? DEFAULT_USER_NAME}
          </span>
        )}
        <p className="truncate text-muted-foreground">@{user?.id ?? DEFAULT_USER_ID}</p>
        {/* todo: description */}
        {/*{isSelf && (*/}
        {/*  <p className="lines-clamp-2 my-2 text-primary-foreground/75">*/}
        {/*    {user?.description ?? "You haven't said anything about yourself ~"}*/}
        {/*  </p>*/}
        {/*)}*/}
      </div>

      {/*	stat */}
      <div className="flex items-center justify-around gap-2">
        <Button disabled={!user} className="flex h-fit grow flex-col items-center gap-2 p-2" variant="ghost">
          <span>{t("common:Following")}</span>
          <span>{user?.followingCount}</span>
        </Button>
        <Separator orientation="vertical" className="h-8" />
        <Button disabled={!user} className="flex h-fit grow  flex-col items-center gap-2 p-2" variant="ghost">
          <span>{t("common:Followers")}</span>
          <span>{user?.followedByCount}</span>
        </Button>
        <Separator orientation="vertical" className="h-8" />
        <Button disabled={!user} className="flex h-fit grow  flex-col items-center gap-2 p-2" variant="ghost">
          <span>{t("common:Impact")}</span>
          <span>{(user?.followedByCount ?? 0) * 1000}</span>
        </Button>
      </div>

      {/*	collections */}
      {isSelf && (
        <div className={"flex flex-col gap-2"}>
          <div className="flex p-flex-equal gap-4">
            {/* todo: edit profile */}
            {/*<Button variant="outline" disabled={!user} className={"w-full"}>*/}
            {/*  {t("common:EditProfile")}*/}
            {/*</Button>*/}

            <Button disabled={!user} className="flex items-center gap-2 p-2" variant="ghost">
              <span>{t("common:Dora")}: </span>
              <span>{user?.balance ?? 0}</span>
            </Button>

            <ChargeContainer asChild>
              <Button variant="outline" disabled={!user} className={"w-full"}>
                {t("common:Charge")}
              </Button>
            </ChargeContainer>

            {/* <Button disabled={!user}>收藏</Button> */}
          </div>
        </div>
      )}
    </div>
  )
}
