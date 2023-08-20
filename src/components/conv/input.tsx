import { type AppForListView, type SelectChatMessageForListView } from "@/ds"
import { useSessionUser, useUserId } from "@/hooks/use-user"
import { api } from "@/lib/api"
import { useEffect, useRef, useState } from "react"
import { useChat } from "ai/react"
import { toast } from "sonner"
import { useScrollToBottom, useSticky } from "react-scroll-to-bottom"
import { ChevronDownIcon, Link2Icon } from "@radix-ui/react-icons"
import { Textarea } from "@/components/ui/textarea"
import { getHotkeyHandler, useClipboard } from "@mantine/hooks"
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
import { useMustache } from "@/hooks/use-mustache"
import { useUrl } from "@/hooks/use-url"
import { ChatMessageFormatType, PromptRoleType } from ".prisma/client"
import clsx from "@/lib/clsx"
import { contentStyleBasedOnRole } from "@/config"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { Badge } from "@/components/ui/badge"
import d from "@/lib/datetime"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import { AutoScrollContainer } from "@/components/containers"

export const ConversationInput = ({ cid }: { cid: string }) => {
  const userId = useUserId()
  const user = useSessionUser()
  const { data: conv } = api.conv.get.useQuery({ id: cid })
  const { data: hasApp } = api.conv.has.useQuery({ appId: conv?.appId ?? "" }, { enabled: !!conv })
  const { data: initialMessages } = api.message.list.useQuery({ conversationId: cid }, { enabled: !!userId })
  const refForm = useRef<HTMLFormElement>(null)
  const utils = api.useContext()
  const [addDialogVisible, setAddDialogVisible] = useState(false)
  const refMessage = useRef<string>("")
  // console.log({ userId, appId, conversationId })
  const ScrollContainer = AutoScrollContainer

  const { isLoading, messages, handleSubmit, input, handleInputChange, setMessages, stop } = useChat({
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
    onFinish: async (data) => {
      void utils.conv.list.invalidate()

      console.log("onFinish:", { data })
      // 不能用以下的办法更新id，会与数据库不同步，性能也不好
      // const latestId = await getLatestId({ conversationId })

      // 以下办法似乎每次都只能拿到旧的数据
      const n = messages.length
      // setMessages([...messages.slice(0, n - 1), { ...messages[n - 1]!, id: refMessage.current }])
    },
    id: cid,
  })

  useEffect(() => {
    stop() // 防止串台
  }, [cid])

  useEffect(() => {
    if (initialMessages) setMessages([...initialMessages].reverse())
  }, [initialMessages])

  return (
    <div className={clsx("relative  h-full w-full", "flex  flex-col", "overflow-hidden")}>
      {addDialogVisible && conv && <AddAppAlertDialog app={conv.app} />}

      <ScrollContainer>
        <div className={"w-full bg-cyan-600 p-2 dark:bg-cyan-950 "}>
          {conv && (
            <ConversationMessages
              messages={[...messages]
                .reverse() /* 因为 ai sdk 是顺序的，所以要逆序，todo: 强制逆序*/
                .map((m) => ({
                  ...m,
                  createdAt: m.createdAt ?? new Date(),
                  format: "format" in m ? (m.format as ChatMessageFormatType) : ChatMessageFormatType.text,
                  user:
                    m.role === PromptRoleType.user
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
                }))}
            />
          )}
        </div>
      </ScrollContainer>

      <form
        ref={refForm}
        className={clsx("w-full  gap-2", "flex items-center justify-center")}
        onSubmit={(event) => {
          console.log({ hasApp })
          if (!hasApp) {
            event.preventDefault() // 下面不需要是因为 ai sdk 里已经写了
            return setAddDialogVisible(true)
          }
          handleSubmit(event)
        }}
      >
        <Textarea
          style={{ resize: "none" }} // 去掉尾部的 icon，不然视觉上不和谐
          name={"prompt"}
          className={"w-full rounded-xl m-4"}
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
        <input className={"hidden"} name={"conversationAppId"} value={cid} />
      </form>
    </div>
  )
}

export const ConversationMessages = ({ messages }: { messages: SelectChatMessageForListView[] }) => {
  const scrollToBottom = useScrollToBottom()
  const [sticky] = useSticky()
  const [hasUnread, setHasUnread] = useState(false)
  const m = useMustache()

  const { baseUrl } = useUrl()
  const clipboard = useClipboard({ timeout: 500 })

  useEffect(() => {
    if (!sticky) setHasUnread(true)
  }, [messages.length])

  useEffect(() => {
    if (sticky) setHasUnread(false)
  }, [sticky])

  return (
    // 这里不能加 h-full 因为外层包了一个scroll，要超过容器高度，才可以滚动
    <div className={clsx("relative  w-full", "flex flex-col-reverse", "overflow-auto")}>
      {/* 这里为了把下面（倒序）的空间给撑起来，使聊天在不占满的情况下，也能从上显示到下（而非粘在底部，从下到上） */}
      <div className={"grow"} />
      {messages.map((msg, index) => (
        <Link href={`#${msg.id}`} id={msg.id} key={msg.id} className={clsx("group h-fit w-full")}>
          {"format" in msg && msg.format === ChatMessageFormatType.systemNotification ? (
            // system notification
            <div key={msg.id} className={"mx-auto my-2 text-center text-muted-foreground"}>
              {m(msg.content)}
            </div>
          ) : (
            // normal messages
            <div
              key={msg.id}
              className={clsx("chat text-sm tracking-normal", msg.role === PromptRoleType.assistant ? "chat-start" : "chat-end")}
            >
              <div className="avatar chat-image">
                <Avatar>
                  <AvatarImage src={msg.user!.image!} />
                </Avatar>
              </div>

              <div
                className={clsx(
                  "chat-header  inline-flex items-center gap-2 pb-2 text-xs opacity-50",
                  "invisible group-hover:visible"
                  // "cursor-pointer"
                )}
                // onClick={() => {
                //   // clipboard.copy(`${baseUrl}#${msg.id}`)
                //   clipboard.copy(`${msg.id}`)
                //   toast.success(`copied url`)
                // }}
              >
                {/*<span className={"mx-2"}>#{msg.id}</span>*/}
                <time className="">{d(msg.createdAt).fromNow()}</time>
                {/* 保留功能，复制按钮先不加 */}
                {/*<Link2Icon />*/}
                {/*<span>#{msg.id}</span>*/}
              </div>

              <ReactMarkdown className={clsx("p-prose chat-bubble py-0", contentStyleBasedOnRole[msg.role])} remarkPlugins={[remarkGfm]}>
                {m(msg.content)}
              </ReactMarkdown>
            </div>
          )}
        </Link>
      ))}
      {hasUnread && !sticky && (
        <Badge variant={"default"} className={"absolute bottom-4 right-4 cursor-pointer"} onClick={() => scrollToBottom()}>
          New Message <ChevronDownIcon />
        </Badge>
      )}
    </div>
  )
}

export const AddAppAlertDialog = ({ app }: { app: AppForListView }) => {
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
          <AlertDialogDescription>在您没有添加 {app.name} 之前，您无法使用它，请确认是否要继续 ！</AlertDialogDescription>
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
