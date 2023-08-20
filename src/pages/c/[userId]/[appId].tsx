import { RootLayout } from "@/layouts/root.layout"
import clsx from "clsx"
import { Button } from "@/components/ui/button"
import { api } from "@/lib/api"
import Link from "next/link"
import {
  CodeSandboxLogoIcon,
  DotsVerticalIcon,
  DrawingPinFilledIcon,
  DrawingPinIcon,
  HamburgerMenuIcon,
  Link2Icon,
} from "@radix-ui/react-icons"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { getConversationsLink } from "@/lib/string"
import { type ConvForDetailView } from "@/ds"
import { ConversationList } from "@/components/conversations"
import { Separator } from "@/components/ui/separator"
import { useRouter } from "next/router"
import { AppDetailView } from "@/components/app/detail.view"
import { AppDialogContainer } from "@/components/app/container"
import { ConversationInput } from "@/components/conv/input"

export default function ConversationPage() {
  const router = useRouter()
  const userId = router.query.userId as string
  const appId = router.query.appId as string
  const { data: curConv } = api.conv.get.useQuery(
    {
      conversation: {
        userId,
        appId,
      },
    },
    { enabled: !!(userId && appId) }
  )

  return (
    <RootLayout>
      <div className={"flex h-full w-full overflow-hidden"}>
        <section className={"hidden w-full shrink-[.1] lg:flex lg:w-[375px]"}>
          <ConversationList />
        </section>

        <section className={clsx("w-full overflow-hidden lg:grow")}>{curConv && <ConversationMain c={curConv} />}</section>

        <section className={clsx("hidden shrink-[.1] xl:flex xl:w-[375px]")}>{curConv && <AppDetailView appId={curConv.appId} />}</section>
      </div>
    </RootLayout>
  )
}

const ConversationMain = ({ c }: { c: ConvForDetailView }) => {
  const utils = api.useContext()
  const { mutate: pinConv } = api.conv.pin.useMutation({
    onSuccess: () => {
      void utils.conv.list.invalidate()
      void utils.conv.get.invalidate()
    },
  })

  return (
    <div className={"flex h-full w-full flex-col overflow-hidden"}>
      <div className={"flex w-full items-center justify-between gap-4 overflow-hidden bg-muted px-4 py-5"}>
        <div />
        <h2 className={"truncate text-center"}>{c.app.name}</h2>

        <Popover>
          <PopoverTrigger className={"shrink-0"}>
            <DotsVerticalIcon />
          </PopoverTrigger>
          <PopoverContent className={"flex flex-col gap-2"}>
            <Link href={"/c/[userId]"} as={getConversationsLink(c.userId)} className={"p-btn-horizontal justify-between lg:hidden"}>
              <span>List</span> <HamburgerMenuIcon />
            </Link>

            <AppDialogContainer appId={c.appId}>
              <Button variant={"ghost"} className={"w-full justify-between xl:hidden"} onClick={() => {}}>
                <span>Detail</span> <CodeSandboxLogoIcon />
              </Button>
            </AppDialogContainer>

            <Separator orientation={"horizontal"} className={"xl:hidden"} />

            <Button className={"justify-between"} variant={"ghost"} onClick={() => pinConv({ conversationId: c.id, toStatus: !c.pinned })}>
              {c.pinned ? (
                <>
                  <span>Unpin</span>
                  <DrawingPinIcon />
                </>
              ) : (
                <>
                  <span>Pin</span>
                  <DrawingPinFilledIcon />
                </>
              )}
            </Button>

            <Button className={"justify-between"} variant={"ghost"}>
              <span>Share (todo)</span> <Link2Icon />
            </Button>
          </PopoverContent>
        </Popover>
      </div>

      <div className={"w-full grow overflow-auto"}>
        <ConversationInput conversationId={c.id} app={c.app} />
      </div>
    </div>
  )
}
