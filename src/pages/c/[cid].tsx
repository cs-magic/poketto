import { RootLayout } from "@/layouts/root.layout"
import { useAppStore } from "@/store"
import { useChat } from "ai/react"
import { toast } from "sonner"
import clsx from "clsx"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { api } from "@/lib/api"
import { type ChatMessage, ChatMessageFormatType, PromptRoleType } from ".prisma/client"
import { type User } from "@prisma/client"
import { getHotkeyHandler, useDebouncedState, useDebouncedValue, useScrollIntoView } from "@mantine/hooks"
import { Skeleton } from "@/components/ui/skeleton"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { ViewsField } from "@/components/field"
import React, { type PropsWithChildren, useCallback, useEffect, useRef, useState, FormEvent } from "react"
import Link from "next/link"
import d from "@/lib/datetime"
import { ChevronDownIcon, DotsVerticalIcon } from "@radix-ui/react-icons"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { AppDetail } from "@/components/app-detail-view"
import { type GetServerSideProps } from "next"
import { getSession } from "next-auth/react"
import { prisma } from "@/server/db"
import { getConversationLink } from "@/lib/string"
import superjson from "superjson"
import Mustache from "mustache"
import { nanoid } from "nanoid"
import {
  type AppWithRelation,
  conversationInclude,
  type ConversationWithRelation,
  type UserWithRelations,
  userWithRelationsInclude,
} from "@/ds"
import { URI } from "@/config"
import { Badge } from "@/components/ui/badge"
import { useMustache } from "@/hooks/use-mustache"
import { useRouter } from "next/router"
import logger from "@/lib/logger"
import _ from "lodash"
import { XIcon } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"

export default function ConversationPage({ user, conversationStr }: { user: UserWithRelations; conversationStr: string }) {
  const c = superjson.parse<ConversationWithRelation>(conversationStr)
  const { chatListVisible, chatDetailVisible } = useAppStore()
  const { data: persistedMessages = [] } = api.poketto.listMessages.useQuery({ cid: c.id })
  return (
    <RootLayout>
      <div className={"| flex h-full w-full divide-x overflow-hidden"}>
        {chatListVisible && user && (
          <section className={"| relative flex w-full shrink-0 flex-col items-center md:w-[375px]"}>
            <ConversationList user={user} />
          </section>
        )}

        <section className={clsx("| relative flex h-full w-full grow flex-col overflow-hidden transition-all")}>
          {user && c && <ConversationMessages u={user} c={c} initialMessages={persistedMessages} />}
        </section>

        {chatDetailVisible && (
          <section className={clsx("w-full shrink-0 overflow-x-hidden md:w-[375px]", "h-full gap-4 overflow-y-auto p-4", "flex flex-col ")}>
            {chatDetailVisible && c && <AppDetail app={c.app} comments={c.app.comments} />}
          </section>
        )}
      </div>
    </RootLayout>
  )
}

/**
 [left] conversation list
 */

const ConversationList = ({ user }: { user: User }) => {
  const { data: conversations = [] } = api.poketto.listConversations.useQuery({
    uid: user.id,
  })
  const [searchKey, setSearchKey] = useState("")
  const [toSearch] = useDebouncedValue(searchKey, 200)
  // todo: avoid empty call of trpc
  const { data: searchedApps } = api.flowgpt.searchApps.useQuery({ query: toSearch }, { enabled: toSearch !== "" })

  return (
    <>
      <div className={"relative w-full"}>
        <Input
          value={searchKey}
          placeholder={"Search: Title / Description / Init Prompt"}
          className={"mx-auto my-2 w-[95%] rounded-2xl bg-accent"}
          onChange={(event) => {
            setSearchKey(event.currentTarget.value)
          }}
        />
        {searchKey && (
          <Button className={"absolute bottom-2 right-4 text-muted-foreground"} variant={"ghost"} onClick={() => setSearchKey("")}>
            <XIcon className={" wh-5"} />
          </Button>
        )}
      </div>
      {searchKey ? ( // 搜索时
        searchedApps ? (
          <>
            <SectionTitle>Global search results {searchedApps.length ? "" : " (0)"}</SectionTitle>
            {searchedApps.slice(0, 10).map((prompt) => (
              <SearchResultItem app={prompt} key={prompt.id} />
            ))}
          </>
        ) : (
          <>
            <SectionTitle>Global search results</SectionTitle>
            <Skeleton className={"h-8"} />
          </>
        ) // 	没有搜索时显示最近聊天列表
      ) : (
        <>
          <SectionTitle>Poketto Apps</SectionTitle>
          {conversations
            .slice()
            .sort((a, b) => (a.updatedAt > b.updatedAt ? -1 : 1))
            .map((c) => (
              <ConversationListView key={c.id} c={c} />
            ))}
        </>
      )}

      {/*<SectionTitle>No messages found</SectionTitle>*/}
    </>
  )
}

