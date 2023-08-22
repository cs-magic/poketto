import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getLocalFlowgptImageUri } from "@/lib/string"
import { DEFAULT_USER_ID, DEFAULT_USER_NAME } from "@/config"
import { IconUser } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { todo } from "@/lib/helpers"
import { signIn, signOut } from "next-auth/react"
import React from "react"
import { type UserForProfile } from "@/ds"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import StripePricingTable from "@/components/stripe/pricing-table"
import { ChargeContainer } from "@/components/containers"

export const UserProfile = ({ user }: { user: UserForProfile }) => {
  return (
    <div className={"| mx-auto flex h-fit max-w-[375px] flex-col justify-around gap-4 rounded-2xl p-4"}>
      <Avatar className={"mx-auto wh-[256px]"}>
        <AvatarImage src={getLocalFlowgptImageUri(user?.image ?? user.id, "md")} className={""} />
        <AvatarFallback>
          <IconUser />
        </AvatarFallback>
      </Avatar>

      {/* avatar info*/}
      <div className={"flex flex-col  overflow-hidden"}>
        <h2 className={"text-2xl"}>{user?.name ?? DEFAULT_USER_NAME}</h2>
        <p className={"truncate text-muted-foreground"}>@{user?.id ?? DEFAULT_USER_ID}</p>
        <p className={"lines-clamp-2 my-2 text-primary-foreground/75"}>
          {user?.description ?? "You haven't said anything about yourself ~"}
        </p>
      </div>

      {/*	stat */}
      <div className={"flex items-center justify-around gap-2"}>
        <Button disabled={!user} className={"flex h-fit grow flex-col items-center gap-2 p-2"} variant={"ghost"}>
          <span>关注</span>
          <span>{user?.followingCount}</span>
        </Button>
        <Separator orientation={"vertical"} className={"h-8"} />
        <Button disabled={!user} className={"flex h-fit grow  flex-col items-center gap-2 p-2"} variant={"ghost"}>
          <span>粉丝</span>
          <span>{user?.followedByCount}</span>
        </Button>
        <Separator orientation={"vertical"} className={"h-8"} />
        <Button disabled={!user} className={"flex h-fit grow  flex-col items-center gap-2 p-2"} variant={"ghost"}>
          <span>影响力</span>
          <span>{user?.followedByCount * 1000}</span>
        </Button>
        <Separator orientation={"vertical"} className={"h-8"} />
        <Button disabled={!user} className={"flex h-fit grow  flex-col items-center gap-2 p-2"} variant={"ghost"}>
          <span>甜甜圈</span>
          <span>{user?.balance ?? 0}</span>
        </Button>
      </div>

      {/*	collections */}
      <div className={"flex flex-equal gap-4"}>
        {user ? (
          <>
            <Button variant={"outline"} disabled={!user} onClick={todo}>
              编辑简介
            </Button>

            <ChargeContainer>
              <Button variant={"outline"} disabled={!user}>
                充值
              </Button>
            </ChargeContainer>

            <Button variant={"ghost"} onClick={() => void signOut()}>
              退出登录
            </Button>
          </>
        ) : (
          <Button variant={"destructive"} onClick={() => void signIn()}>
            立即登录
          </Button>
        )}

        {/* <Button disabled={!user}>收藏</Button> */}
      </div>
    </div>
  )
}
