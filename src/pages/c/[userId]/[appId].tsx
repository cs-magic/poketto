import { RootLayout } from "@/layouts/root.layout"
import { useAppStore } from "@/store"
import { type Message, useChat } from "ai/react"
import { toast } from "sonner"
import clsx from "clsx"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { Button } from "@/components/ui/button"
import { api } from "@/lib/api"
import { type ChatMessage, ChatMessageFormatType, PromptRoleType } from ".prisma/client"
import { getHotkeyHandler } from "@mantine/hooks"
import { type FormEvent, useEffect, useRef, useState } from "react"
import Link from "next/link"
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  CodeSandboxLogoIcon,
  DotsVerticalIcon,
  DrawingPinFilledIcon,
  DrawingPinIcon,
  Link2Icon,
} from "@radix-ui/react-icons"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { AppDetail } from "@/components/app-detail-view"
import { type GetServerSideProps } from "next"
import { getSession } from "next-auth/react"
import { prisma } from "@/server/db"
import { getAppLink, getConversationsLink } from "@/lib/string"
import superjson from "superjson"
import { nanoid } from "nanoid"
import { conversationInclude, type ConversationWithRelation, type UserWithRelations, userWithRelationsInclude } from "@/ds"
import { URI } from "@/config"
import { Badge } from "@/components/ui/badge"
import { useMustache } from "@/hooks/use-mustache"
import { Textarea } from "@/components/ui/textarea"

import ScrollToBottom, { useScrollToBottom, useSticky } from "react-scroll-to-bottom"
import log from "@/lib/log"
import { useUser } from "@/hooks/use-user"
import { ConversationList } from "@/components/conversations"

export default function ConversationPage({ conversationStr }: { conversationStr: string }) {
  const c = superjson.parse<ConversationWithRelation>(conversationStr)
  const { chatListVisible, chatDetailVisible } = useAppStore()

  const ui = 7

  return (
    <RootLayout>
      <div className={"| flex h-full w-full divide-x overflow-hidden"}>
        {!!(ui & 1) && chatListVisible && (
          <section className={"relative hidden w-full flex-col items-center overflow-hidden md:flex md:w-[375px]" + " shrink-[.1]"}>
            <ConversationList />
          </section>
        )}

        {!!(ui & 2) && (
          <section className={clsx("| relative flex h-full w-full grow flex-col overflow-hidden transition-all md:min-w-[375px]")}>
            <ConversationMain c={c} />
          </section>
        )}

        {!!(ui & 4) && chatDetailVisible && (
          <section
            className={clsx(
              "hidden w-full shrink-[.1] overflow-x-hidden md:w-[375px] lg:flex",
              "h-full gap-4 overflow-y-auto p-4",
              "flex-col "
            )}
          >
            {chatDetailVisible && c && <AppDetail app={c.app} comments={c.app.comments} />}
          </section>
        )}
      </div>
    </RootLayout>
  )
}

/**
 * [middle] conversation messages
 */

const ConversationMain = ({ c }: { c: ConversationWithRelation }) => {
  return (
    <>
      <div className={"| flex w-full items-center justify-between gap-2 truncate bg-muted px-4 py-5"}>
        <div>{c.app.name}</div>
        <ControlTool c={c} />
      </div>

      <ConversationInput appId={c.appId} />
    </>
  )
}

const ConversationInput = ({ appId }: { appId: string }) => {
  const { data: initialMessages = [] } = api.conv.listMessages.useQuery({ appId })
  const refForm = useRef<HTMLFormElement>(null)

  const utils = api.useContext()
  const { mutate: pushMessage } = api.conv.pushMessage.useMutation({
    onSuccess: () => void utils.conv.listConversations.invalidate(),
  })

  const { messages, handleSubmit, input, handleInputChange, setMessages } = useChat({
    initialMessages,
    onError: (err) => toast.error(err.message),
    onFinish: (msg) => pushMessage({ ...msg, appId }),
    onResponse: (response) => {
      // if (scrolled && response.status === 200) setUnread(true) // 有必要的话，这里可以做更精细地控制
    },
  })
  const post = (event: FormEvent<HTMLFormElement>) => {
    handleSubmit(event)
    pushMessage({ content: input, role: PromptRoleType.user, appId })
  }

  return (
    <>
      <ScrollToBottom className={"w-full grow overflow-auto p-2"} initialScrollBehavior={"auto"}>
        <ConversationMessages messages={messages} appId={appId} />
      </ScrollToBottom>

      <form ref={refForm} className={"| flex w-full items-center justify-center gap-2 p-4"} onSubmit={post}>
        <Textarea
          name={"prompt"}
          className={"w-[95%]"}
          autoFocus
          value={input}
          onChange={handleInputChange}
          id={"input"}
          onKeyDown={getHotkeyHandler([
            //  ref: https://stackoverflow.com/a/71478740
            ["Enter", (event) => refForm.current!.requestSubmit()],
          ])}
        />
      </form>
    </>
  )
}

