import { RootLayout } from "@/layouts/root.layout"
import { type Message, useChat } from "ai/react"
import { toast } from "sonner"
import clsx from "clsx"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { Button } from "@/components/ui/button"
import { api } from "@/lib/api"
import { type ChatMessage, ChatMessageFormatType, Prisma, PromptRoleType } from ".prisma/client"
import { getHotkeyHandler } from "@mantine/hooks"
import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  CodeSandboxLogoIcon,
  DotsVerticalIcon,
  DrawingPinFilledIcon,
  DrawingPinIcon,
  Link2Icon,
  SymbolIcon,
} from "@radix-ui/react-icons"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { getConversationsLink } from "@/lib/string"
import { type AppForDetailView, type ConvForDetailView } from "@/ds"
import { Badge } from "@/components/ui/badge"
import { useMustache } from "@/hooks/use-mustache"
import { Textarea } from "@/components/ui/textarea"

import ScrollToBottom, { useScrollToBottom, useSticky } from "react-scroll-to-bottom"
import { useUserId } from "@/hooks/use-user"
import { ConversationList } from "@/components/conversations"
import { Separator } from "@/components/ui/separator"
import { useRouter } from "next/router"
import { AppDetailView } from "@/components/app/detail.view"
import { AppDialogContainer } from "@/components/app/container"
import { contentStyleBasedOnRole } from "@/config"
import ChatMessageGetPayload = Prisma.ChatMessageGetPayload
import { has } from "lodash"
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
import ChatMessageWhereInput = Prisma.ChatMessageWhereInput
import validator = Prisma.validator

export default function ConversationPage() {
  const router = useRouter()
  const userId = router.query.userId as string
  const appId = router.query.appId as string
  console.log({ userId, appId })
  const { data: curConv } = api.conv.getConversation.useQuery({ conversation: { userId, appId } }, { enabled: !!(userId && appId) })

  const ui = 7

  return (
    <RootLayout>
      <div className={"flex h-full w-full overflow-auto"}>
        {!!(ui & 1) && (
          <section className={"hidden w-full shrink-[.1] lg:flex lg:w-[375px]"}>
            <ConversationList />
          </section>
        )}

        {!!(ui & 2) && <section className={clsx("w-full lg:grow")}>{curConv && <ConversationMain c={curConv} />}</section>}

        {!!(ui & 4) && (
          <section className={clsx("hidden shrink-[.1] xl:flex xl:w-[375px]")}>
            {curConv && <AppDetailView appId={curConv.appId} />}
          </section>
        )}
      </div>
    </RootLayout>
  )
}

/**
 * [middle] conversation messages
 */

const ConversationMain = ({ c }: { c: ConvForDetailView }) => {
  return (
    <div className={"flex h-full w-full flex-col overflow-hidden"}>
      <div className={"| flex w-full items-center justify-between gap-4 overflow-hidden truncate bg-muted px-4 py-5"}>
        <div />
        <h2 className={"truncate text-center"}>{c.app.name}</h2>
        <ControlTool c={c} />
      </div>

      <div className={"grow overflow-auto"}>
        <ConversationInput conversationId={c.id} app={c.app} />
      </div>
    </div>
  )
}