const ConversationListView = ({ c }: { c: ConversationWithRelation }) => {
  const m = useMustache()
  return (
    <Link href={getConversationLink(c.id)} className={"w-full"}>
      <Button variant={"ghost"} className={"| flex h-fit w-full items-center gap-4 px-4 py-2"}>
        <Avatar className={"shrink-0"}>
          <AvatarImage src={c.app.avatar} />
        </Avatar>

        <div className={"| flex grow flex-col gap-2 overflow-hidden"}>
          <div className={"| flex w-full justify-between gap-2"}>
            <span className={"truncate "}>{c.app.name}</span>
            <span>{d(c.messages[c.messages.length - 1]!.createdAt).calendar()}</span>
          </div>
          <div className={"flex gap-2"}>
            {/* 只有 group 才需要打开 */}
            <span className={"truncate text-muted-foreground"}>{m(c.messages[c.messages.length - 1]!.content)}</span>
          </div>
        </div>
      </Button>
    </Link>
  )
}

const SearchResultItem = ({ app }: { app: AppWithRelation }) => {
  const [open, setOpen] = useState(false)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className={"flex w-full items-center gap-2 p-2 hover:bg-accent"}>
        <Avatar className={"shrink-0"}>
          <AvatarImage src={app.avatar} />
        </Avatar>
        <div className={"| flex grow flex-col gap-1 overflow-hidden"}>
          <p className={"| truncate text-sm font-semibold text-primary-foreground/75"}>{app.name}</p>
          <p className={"| truncate "}>{app.desc}</p>
        </div>
        <div className={"| flex w-20 shrink-0 flex-col gap-1 overflow-hidden whitespace-nowrap"}>
          <ViewsField v={app.state?.views ?? 0} />
          <p className={"truncate"}>@{app.creator.name}</p>
        </div>
      </DialogTrigger>
      <DialogContent className={"max-h-[80vh] overflow-auto"}>
        <AppDetail app={app} comments={[]} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  )
}

/**
 * [middle] conversation messages
 */

