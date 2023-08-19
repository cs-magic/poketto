import React from "react"
import { Separator } from "@/components/ui/separator"
import { clsx } from "clsx"
import { ChevronRightIcon, Cross1Icon } from "@radix-ui/react-icons"
import { SidebarNavItem } from "@/components/link"
import { useAppStore } from "@/store"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ICON_DIMENSION_MD } from "@/lib/assets"
import { UserIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { signIn } from "next-auth/react"
import { api } from "@/lib/api"
import { InvitationStatus } from ".prisma/client"
import { Badge } from "@/components/ui/badge"
import ReactMarkdown from "react-markdown"
import { navs, PRODUCT, URI, USER_INVITATIONS_COUNT } from "@/config"
import { useMustache } from "@/hooks/use-mustache"
import Link from "next/link"
import { useSessionUser } from "@/hooks/use-user"

export const Sidebar = () => {
  const { sidebarVisible } = useAppStore()
  const user = useSessionUser()

  return (
    <div
      className={clsx(
        "hidden h-full max-w-[240px] shrink-0 flex-col gap-6 whitespace-nowrap bg-sidebar px-4 pt-8 text-sm text-primary-foreground md:flex"
      )}
    >
      <section className={"flex flex-col"}>
        <SidebarNavItem {...navs.home} />
        <SidebarNavItem {...navs.explore} />
        {/*<MenuLink field={'toolkits'}/>*/}
      </section>
      <Separator />
      <section className={"flex flex-col"}>
        <SidebarNavItem {...navs.dashboard} />
        <SidebarNavItem {...navs.gallery} />
        {/*<MenuLink field={'integrations'} link={uri.user.integrations}/>*/}
      </section>
      <Separator />
      <section className={"flex flex-col"}>
        <SidebarNavItem {...navs.waitlist} />
        <SidebarNavItem {...navs.enterprise} />
      </section>

      {/* footer */}
      <div className={"grow"} />

      {sidebarVisible && user && <InviteCard />}

      {user ? (
        <Link href={URI.user.dashboard} className={"flex items-center justify-center gap-2 border-t py-4"}>
          <Avatar className={ICON_DIMENSION_MD}>
            <AvatarImage src={user?.image ?? undefined} />
            <AvatarFallback>
              <UserIcon />
            </AvatarFallback>
          </Avatar>

          {sidebarVisible && (
            <>
              <div className={"flex grow flex-col gap-0 overflow-hidden"}>
                <span className={"text-xs"}>{user.name}</span>
                <span className={"truncate text-xs text-muted-foreground"}>{user.id}</span>
              </div>
              <ChevronRightIcon className="shrink-0" />
            </>
          )}
        </Link>
      ) : (
        <Button variant={"destructive"} className="my-2" onClick={() => void signIn()}>
          登录
        </Button>
      )}
    </div>
  )
}

const InviteCard = () => {
  const { data = [] } = api.user.getInvitations.useQuery()
  // todo: include ? on enum type
  const surplus = data.filter((item) => item.status === InvitationStatus.Idle).length
  const m = useMustache()

  return (
    <div className={"| flex flex-col gap-2 whitespace-normal rounded-xl border p-4 text-sm"}>
      <div className={"flex items-center justify-between"}>
        <Badge className={"w-fit"} variant={"secondary"}>
          Tips
        </Badge>
        <Cross1Icon className={"text-muted-foreground wh-4"} />
      </div>
      <article className={"p-prose"}>
        <ReactMarkdown>
          {m(
            "每位 [{{appName}}]({{appDoc}}) 用户都拥有 **{{cnt}}** 张邀请码，分享给您的好友注册成功后将有 [{{currencyName}}]({{currencyDoc}})" +
              " 赠送哦！当前剩余：[{{surplus}}](/dashboard)",
            {
              cnt: USER_INVITATIONS_COUNT,
              surplus,
              appName: PRODUCT.name,
              appDoc: URI.app.docs.intro,
              currencyName: PRODUCT.currency,
              currencyDoc: URI.app.docs.currency,
            }
          )}
        </ReactMarkdown>
      </article>
      <Button className={"bg-blue-500/75 hover:bg-blue-500"}>Invite</Button>
    </div>
  )
}