const ConversationInput = ({ app, conversationId }: { app: AppForDetailView; conversationId: string }) => {
  const userId = useUserId()
  const { data: hasApp } = api.conv.hasApp.useQuery({ appId: app.id })
  const { data: initialMessages } = api.conv.listMessages.useQuery(
    validator<ChatMessageWhereInput>()({
      userId: userId!,
      conversationId,
    }),
    { enabled: !!userId }
  )
  const refForm = useRef<HTMLFormElement>(null)
  const utils = api.useContext()
  const [addOpen, setAddOpen] = useState(false)

  const { mutateAsync: addApp } = api.app.addAppIntoConversation.useMutation({
    onSuccess: async (data) => {
      await utils.conv.hasApp.invalidate()
      toast.success("添加成功！")
    },
  })

  const { isLoading, metadata, messages, handleSubmit, input, handleInputChange, setMessages, stop } = useChat({
    initialMessages,
    body: {
      userId,
      conversationId,
    },
    onError: (err) => {
      console.warn(err)
      toast.error(err.message, { duration: Infinity })
    },
    onFinish: (msg) => void utils.conv.listConversations.invalidate(),
    id: conversationId,
  })

  const validatedSubmit = (event) => {
    console.log({ hasApp })
    if (!hasApp) {
      event.preventDefault() // 下面不需要是因为 ai sdk 里已经写了
      return setAddOpen(true)
    }
    handleSubmit(event)
  }

  useEffect(() => {
    stop() // 防止串台
  }, [conversationId])

  useEffect(() => {
    if (initialMessages) setMessages(initialMessages)
  }, [initialMessages])

  return (
    <div className={"flex h-full w-full flex-col overflow-hidden"}>
      <AlertDialog open={addOpen} onOpenChange={setAddOpen}>
        <AlertDialogTrigger>Open</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>App 添加提示</AlertDialogTitle>
            <AlertDialogDescription>在您没有添加 {app.name} 之前，您无法使用它，请确认是否要继续 ！</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction onClick={() => void addApp({ appId: app.id })}>确认</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <ScrollToBottom className={"flex w-full grow overflow-auto "} initialScrollBehavior={"auto"}>
        {initialMessages ? (
          <div className={"flex w-full flex-col-reverse p-2"}>
            <ConversationMessages messages={[...messages].reverse()} conversationId={conversationId} />
          </div>
        ) : (
          <div className={"flex h-full w-full items-center justify-center"}>
            <SymbolIcon className={"animate-spin"} />
          </div>
        )}
      </ScrollToBottom>

      <form ref={refForm} className={"| flex w-full items-center justify-center gap-2 p-4"} onSubmit={validatedSubmit}>
        <Textarea
          name={"prompt"}
          className={"w-[95%]"}
          autoFocus
          value={input}
          onChange={handleInputChange}
          id={"input"}
          onKeyDown={getHotkeyHandler([
            [
              "Enter",
              (event) => {
                // isComposing, ref: https://github.com/facebook/react/issues/13104
                if (!(event as KeyboardEvent).isComposing)
                  // request submit, ref: https://stackoverflow.com/a/71478740
                  refForm.current!.requestSubmit()
              },
            ],
          ])}
        />
        <input className={"hidden"} name={"conversationUserId"} value={userId} />
        <input className={"hidden"} name={"conversationAppId"} value={conversationId} />
      </form>
    </div>
  )
}

const ConversationMessages = ({ messages, conversationId }: { messages: (Message | ChatMessage)[]; conversationId: string }) => {
  const scrollToBottom = useScrollToBottom()
  const [sticky] = useSticky()
  const [hasUnread, setHasUnread] = useState(false)

  useEffect(() => {
    if (!sticky) setHasUnread(true)
  }, [messages.length])

  useEffect(() => {
    if (sticky) setHasUnread(false)
  }, [sticky])

  return (
    <>
      {
        // todo: using ourself messages
        messages
          // .filter((value, index) => c.app.model!.isOpenSource || index >= (c.app.model!.initPrompts.length ?? 0))
          .map((msg, index) => (
            <ConversationMessage
              msg={{
                ...msg,
                format: "format" in msg ? msg.format : ChatMessageFormatType.text,
              }}
              key={index}
            />
          ))
      }
      {hasUnread && !sticky && (
        <Badge variant={"default"} className={"absolute bottom-4 right-4 cursor-pointer"} onClick={() => scrollToBottom()}>
          New Message <ChevronDownIcon />
        </Badge>
      )}
    </>
  )
}

const ConversationMessage = ({ msg }: { msg: ChatMessageGetPayload<{ select: { role: true; format: true; content: true } }> }) => {
  const { role } = msg
  const m = useMustache()

  return msg.format === ChatMessageFormatType.systemNotification ? (
    <p className={"mx-auto my-2 text-center text-muted-foreground"}>{m(msg.content)}</p>
  ) : (
    <div className={clsx("chat text-sm tracking-normal", role === PromptRoleType.assistant ? "chat-start" : "chat-end")}>
      <div className={clsx("| p-prose chat-bubble w-full overflow-auto", contentStyleBasedOnRole[role])}>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{m(msg.content)}</ReactMarkdown>
      </div>
    </div>
  )
}

/**
 * [right] conversation detail (wrapped)
 */

const ControlTool = ({ c }: { c: ConvForDetailView }) => {
  const utils = api.useContext()
  const { mutate: pinConv } = api.conv.pinConv.useMutation({
    onSuccess: () => {
      void utils.conv.listConversations.invalidate()
      void utils.conv.getConversation.invalidate()
    },
  })

  return (
    <Popover>
      <PopoverTrigger>
        <DotsVerticalIcon />
      </PopoverTrigger>
      <PopoverContent className={"flex flex-col gap-2"}>
        <Link href={"/c/[userId]"} as={getConversationsLink(c.userId)} className={"p-btn-horizontal justify-between lg:hidden"}>
          <span>Back</span> <ChevronLeftIcon />
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
  )
}
