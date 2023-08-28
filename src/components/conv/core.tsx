/**
 * Copyright (c) CS-Magic, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { ChatMessageFormatType, PromptRoleType } from ".prisma/client"
import { getHotkeyHandler, useClipboard } from "@mantine/hooks"
import {
  ChevronDownIcon,
  CodeSandboxLogoIcon,
  DotsVerticalIcon,
  DrawingPinFilledIcon,
  DrawingPinIcon,
  EnterFullScreenIcon,
  ExitFullScreenIcon,
  HamburgerMenuIcon,
  Link2Icon,
} from "@radix-ui/react-icons"
import { useChat } from "ai/react"
import { SendIcon } from "lucide-react"
import Link from "next/link"
import React, { useEffect, useRef, useState } from "react"
import ReactMarkdown from "react-markdown"
import { useScrollToBottom, useSticky } from "react-scroll-to-bottom"
import remarkGfm from "remark-gfm"
import { toast } from "sonner"

import { contentStyleBasedOnRole } from "@/config-utils"

import { type AppForListView, type SelectChatMessageForListView } from "@/ds"

import { LogoWithName } from "@/layouts/navbar"

import { AppDetailContainer } from "@/components/app/container"
import { AutoScrollContainer, ChargeContainer, IconContainer } from "@/components/containers"
import { Loading } from "@/components/loading"
import StripePricingTable from "@/components/stripe/pricing-table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"

import { useMustache } from "@/hooks/use-mustache"
import { useUniversalFullscreen } from "@/hooks/use-universal-fullscreen"
import { useSessionUser, useUserId } from "@/hooks/use-user"

import { api } from "@/lib/api"
import clsx from "@/lib/clsx"
import d from "@/lib/datetime"
import { getConversationsLink } from "@/lib/string"

import { ERR_MSG_BALANCE_NOT_ENOUGH } from "@/const"

type AllMessage =
  | SelectChatMessageForListView
  | {
      systemType: "notification" | "date"
      content: string
    }

export function ConversationCore({ cid }: { cid: string }) {
  const { data: c } = api.conv.get.useQuery({ id: cid })

  const utils = api.useContext()
  const { mutate: pinConv } = api.conv.pin.useMutation({
    onSuccess: () => {
      void utils.conv.list.invalidate()
      void utils.conv.get.invalidate()
    },
  })

  const { ref, toggle, fullscreen } = useUniversalFullscreen()

  if (!c) return <Loading />

  return (
    <div className={clsx("flex h-full w-full flex-col items-center overflow-hidden ")} ref={ref}>
      <div className={clsx("flex h-full w-full max-w-[1080px] flex-col overflow-hidden")}>
        <div className={clsx("flex w-full items-center justify-between gap-4 bg-muted px-2 py-5 overflow-hidden")}>
          {fullscreen ? <LogoWithName /> : <div />}
          <h2 className="truncate text-center">{c.app.name}</h2>

          {fullscreen ? (
            <IconContainer onClick={toggle}>
              <ExitFullScreenIcon />
            </IconContainer>
          ) : (
            <Popover>
              <PopoverTrigger className="shrink-0">
                <IconContainer>
                  <DotsVerticalIcon />
                </IconContainer>
              </PopoverTrigger>
              <PopoverContent className="flex flex-col gap-2">
                <Button variant="ghost" onClick={toggle} className="flex w-full justify-between">
                  <span>{fullscreen ? "窗口模式" : "全屏模式"}</span>
                  {fullscreen ? <ExitFullScreenIcon /> : <EnterFullScreenIcon />}
                </Button>

                <Separator orientation="horizontal" className="hidden md:flex" />

                <Link
                  href="/c/[userId]"
                  as={getConversationsLink(c.userId)}
                  className="p-btn-horizontal justify-between lg:hidden"
                >
                  <span>List</span> <HamburgerMenuIcon />
                </Link>

                <AppDetailContainer appId={c.appId}>
                  <Button variant="ghost" className="w-full justify-between xl:hidden" onClick={() => {}}>
                    <span>Detail</span> <CodeSandboxLogoIcon />
                  </Button>
                </AppDetailContainer>

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

export function ConversationInput({ cid }: { cid: string }) {
  const userId = useUserId()
  const user = useSessionUser()
  const { data: balanceOk } = api.user.validateBalance.useQuery({ id: userId })
  const { data: conv } = api.conv.get.useQuery({ id: cid })
  const { data: hasApp } = api.conv.has.useQuery({ appId: conv?.appId ?? "" }, { enabled: !!conv })
  const { data: initialMessages } = api.message.list.useQuery({ conversationId: cid }, { enabled: !!userId })
  const refForm = useRef<HTMLFormElement>(null)
  const utils = api.useContext()
  const [addDialogVisible, setAddDialogVisible] = useState(false)
  const refMessage = useRef<string>("")
  // console.log({ userId, appId, conversationId })
  const ScrollContainer = AutoScrollContainer
  const [alertVisible, setAlertVisible] = useState(false)

  const { isLoading, messages, data, handleSubmit, input, handleInputChange, setMessages, stop } = useChat({
    initialMessages: [],
    sendExtraMessageFields: true, // 添加 id 信息
    body: { userId, conversationId: cid },
    onError: (err) => {
      console.warn(err)
      toast.error(err.message, { duration: Infinity })
    },
    onResponse: async (response) => {
      // console.log("onResponse:", {response })
      refMessage.current = response.headers.get("replyId")!
    },
    onFinish: async (msg) => {
      void utils.conv.list.invalidate()

      console.log("onFinish:", { msg })
      // 不能用以下的办法更新id，会与数据库不同步，性能也不好
      // const latestId = await getLatestId({ conversationId })

      // 以下办法似乎每次都只能拿到旧的数据
      // const n = messages.length
      // setMessages([...messages.slice(0, n - 1), { ...messages[n - 1]!, id: refMessage.current }])
    },
    id: cid,
  })

  useEffect(() => {
    stop() // 防止串台
  }, [cid])

  useEffect(() => {
    if (initialMessages) {
      setMessages([...initialMessages].reverse())
    }
  }, [initialMessages])

  if (!conv) {
    return null
  }

  const messagesWithDate: AllMessage[] = []
  let curDate = d(new Date(0, 0, 0))
  for (const m of messages) {
    const newDate = d(m.createdAt).startOf("date")
    if (newDate > curDate) {
      curDate = newDate
      messagesWithDate.push({ systemType: "date", content: curDate.format("MMMM DD") })
    }
    messagesWithDate.push({
      ...m,
      user:
        m?.role === PromptRoleType.user
          ? {
              id: user!.id,
              image: user!.image!,
              name: user!.name!,
            }
          : {
              id: conv.app.id,
              image: conv.app.avatar,
              name: conv.app.name!,
            },
      format: "format" in m ? (m.format as ChatMessageFormatType) : ChatMessageFormatType.text,
      createdAt: m?.createdAt ?? new Date(),
    })
  }

  return (
    <div className={clsx("relative  h-full w-full", "flex  flex-col", "overflow-hidden")}>
      <Dialog>
        <AlertDialog open={alertVisible} onOpenChange={setAlertVisible}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>账号提醒</AlertDialogTitle>
              <AlertDialogDescription>哎呀，您的账户余额不足啦，请确认充值才能继续使用哦！</AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel>取消</AlertDialogCancel>
              <DialogTrigger>
                <AlertDialogAction>确认</AlertDialogAction>
              </DialogTrigger>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <DialogContent className="w-full max-w-[1080px] max-h-[80vh] overflow-auto">
          <StripePricingTable />
        </DialogContent>
      </Dialog>

      {addDialogVisible && conv && <AddAppAlertDialog app={conv.app} />}

      <ScrollContainer>
        <div
          className={clsx(
            "w-full p-2 "
            // "bg-cyan-600 dark:bg-cyan-950 "
          )}
        >
          {/* 因为 ai sdk 是顺序的，所以要逆序，todo: 强制逆序 */}
          {conv && <ConversationMessages messages={messagesWithDate.reverse()} />}
        </div>
      </ScrollContainer>

      <form
        ref={refForm}
        className={clsx("w-full gap-2 p-4", "flex items-center justify-center")}
        onSubmit={(event) => {
          event.preventDefault() // 下面不需要是因为 ai sdk 里已经写了
          console.log({ hasApp, balanceOk })
          if (!hasApp) {
            return setAddDialogVisible(true)
          }
          if (!balanceOk) {
            return setAlertVisible(true)
          }
          handleSubmit(event)
        }}
      >
        <Textarea
          style={{ resize: "none" }} // 去掉尾部的 icon，不然视觉上不和谐
          name="prompt"
          className="w-full rounded-xl min-h-8 lg:min-h-16"
          autoFocus
          value={input}
          onChange={handleInputChange}
          id="input"
          onKeyDown={getHotkeyHandler([
            [
              "Enter",
              (event) => {
                // isComposing, ref: https://github.com/facebook/react/issues/13104
                if (!(event as KeyboardEvent).isComposing) {
                  // request submit, ref: https://stackoverflow.com/a/71478740
                  refForm.current!.requestSubmit()
                }
              },
            ],
          ])}
        />
        <input className="hidden" name="conversationUserId" value={userId} />
        <input className="hidden" name="conversationAppId" value={cid} />

        <Button className="lg:hidden flex items-center justify-center" variant="ghost" type="submit">
          <SendIcon />
        </Button>
      </form>
    </div>
  )
}

