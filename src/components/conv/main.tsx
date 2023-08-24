/**
 * Copyright (c) CS-Magic, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useFullscreen } from "@mantine/hooks"
import {
  CodeSandboxLogoIcon,
  DotsVerticalIcon,
  DrawingPinFilledIcon,
  DrawingPinIcon,
  EnterFullScreenIcon,
  ExitFullScreenIcon,
  HamburgerMenuIcon,
  Link2Icon,
  SymbolIcon,
} from "@radix-ui/react-icons"
import Link from "next/link"
import { api } from "@/lib/api"
import clsx from "@/lib/clsx"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { getConversationsLink } from "@/lib/string"
import { AppDialogContainer } from "@/components/app/container"
import { ConversationInput } from "@/components/conv/input"
import { LogoWithName } from "@/layouts/navbar"

export function ConversationMain({ cid }: { cid: string }) {
  const { data: c } = api.conv.get.useQuery({ id: cid })

  const utils = api.useContext()
  const { mutate: pinConv } = api.conv.pin.useMutation({
    onSuccess: () => {
      void utils.conv.list.invalidate()
      void utils.conv.get.invalidate()
    },
  })
  const { ref, toggle, fullscreen } = useFullscreen()

  if (!c) {return <SymbolIcon />}

  return (
    <div className={clsx("flex h-full w-full flex-col items-center", "overflow-hidden ")} ref={ref}>
      <div className={clsx("flex h-full w-full max-w-[1080px] flex-col  !backdrop-blur-lg", "overflow-hidden")}>
        <div className={clsx("flex w-full items-center justify-between gap-4  bg-muted py-5", "overflow-hidden")}>
          {fullscreen ? <LogoWithName /> : <div />}
          <h2 className="truncate text-center">{c.app.name}</h2>

          {fullscreen ? (
            <span className="text-muted-foreground px-4">ESC to exit</span>
          ) : (
            <Popover>
              <PopoverTrigger className="shrink-0">
                <DotsVerticalIcon />
              </PopoverTrigger>
              <PopoverContent className="flex flex-col gap-2">
                <Button variant="ghost" onClick={toggle} className="hidden w-full justify-between md:flex">
                  <span>{fullscreen ? "窗口模式" : "全屏模式"}</span>
                  {fullscreen ? <ExitFullScreenIcon /> : <EnterFullScreenIcon />}
                </Button>

                <Separator orientation="horizontal" className="hidden md:flex" />

                <Link href="/c/[userId]" as={getConversationsLink(c.userId)} className="p-btn-horizontal justify-between lg:hidden">
                  <span>List</span> <HamburgerMenuIcon />
                </Link>

                <AppDialogContainer appId={c.appId}>
                  <Button variant="ghost" className="w-full justify-between xl:hidden" onClick={() => {}}>
                    <span>Detail</span> <CodeSandboxLogoIcon />
                  </Button>
                </AppDialogContainer>

                <Separator orientation="horizontal" className="xl:hidden" />

                <Button
                  className="justify-between"
                  variant="ghost"
                  onClick={() => pinConv({ conversationId: c.id, toStatus: !c.pinned })}
                >
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

                <Button className="justify-between" variant="ghost">
                  <span>Share (todo)</span> <Link2Icon />
                </Button>
              </PopoverContent>
            </Popover>
          )}
        </div>

        <div className={clsx("w-full grow ", "overflow-auto")}>
          <ConversationInput cid={c.id} />
        </div>
      </div>
    </div>
  )
}
