import { RootLayout } from '@/layouts/root.layout'
import { AppDetail } from '@/components/app/app-detail'
import { AppList } from '@/components/app/app-list'
import { useAppStore } from '@/store'
import { useChat } from 'ai/react'
import { toast } from 'sonner'
import clsx from 'clsx'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ControlTool } from '@/components/utils/tools'
import { api } from '@/lib/api'
import { useRouter } from 'next/router'
import { UserAppRelationType } from '@/ds/website'
import { type AppWithRelation, type UsingAppWithRelation } from '@/ds/poketto'
import { type ChatMessage } from '.prisma/client'
import { useUser } from '@/hooks/use-user'
import log from '@/lib/log'
import { type PrommptMessage, type User } from '@prisma/client'
import { nanoid } from 'nanoid'

export const prompt2chatMessage = (u: User, c: UsingAppWithRelation, m: PrommptMessage): ChatMessage => ({
	...m,
	userId: u.id,
	createdAt: new Date(),
	updatedAt: new Date(),
	format: 'text',
	usingAppId: c.id,
})


export default function ConversationPage() {
	const router = useRouter()
	const spaceId = router.query.sid as string
	
	const { chatListVisible, convId, chatDetailVisible } = useAppStore()
	const { data: conversations_ = [] } = api.poketto.listConversations.useQuery({ spaceId, relationType: UserAppRelationType.used })
	const conversations = conversations_
	const conv = conversations.find((a) => a.id === convId) ?? conversations[0]
	const user = useUser()
	
	log.info({ apps: conversations, conv })
	
	return (<RootLayout>
		<div className={'w-full h-full overflow-hidden | flex divide-x'}>
			
			{chatListVisible && <AppList apps={conversations}/>}
			
			<section id={'chat-contents'} className={clsx('w-full grow h-full overflow-hidden | flex flex-col')}>
				{user && conv && <AppConversation app={conv.app} msgs={(conv.app.model?.initPrompts ?? [])
					.map((p) => prompt2chatMessage(user, conv, p))}/>}
			</section>
			
			<section id={'poketto-app-detail'}
			         className={clsx('w-full md:w-[375px] shrink-0 overflow-x-hidden', 'h-full overflow-y-auto p-4 gap-4', 'flex flex-col ')}>
				{chatDetailVisible && conv && <AppDetail convs={conversations} app={conv.app} comments={conv.app.comments}/>}
			</section>
		
		</div>
	</RootLayout>)
}

const AppConversation = ({ app, msgs }: { app: AppWithRelation, msgs: ChatMessage[] }) => {
	log.info({ app, msgs })
	
	const { messages, handleSubmit, input, handleInputChange } = useChat({
		initialMessages: [...app.model!.initPrompts ?? [], // ...app?.poketto.conversation?.messages ?? [], // todo
		                  ...msgs,
		], onError: err => {
			toast.error(err.message)
		},
	})
	
	return (<>
		<div className={'w-full p-4 truncate bg-muted | flex items-center justify-between gap-2'}>
			<div>{app?.name}</div>
			<ControlTool/>
		</div>
		
		<div className={'w-full p-2 grow overflow-auto | flex flex-col gap-1'}>
			{
				messages
					.filter((value, index) => app.model!.isOpenSource || index >= (app.model!.initPrompts.length ?? 0))
					.map((msg, index) => <ChatMessageComp msg={msg} key={index}/>)
			}
		</div>
		
		<form className={'w-full p-4 | flex justify-center items-center gap-2'} onSubmit={handleSubmit}>
			<Input name={'prompt'} className={'w-[95%]'} autoFocus value={input} onChange={handleInputChange} id={'input'}/>
			<Button type={'submit'}>Send</Button>
		</form>
	</>)
}

const ChatMessageComp = ({ msg }: { msg: ChatMessage }) => {
	const user = useUser()!
	const role = msg.userId === user.id ? 'user' : 'assistant'
	return (<div
		className={clsx('chat tracking-normal text-sm', role === 'user' ? 'chat-end' : 'chat-start')}>
		
		<div className={clsx('w-full overflow-auto | chat-bubble prose dark:prose-invert prose-sm', {
			'system': 'bg-destructive', 'function': 'bg-destructive', 'user': 'bg-green-600 text-black', 'assistant': 'bg-sidebar text-primary-foreground/75',
		}[role])}>
			
			<ReactMarkdown remarkPlugins={[remarkGfm]}>
				{msg.content}
			</ReactMarkdown>
		</div>
	</div>)
}