const ConversationMessages = ({ u, c, initialMessages }: { u: User; c: ConversationWithRelation; initialMessages: ChatMessage[] }) => {
  const { mutate: pushMessage } = api.poketto.pushMessage.useMutation()
  const [scrolled, setScrolled] = useState(false)
  const [unread, setUnread] = useState(false)

  const { messages, handleSubmit, input, handleInputChange, setMessages } = useChat({
    initialMessages,
    onError: (err) => toast.error(err.message),
    onFinish: (msg) => pushMessage({ ...msg, cid: c.id }),
    onResponse: (response) => {
      if (scrolled && response.status === 200) setUnread(true)
    },
  })

  logger.info({ messages })
  // const { scrollIntoView, targetRef, scrollableRef } = useScrollIntoView<HTMLDivElement>({
  //   offset: 60,
  // })

  // const ref = useRef<HTMLDivElement>(null)
  //
  // useEffect(() => {
  //   // scrollIntoView()
  //   // targetRef.current.focus()
  //   ref.current?.scrollIntoView({})
  // }, [c.id])

  const refScroll = useCallback(
    (node: HTMLDivElement) => {
      if (node) node.scrollIntoView()
    },
    [c.id]
  )

  useEffect(() => {
    setMessages(initialMessages)
  }, [initialMessages])

  useEffect(() => {
    if (!scrolled) {
      setUnread(false)
      // scrollIntoView({ alignment: "end" })
    }
  })

  const refForm = useRef<HTMLFormElement>(null)
  const post = (event: FormEvent<HTMLFormElement>) => {
    handleSubmit(event)
    pushMessage({ content: input, role: PromptRoleType.user, cid: c.id })
  }
  return (
    <>
      <div className={"| flex w-full items-center justify-between gap-2 truncate bg-muted px-4 py-6"}>
        <div>{c.app.name}</div>
        <ControlTool />
      </div>

      <div
        className={"| flex w-full grow flex-col gap-1 overflow-auto p-2"}
        // ref={scrollableRef}
        onScroll={(event) => {
          const { scrollHeight, scrollTop, clientHeight } = event.currentTarget
          setScrolled(scrollHeight >= scrollTop + clientHeight + 1 /*有误差*/)
        }}
      >
        {
          // todo: using ourself messages
          // _.reverse(messages)
          messages
            // .filter((value, index) => c.app.model!.isOpenSource || index >= (c.app.model!.initPrompts.length ?? 0))
            .map((msg, index) => (
              <ConversationMessage
                user={u}
                msg={{
                  ...msg,
                  conversationId: c.id,
                  id: nanoid(),
                  createdAt: new Date(),
                  updatedAt: new Date(),
                  format: ChatMessageFormatType.text,
                  userId: msg.role === PromptRoleType.user ? u.id : "OpenAI",
                }}
                key={index}
              />
            ))
        }
        <div ref={refScroll} className={"mb-auto"} />
      </div>

      {unread && (
        <Badge
          variant={"default"}
          className={"absolute bottom-[80px] right-4"}
          // onClick={() => scrollIntoView()}
        >
          New Message <ChevronDownIcon />
        </Badge>
      )}
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

const ConversationMessage = ({ msg, user }: { user: User; msg: ChatMessage }) => {
  const { role } = msg
  const m = useMustache()
  return msg.format === ChatMessageFormatType.systemNotification ? (
    <span className={"mx-auto my-2 text-muted-foreground"}>{msg.content}</span>
  ) : (
    <div className={clsx("chat text-sm tracking-normal", role === PromptRoleType.assistant ? "chat-start" : "chat-end")}>
      <div
        className={clsx(
          "| prose prose-sm chat-bubble w-full overflow-auto dark:prose-invert",
          {
            system: "bg-slate-700",
            function: "bg-destructive",
            user: "bg-green-600 text-black",
            assistant: "bg-sidebar text-primary-foreground/75",
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

const SectionTitle = ({ children }: PropsWithChildren) => <div className={"| w-full bg-muted px-4 py-2"}>{children}</div>

const ControlTool = () => {
  const { chatDetailVisible, toggleChatDetail, chatListVisible, toggleChatList, toggleSidebar, sidebarVisible } = useAppStore()

  return (
    <Popover>
      <PopoverTrigger>
        <DotsVerticalIcon />
      </PopoverTrigger>
      <PopoverContent className={"flex flex-col gap-2"}>
        <Button className={"justify-start pl-4"} variant={"ghost"} onClick={toggleSidebar}>
          {(sidebarVisible ? "Hide" : "Show") + " Sidebar"}
        </Button>
        <Button className={"justify-start pl-4"} variant={"ghost"} onClick={toggleChatList}>
          {(chatListVisible ? "Hide" : "Show") + " Chat List"}
        </Button>
        <Button className={"justify-start pl-4"} variant={"ghost"} onClick={toggleChatDetail}>
          {(chatDetailVisible ? "Hide" : "Show") + " Chat Detail"}
        </Button>
        <Button className={"justify-start pl-4"} variant={"ghost"}>
          Share (todo)
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
  const cid = ctx.query.cid as string
  const conversation = await prisma.conversation.findUnique({
    where: { id: cid },
    include: conversationInclude,
  })
  if (!conversation) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    }
  }

  if (session) {
    const user = (await prisma.user.findUnique({
      where: { id: session.user.id },
      include: userWithRelationsInclude,
    })) as UserWithRelations
    return {
      props: {
        user,
        conversationStr: superjson.stringify(conversation),
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