export function ConversationMessages({ messages }: { messages: AllMessage[] }) {
  const scrollToBottom = useScrollToBottom()
  const [sticky] = useSticky()
  const [hasUnread, setHasUnread] = useState(false)
  const m = useMustache()
  const clipboard = useClipboard({ timeout: 500 })

  useEffect(() => {
    if (!sticky) {
      setHasUnread(true)
    }
  }, [messages.length])

  useEffect(() => {
    if (sticky) {
      setHasUnread(false)
    }
  }, [sticky])

  return (
    // 这里不能加 h-full 因为外层包了一个scroll，要超过容器高度，才可以滚动
    <div className={clsx("relative  w-full", "flex flex-col-reverse", "overflow-auto")}>
      {/* 这里为了把下面（倒序）的空间给撑起来，使聊天在不占满的情况下，也能从上显示到下（而非粘在底部，从下到上） */}
      <div className="grow" />
      {messages.map((msg, index) =>
        "systemType" in msg || msg.format === "systemNotification" ? (
          <div key={index} className="mx-auto my-2 text-center text-muted-foreground">
            {m(msg.content)}
          </div>
        ) : msg.role === "system" ? (
          <Card>
            <CardHeader>
              <CardTitle>AI 人设</CardTitle>
              <CardDescription>AI 的回答将基于此人设进行</CardDescription>
            </CardHeader>
            <CardContent>
              <ReactMarkdown
                className={clsx("p-prose py-0", contentStyleBasedOnRole[msg.role])}
                remarkPlugins={[remarkGfm]}
              >
                {m(msg.content)}
              </ReactMarkdown>
            </CardContent>
          </Card>
        ) : (
          // normal messages
          <div
            id={msg.id}
            key={msg.id}
            className={clsx(
              "group chat text-sm tracking-normal",
              msg.role === PromptRoleType.assistant ? "chat-start" : "chat-end"
            )}
          >
            <div className="avatar chat-image">
              <Avatar>
                <AvatarImage src={msg.user!.image!} />
              </Avatar>
            </div>

            <ReactMarkdown
              className={clsx("p-prose chat-bubble py-0", contentStyleBasedOnRole[msg.role])}
              remarkPlugins={[remarkGfm]}
            >
              {m(msg.content)}
            </ReactMarkdown>
          </div>
        )
      )}
      {hasUnread && !sticky && (
        <Badge variant="default" className="absolute bottom-4 right-4 cursor-pointer" onClick={() => scrollToBottom()}>
          New Message <ChevronDownIcon />
        </Badge>
      )}
    </div>
  )
}

export function AddAppAlertDialog({ app }: { app: AppForListView }) {
  const utils = api.useContext()
  const [addOpen, setAddOpen] = useState(false)

  const { mutateAsync: addApp } = api.conv.add.useMutation({
    onSuccess: async (data) => {
      await utils.conv.has.invalidate()
      toast.success("添加成功！")
    },
  })

  return (
    <AlertDialog open={addOpen} onOpenChange={setAddOpen}>
      <AlertDialogTrigger>Open</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>App 添加提示</AlertDialogTitle>
          <AlertDialogDescription>
            在您没有添加 {app.name} 之前，您无法使用它，请确认是否要继续 ！
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>取消</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              void addApp({ appId: app.id })
              setAddOpen(false)
            }}
          >
            确认
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