const ConversationMessages = ({ messages, appId }: { messages: (Message | ChatMessage)[]; appId: string }) => {
  const scrollToBottom = useScrollToBottom()
  const [sticky] = useSticky()
  const [hasUnread, setHasUnread] = useState(false)
  const u = useUser()

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
        // _.reverse(messages)
        u &&
          messages
            // .filter((value, index) => c.app.model!.isOpenSource || index >= (c.app.model!.initPrompts.length ?? 0))
            .map((msg, index) => (
              <ConversationMessage
                msg={{
                  ...msg,
                  userId: u.id,
                  conversationUserId: u.id,
                  conversationAppId: appId,
                  id: nanoid(),
                  createdAt: new Date(),
                  updatedAt: new Date(),
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

const ConversationMessage = ({ msg }: { msg: ChatMessage }) => {
  const { role } = msg
  const m = useMustache()

  return msg.format === ChatMessageFormatType.systemNotification ? (
    <p className={"mx-auto my-2 text-center text-muted-foreground"}>{m(msg.content)}</p>
  ) : (
    <div className={clsx("chat text-sm tracking-normal", role === PromptRoleType.assistant ? "chat-start" : "chat-end")}>
      <div
        className={clsx(
          "| p-prose chat-bubble w-full overflow-auto",
          {
            system: "bg-slate-700",
            function: "bg-destructive",
            user: "bg-green-600 text-black",
            assistant: "bg-muted text-primary-foreground/75 dark:bg-sidebar",
          }[role]
        )}
      >
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{m(msg.content)}</ReactMarkdown>
      </div>
    </div>
  )
}

/**
 * [right] conversation detail (wrapped)
 */

const ControlTool = ({ c }: { c: ConversationWithRelation }) => {
  const { chatDetailVisible, toggleChatDetail, chatListVisible, toggleChatList, toggleSidebar, sidebarVisible } = useAppStore()
  const utils = api.useContext()
  const { mutate: pinConv } = api.conv.pinConv.useMutation({
    onSuccess: void utils.conv.listConversations.invalidate(),
  })

  return (
    <Popover>
      <PopoverTrigger>
        <DotsVerticalIcon />
      </PopoverTrigger>
      <PopoverContent className={"flex flex-col gap-2"}>
        <Link href={"/c/[userId]"} as={getConversationsLink(c.userId)} className={"p-btn-horizontal"}>
          Back <ChevronLeftIcon />
        </Link>
        <Button className={"justify-between pl-4"} variant={"ghost"} onClick={() => pinConv({ appId: c.appId, toStatus: !c.pinned })}>
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

        <Link href={"/p/[appId]"} as={getAppLink(c.appId)} className={"p-btn-horizontal"}>
          Detail <CodeSandboxLogoIcon />
        </Link>

        <Button className={"justify-between pl-4"} variant={"ghost"}>
          Share (todo) <Link2Icon />
        </Button>
      </PopoverContent>
    </Popover>
  )
}

/**
 * server
 */

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx)
  const userId = ctx.query.userId as string
  const appId = ctx.query.appId as string
  // const { userId, appId } = ctx.query

  // logger.info({ time: new Date(), fetching: cid })
  const conversation = await prisma.conversation.findUnique({
    where: { id: { userId, appId } },
    include: conversationInclude,
  })
  // log.info({ time: new Date(), fetched: conversation, userId, appId })
  log.info({ time: new Date(), userId, appId })
  if (!conversation) {
    log.warn({ time: new Date(), userId, appId, conversation })
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    }
  }

  if (session) {
    const conversationStr = superjson.stringify(conversation)
    // logger.info({ time: new Date(), parsed: conversationStr })

    const user = (await prisma.user.findUnique({
      where: { id: session.user.id },
      include: userWithRelationsInclude,
    })) as UserWithRelations

    return {
      props: {
        user,
        conversationStr,
      },
    }
  }

  return {
    redirect: {
      destination: URI.user.auth.signin,
      permanent: false,
    },
  }
}
