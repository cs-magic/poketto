/**
 * Copyright (c) CS-Magic, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { getHotkeyHandler, useClipboard } from "@mantine/hooks"
import { PromptRoleType } from "@prisma/client"
import {
  ChevronDownIcon,
  CodeSandboxLogoIcon,
  ComponentInstanceIcon,
  DotsVerticalIcon,
  DrawingPinFilledIcon,
  DrawingPinIcon,
  EnterFullScreenIcon,
  ExitFullScreenIcon,
  FrameIcon,
  HamburgerMenuIcon,
  LayersIcon,
  LightningBoltIcon,
  Link2Icon,
  StackIcon,
} from "@radix-ui/react-icons"
import { useChat } from "ai/react"
import { SendIcon } from "lucide-react"
import { useTranslation } from "next-i18next"
import Link from "next/link"
import React, { ReactPropTypes, useEffect, useRef, useState } from "react"
import ReactMarkdown from "react-markdown"
import { useScrollToBottom, useSticky } from "react-scroll-to-bottom"
import remarkGfm from "remark-gfm"
import { toast } from "sonner"
import Typewriter from "typewriter-effect"

import { useAppStore } from "@/store"

import { contentStyleBasedOnRole } from "@/config"

import { AllMessage, type AppForListView, defaultModelQuota, memoryModes, modelTypes } from "@/ds"

import { AppDetailContainer } from "@/components/app/container"
import { AutoScrollContainer, IconContainer } from "@/components/containers"
import FastChargeForm from "@/components/fast-charge"
import { LogoWithName } from "@/components/layouts/navbar"
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
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"

import { useMustache } from "@/hooks/use-mustache"
import { useUniversalFullscreen } from "@/hooks/use-universal-fullscreen"
import { useUser } from "@/hooks/use-user"

import { api } from "@/lib/api"
import clsx from "@/lib/clsx"
import { packMessageWithDate } from "@/lib/message"
import { getConversationsLink } from "@/lib/string"

export function ConversationCore({ conversationId }: { conversationId: string }) {
  const { t } = useTranslation()
  const { data: c } = api.conv.get.useQuery({ id: conversationId })

  const utils = api.useContext()
  const { mutate: pinConv } = api.conv.pin.useMutation({
    onSuccess: () => {
      void utils.conv.list.invalidate()
      void utils.conv.get.invalidate()
    },
  })

  const { ref, fullscreen, toggle } = useUniversalFullscreen()

  if (!c) return <Loading />

  return (
    <div className={clsx("flex h-full w-full flex-col items-center overflow-hidden ")} ref={ref}>
      <div className={clsx("flex h-full w-full max-w-[1080px] flex-col overflow-hidden")}>
        <div className={clsx("flex w-full items-center justify-between gap-4 bg-muted px-2 py-5 overflow-hidden")}>
          {fullscreen ? <LogoWithName /> : <div />}
          <h2 className="truncate text-center">{c.app.name}</h2>

          <Popover>
            <PopoverTrigger className="shrink-0">
              <IconContainer>
                <DotsVerticalIcon />
              </IconContainer>
            </PopoverTrigger>
            <PopoverContent className="flex flex-col gap-2">
              <Link
                href="/c/[userId]"
                as={getConversationsLink(c.userId)}
                className="p-btn-horizontal justify-between lg:hidden"
              >
                <span>{t("common:general.appList")}</span> <HamburgerMenuIcon />
              </Link>

              <AppDetailContainer appId={c.appId} asChild>
                <Button variant="ghost" className="w-full justify-between xl:hidden" onClick={() => {}}>
                  <span>{t("common:general.detail")}</span> <FrameIcon />
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
                    <span>{t("common:general.unpin")}</span>
                    <DrawingPinIcon />
                  </>
                ) : (
                  <>
                    <span>{t("common:general.pin")}</span>
                    <DrawingPinFilledIcon />
                  </>
                )}
              </Button>

              <Button className="justify-between" variant="ghost" disabled>
                <span>{t("common:general.share")}</span> <Link2Icon />
              </Button>
            </PopoverContent>
          </Popover>
        </div>

        <div className={clsx("w-full grow ", "overflow-auto")}>
          <ConversationInput conversationId={c.id} toggle={toggle} fullscreen={fullscreen} />
        </div>
      </div>
    </div>
  )
}

export function ConversationInput({
  conversationId,
  toggle,
  fullscreen,
}: {
  conversationId: string

  // 这个 fullscreen 和 toggle 是有 context 的，所以要传下来，不能直接在子组件使用 useUniversalFullscreen
  fullscreen: boolean
  toggle: () => void
}) {
  const { modelType, setModelType, memoryMode, setMemoryMode } = useAppStore()
  const { t } = useTranslation()
  const { userId } = useUser()
  const { data: user } = api.user.getProfile.useQuery({ id: userId })
  const { data: conv } = api.conv.get.useQuery({ id: conversationId })
  const { data: hasApp } = api.conv.has.useQuery({ id: conversationId }, { enabled: !!conv })
  const { data: initialMessages } = api.message.list.useQuery({ conversationId: conversationId }, { enabled: !!userId })
  const refForm = useRef<HTMLFormElement>(null)
  const utils = api.useContext()
  const refMessage = useRef<string>("")
  // console.log({ userId, appId, conversationId })
  const ScrollContainer = AutoScrollContainer
  const [alertVisible, setAlertVisible] = useState(false)

  const { isLoading, messages, data, handleSubmit, input, handleInputChange, setMessages, stop } = useChat({
    api: "/api/chat", // explicit default
    initialMessages: [],
    sendExtraMessageFields: true, // 添加 id 信息
    body: { userId, conversationId, modelType, memoryMode },
    onError: (err) => {
      console.warn({ err })
      toast.error(err.message, { duration: Infinity })
    },
    onResponse: async (response) => {
      // console.log("onResponse:", {response })
      refMessage.current = response.headers.get("replyId")!
    },
    onFinish: async (msg) => {
      void utils.conv.list.invalidate()
      void utils.user.getProfile.invalidate()

      console.log("onFinish:", { msg })
      // 不能用以下的办法更新id，会与数据库不同步，性能也不好
      // const latestId = await getLatestId({ conversationId })

      // 以下办法似乎每次都只能拿到旧的数据
      // const n = messages.length
      // setMessages([...messages.slice(0, n - 1), { ...messages[n - 1]!, id: refMessage.current }])
    },
    id: conversationId,
  })

  useEffect(() => {
    stop() // 防止串台
  }, [conversationId])

  useEffect(() => {
    if (initialMessages) {
      setMessages([...initialMessages].reverse())
    }
  }, [initialMessages])

  const modelWeight = (
    Math.floor((modelTypes.findIndex((m) => m === modelType)! / modelTypes.length) * 128) + 128
  ).toString(16)
  const color = `#${modelWeight}${modelWeight}00`
  // console.log({ color })

  const quota = user?.quota ?? defaultModelQuota

  const ColoredIconContainer = (props: ReactPropTypes<typeof IconContainer>) => (
    <IconContainer {...props} style={{ color }} />
  )

  if (!conv || !user) return null

  return (
    <div className={clsx("relative  h-full w-full", "flex  flex-col", "overflow-hidden")}>
      <Dialog>
        <AlertDialog open={alertVisible} onOpenChange={setAlertVisible}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>小 P 提醒</AlertDialogTitle>
              <AlertDialogDescription>
                哎呀，您今天的试用次数已经用完啦，继续需要充值才能继续使用哦:)
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel>取消</AlertDialogCancel>
              <DialogTrigger asChild>
                <AlertDialogAction>确认</AlertDialogAction>
              </DialogTrigger>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <DialogContent className="w-full max-w-[1080px] max-h-[80vh] overflow-auto">
          <StripePricingTable />
        </DialogContent>
      </Dialog>

      <ScrollContainer>
        <div className={clsx("w-full p-2 ")}>
          {/* 因为 ai sdk 是顺序的，所以要逆序，todo: 强制逆序 */}
          {conv && <ConversationMessages messages={packMessageWithDate(messages, user, conv.app).reverse()} />}
        </div>
      </ScrollContainer>

      <div className={"w-full px-4 flex items-center gap-2"}>
        <Select onValueChange={setModelType} value={modelType}>
          <SelectTrigger variant={"simple"}>
            <ColoredIconContainer className={"rounded-sm"}>
              <CodeSandboxLogoIcon />
            </ColoredIconContainer>
          </SelectTrigger>
          <SelectContent side={"top"} className={"w-fit whitespace-nowrap flex flex-col"}>
            <SelectGroup>
              {modelTypes.map((k) => (
                <SelectItem
                  key={k}
                  value={k}
                  onClick={() => {
                    setModelType(k)
                  }}
                  className={clsx("p-2 rounded-sm", modelType === k && "bg-accent")}
                  disabled={k === "openchat"}
                >
                  {k}
                  <span className={"text-xs text-muted-foreground ml-2"}>
                    ({t(`common:model.${k}`)}, 今日试用剩余: {quota[k]})
                  </span>
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select onValueChange={setMemoryMode} value={memoryMode}>
          <SelectTrigger variant={"simple"}>
            <ColoredIconContainer className={"rounded-sm"}>
              {memoryMode === "one-time" ? (
                <ComponentInstanceIcon />
              ) : memoryMode === "recent" ? (
                <StackIcon />
              ) : (
                <LayersIcon />
              )}
            </ColoredIconContainer>
          </SelectTrigger>
          <SelectContent side={"top"} className={"w-fit whitespace-nowrap flex flex-col"}>
            <SelectGroup>
              {memoryModes.map((k) => (
                <SelectItem key={k} value={k}>
                  {t(`common:memoryMode.${k}.title`)}
                  <span className={"text-xs text-muted-foreground ml-2"}>({t(`common:memoryMode.${k}.desc`)})</span>
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Popover>
          <PopoverTrigger>
            <ColoredIconContainer>
              <LightningBoltIcon />
            </ColoredIconContainer>
          </PopoverTrigger>
          <PopoverContent className={"w-fit"}>
            <FastChargeForm />
          </PopoverContent>
        </Popover>

        <ColoredIconContainer onClick={toggle}>
          {fullscreen ? <ExitFullScreenIcon /> : <EnterFullScreenIcon />}
        </ColoredIconContainer>

        {isLoading && (
          <Typewriter
            options={{
              strings: ["……", "……", "……"],
              autoStart: true,
              loop: true,
            }}
          />
        )}
      </div>

      <form
        ref={refForm}
        className={clsx("w-full gap-2 px-4 py-2 | flex items-center justify-center")}
        onSubmit={(event) => {
          event.preventDefault() // 下面不需要是因为 ai sdk 里已经写了
          console.log({ hasApp })

          if (user.balance <= 0 && quota[modelType] <= 0) {
            return setAlertVisible(true)
          }
          handleSubmit(event)
        }}
      >
        <Textarea
          style={{ resize: "none" }} // 去掉尾部的 icon，不然视觉上不和谐
          name="prompt"
          className={clsx("w-full rounded-xl min-h-8 lg:min-h-16", isLoading && "animate-pulse")}
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
          <Card key={msg.id} className={"my-4"}>
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
              msg.role === PromptRoleType.assistant ? "chat-start" : "chat-end",
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
        ),
      )}
      {hasUnread && !sticky && (
        <Badge variant="default" className="absolute bottom-4 right-4 cursor-pointer" onClick={() => scrollToBottom()}>
          New Message <ChevronDownIcon />
        </Badge>
      )}
    </div>
  )
}

/**
 * 目前不需要它，因为现在一定是先添加app，才能开始会话
 *
 * @param app
 * @constructor
 */
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
