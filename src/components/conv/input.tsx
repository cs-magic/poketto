import { type AppForDetailView, type AppForListView, type SelectChatMessageForListView } from "@/ds"
import { useSessionUser, useUserId } from "@/hooks/use-user"
import { api } from "@/lib/api"
import { useEffect, useRef, useState } from "react"
import { useChat } from "ai/react"
import { toast } from "sonner"
import ScrollToBottom, { useScrollToBottom, useSticky } from "react-scroll-to-bottom"
import { ChevronDownIcon, EnterFullScreenIcon, ExitFullScreenIcon } from "@radix-ui/react-icons"
import { Textarea } from "@/components/ui/textarea"
import { getHotkeyHandler, useClipboard, useFullscreen } from "@mantine/hooks"
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
import { ChatMessageFormatType, Prisma, PromptRoleType } from ".prisma/client"
import clsx from "clsx"
import { contentStyleBasedOnRole } from "@/config"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { Badge } from "@/components/ui/badge"
import d from "@/lib/datetime"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

export const ConversationInput = ({ app, conversationId }: { app: AppForDetailView; conversationId: string }) => {
  const userId = useUserId()
  const user = useSessionUser()
  const { data: hasApp } = api.conv.has.useQuery({ appId: app.id })
  const { data: initialMessages } = api.message.list.useQuery({ conversationId }, { enabled: !!userId })
  const refForm = useRef<HTMLFormElement>(null)
  const utils = api.useContext()
  const [addDialogVisible, setAddDialogVisible] = useState(false)
  const refMessage = useRef<string>("")
  // console.log({ userId, appId, conversationId })

  const { isLoading, messages, handleSubmit, input, handleInputChange, setMessages, stop } = useChat({
    initialMessages: [],
    sendExtraMessageFields: true, // 添加 id 信息
    body: { userId, conversationId },
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
      const n = messages.length
      setMessages([...messages.slice(0, n - 1), { ...messages[n - 1]!, id: refMessage.current }])
    },
    id: conversationId,
  })

  useEffect(() => {
    stop() // 防止串台
  }, [conversationId])

  useEffect(() => {
    if (initialMessages) setMessages(initialMessages)
  }, [initialMessages])

  return (
    <div className={"relative flex h-full w-full flex-col overflow-hidden"}>
      {addDialogVisible && <AddAppAlertDialog app={app} />}

      <ScrollToBottom className={"flex w-full grow overflow-auto bg-cyan-600 p-2 dark:bg-cyan-950"} initialScrollBehavior={"auto"}>
        <ConversationMessages
          messages={[...messages]
            .reverse() /* 因为 ai sdk 是顺序的，所以要逆序，todo: 强制逆序*/
            .map((m) => ({
              ...m,
              createdAt: m.createdAt ?? new Date(),
              format: ChatMessageFormatType.text,
              user:
                m.role === PromptRoleType.user
                  ? {
                      id: user!.id,
                      image: user!.image!,
                      name: user!.name!,
                    }
                  : {
                      id: app.id,
                      image: app.avatar,
                      name: app.name!,
                    },
            }))}
        />
      </ScrollToBottom>

      <form
        ref={refForm}
        className={"| flex w-full items-center justify-center gap-2"}
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
          name={"prompt"}
          className={"w-full"}
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

export const ConversationMessages = ({ messages }: { messages: SelectChatMessageForListView[] }) => {
  const scrollToBottom = useScrollToBottom()
  const [sticky] = useSticky()
  const [hasUnread, setHasUnread] = useState(false)
  const m = useMustache()

  const { url } = useUrl()
  const clipboard = useClipboard({ timeout: 500 })

  useEffect(() => {
    if (!sticky) setHasUnread(true)
  }, [messages.length])

  useEffect(() => {
    if (sticky) setHasUnread(false)
  }, [sticky])

  return (
    // 这里不能加 h-full 因为外层包了一个scroll，要超过容器高度，才可以滚动
    <div className={clsx("relative flex w-full flex-col-reverse")}>
      {/* 这里为了把下面（倒序）的空间给撑起来，使聊天在不占满的情况下，也能从上显示到下（而非粘在底部，从下到上） */}
      <div className={"grow"} />
      {messages.map((msg, index) => (
        <div id={msg.id} key={msg.id} className={clsx("group h-fit w-full")}>
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
                className={"chat-header invisible text-xs opacity-50 group-hover:visible"}
                onClick={() => clipboard.copy(`${url}?id=${msg.id}`)}
              >
                {/*<span className={"mx-2"}>#{msg.id}</span>*/}
                <time className="">{d(msg.createdAt).fromNow()}</time>
              </div>

              <ReactMarkdown className={clsx("p-prose chat-bubble py-0", contentStyleBasedOnRole[msg.role])} remarkPlugins={[remarkGfm]}>
                {m(msg.content)}
              </ReactMarkdown>
            </div>
          )}
        </div>
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
