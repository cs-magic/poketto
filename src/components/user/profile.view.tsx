/**
 * Copyright (c) CS-Magic, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { AvatarIcon } from "@radix-ui/react-icons"
import { signIn, signOut } from "next-auth/react"
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
import { getFlowgptUserLink, getLocalFlowgptImageUri } from "@/lib/string"

export function UserProfile({ user }: { user: UserForProfile }) {
  const userId = useUserId()
  const isSelf = userId === user.id

  return (
    <div className="| mx-auto flex h-fit max-w-[375px] flex-col justify-around gap-4 rounded-2xl p-4">
      <Avatar className="mx-auto wh-[256px]">
        <AvatarImage src={getLocalFlowgptImageUri(user?.image ?? user.id, "md")} className="" />
        <AvatarFallback>
          <AvatarIcon />
        </AvatarFallback>
      </Avatar>

      {/* avatar info */}
      <div className="flex flex-col  overflow-hidden">
        <Link className="text-2xl flex items-center gap-2" href={getFlowgptUserLink(user.platformArgs?.uri)} target="_blank">
          <span>{user?.name ?? user?.email ?? user.platformArgs?.uri ?? DEFAULT_USER_NAME}</span>
          <Badge className="text-xs" variant="secondary">
            {user.platformType}
          </Badge>
        </Link>
        <p className="truncate text-muted-foreground">@{user?.id ?? DEFAULT_USER_ID}</p>
        {isSelf && (
          <p className="lines-clamp-2 my-2 text-primary-foreground/75">
            {user?.description ?? "You haven't said anything about yourself ~"}
          </p>
        )}
      </div>

      {/*	stat */}
      <div className="flex items-center justify-around gap-2">
        <Button disabled={!user} className="flex h-fit grow flex-col items-center gap-2 p-2" variant="ghost">
          <span>关注</span>
          <span>{user?.followingCount}</span>
        </Button>
        <Separator orientation="vertical" className="h-8" />
        <Button disabled={!user} className="flex h-fit grow  flex-col items-center gap-2 p-2" variant="ghost">
          <span>粉丝</span>
          <span>{user?.followedByCount}</span>
        </Button>
        <Separator orientation="vertical" className="h-8" />
        <Button disabled={!user} className="flex h-fit grow  flex-col items-center gap-2 p-2" variant="ghost">
          <span>影响力</span>
          <span>{(user?.followedByCount ?? 0) * 1000}</span>
        </Button>
        {isSelf && (
          <>
            <Separator orientation="vertical" className="h-8" />
            <Button disabled={!user} className="flex h-fit grow  flex-col items-center gap-2 p-2" variant="ghost">
              <span>甜甜圈</span>
              <span>{user?.balance ?? 0}</span>
            </Button>
          </>
        )}
      </div>

      {/*	collections */}
      {isSelf && (
        <div className="flex flex-equal gap-4">
          {user ? (
            <>
              <Button variant="outline" disabled={!user} onClick={todo}>
                编辑简介
              </Button>

              <ChargeContainer>
                <Button variant="outline" disabled={!user}>
                  充值
                </Button>
              </ChargeContainer>

              <Button variant="ghost" onClick={() => void signOut()}>
                退出登录
              </Button>
            </>
          ) : (
            <Button variant="destructive" onClick={() => void signIn()}>
              立即登录
            </Button>
          )}

          {/* <Button disabled={!user}>收藏</Button> */}
        </div>
      )}
    </div>
  )
}
