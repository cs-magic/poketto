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
import { type FormEvent, SyntheticEvent, useEffect, useRef, useState } from "react"
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
import { AppDetail } from "@/components/app-detail-view"
import { type GetServerSideProps } from "next"
import { getSession } from "next-auth/react"
import { prisma } from "@/server/db"
import { getConversationsLink } from "@/lib/string"
import superjson from "superjson"
import { nanoid } from "nanoid"
import { convDetailInclude, type DetailConv, type UserWithRelations, userWithRelationsInclude } from "@/ds"
import { URI } from "@/config"
import { Badge } from "@/components/ui/badge"
import { useMustache } from "@/hooks/use-mustache"
import { Textarea } from "@/components/ui/textarea"

import ScrollToBottom, { useScrollToBottom, useSticky } from "react-scroll-to-bottom"
import log from "@/lib/log"
import { useUser, useUserId } from "@/hooks/use-user"
import { ConversationList } from "@/components/conversations"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { useRouter } from "next/router"
import _ from "lodash"

export default function ConversationPage() {
  // { conversationStr }: { conversationStr: string }
  // const c = superjson.parse<ConversationWithRelation>(conversationStr)
  const router = useRouter()
  const userId = router.query.userId as string
  const appId = router.query.appId as string
  const { data: convs = [] } = api.conv.listConversations.useQuery()
  const { data: curConv } = api.conv.getConversation.useQuery({ appId })

  // console.log({ convs, curConv })
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
            {curConv && <AppDetail app={curConv.app} comments={[]} />}
          </section>
        )}
      </div>
    </RootLayout>
  )
}

/**
 * [middle] conversation messages
 */

const ConversationMain = ({ c }: { c: DetailConv }) => {
  return (
    <div className={"flex h-full w-full flex-col overflow-hidden"}>
      <div className={"| flex w-full items-center justify-between gap-4 overflow-hidden truncate bg-muted px-4 py-5"}>
        <div />
        <h2 className={"truncate text-center"}>{c.app.name}</h2>
        <ControlTool c={c} />
      </div>

      <div className={"grow overflow-auto"}>
        <ConversationInput appId={c.appId} />
      </div>
    </div>
  )
}

const ConversationInput = ({ appId }: { appId: string }) => {
  const userId = useUserId()
  const { data: initialMessages } = api.conv.listMessages.useQuery({ appId })
  const refForm = useRef<HTMLFormElement>(null)

  const utils = api.useContext()
  const { mutate: pushMessage } = api.conv.pushMessage.useMutation({
    onSuccess: () => {
      console.log("=== called onSuccess")
      void utils.conv.listConversations.invalidate()
    },
  })

  const { isLoading, metadata, messages, handleSubmit, input, handleInputChange, setMessages, stop } = useChat({
    initialMessages,
    onError: (err) => {
      console.warn(err)
      toast.error(err.message, { duration: Infinity })
    },
    onFinish: (msg) => pushMessage({ ...msg, appId }),
    onResponse: (response) => {
      // if (scrolled && response.status === 200) setUnread(true) // 有必要的话，这里可以做更精细地控制
    },
    id: `${userId}-${appId}`,
  })

  /**
   * todo: push in the backend
   */
  const post = (event: FormEvent<HTMLFormElement>) => {
    // ref: https://stackoverflow.com/a/59961329/9422455
    const formData = new FormData(event.currentTarget)
    for (const [key, value] of formData.entries()) {
      console.log(key, value)
    }
    handleSubmit(event)
    pushMessage({ content: input, role: PromptRoleType.user, appId })
  }

  // useEffect(() => {
  //   stop()
  // }, [appId])

  useEffect(() => {
    if (initialMessages) setMessages(initialMessages)
  }, [initialMessages])

  return (
    <div className={"flex h-full w-full flex-col overflow-hidden"}>
      <ScrollToBottom className={"flex w-full grow overflow-auto "} initialScrollBehavior={"auto"}>
        {initialMessages ? (
          <div className={"flex w-full flex-col-reverse p-2"}>
            <ConversationMessages messages={[...messages].reverse()} appId={appId} />
          </div>
        ) : (
          <div className={"flex h-full w-full items-center justify-center"}>
            <SymbolIcon className={"animate-spin"} />
          </div>
        )}
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
        <input className={"hidden"} name={"conversationAppId"} value={appId} />
      </form>
    </div>
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

const ControlTool = ({ c }: { c: DetailConv }) => {
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

        <Dialog>
          <DialogTrigger asChild>
            <Button variant={"ghost"} className={" justify-between xl:hidden"}>
              <span>Detail</span> <CodeSandboxLogoIcon />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <AppDetail app={c.app} comments={[]} />
          </DialogContent>
        </Dialog>

        <Separator orientation={"horizontal"} className={"xl:hidden"} />

        <Button className={"justify-between"} variant={"ghost"} onClick={() => pinConv({ appId: c.appId, toStatus: !c.pinned })}>
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
//
// /**
//  * server
//  */
//
// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   const session = await getSession(ctx)
//   const userId = ctx.query.userId as string
//   const appId = ctx.query.appId as string
//   // const { userId, appId } = ctx.query
//
//   // logger.info({ time: new Date(), fetching: cid })
//   const conversation = await prisma.conversation.findUnique({
//     where: { id: { userId, appId } },
//     include: conversationInclude,
//   })
//   // log.info({ time: new Date(), fetched: conversation, userId, appId })
//   // log.info({ time: new Date(), userId, appId })
//   if (!conversation) {
//     log.warn({ time: new Date(), userId, appId, conversation })
//     return {
//       redirect: {
//         destination: "/404",
//         permanent: false,
//       },
//     }
//   }
//
//   if (session) {
//     const conversationStr = superjson.stringify(conversation)
//     // logger.info({ time: new Date(), parsed: conversationStr })
//
//     const user = (await prisma.user.findUnique({
//       where: { id: session.user.id },
//       include: userWithRelationsInclude,
//     })) as UserWithRelations
//
//     return {
//       props: {
//         user,
//         conversationStr,
//       },
//     }
//   }
//
//   return {
//     redirect: {
//       destination: URI.user.auth.signin,
//       permanent: false,
//     },
//   }
// }
