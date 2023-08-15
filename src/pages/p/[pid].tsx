import { RootLayout } from '@/layouts/root.layout'
import { useAppStore } from '@/store'
import { useChat } from 'ai/react'
import { toast } from 'sonner'
import clsx from 'clsx'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { api } from '@/lib/api'
import { useRouter } from 'next/router'
import { UserAppRelationType } from '@/ds/website'
import { type AppWithRelation, type ConversationWithRelation, type IAppComment, type IAppListView } from '@/ds/poketto'
import { type ChatMessage } from '.prisma/client'
import { useUser } from '@/hooks/use-user'
import log from '@/lib/log'
import { type PrommptMessage, type User } from '@prisma/client'
import { useDebouncedState } from '@mantine/hooks'
import { Skeleton } from '@/components/ui/skeleton'
import { getAppLink } from '@/lib/poketto'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { ResponsiveField, ViewsField } from '@/components/field'
import React, { type PropsWithChildren, type ReactNode, useCallback, useState } from 'react'
import Link from 'next/link'
import d from '@/lib/datetime'
import { DotsVerticalIcon } from '@radix-ui/react-icons'
import { MarqueeContainer } from '@/components/containers'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { IconThumbDown, IconThumbUp } from '@tabler/icons-react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { AppDetail } from '@/components/app-detail-view'


export default function ConversationPage() {
	const router = useRouter()
	const spaceId = router.query.sid as string
	const convId = router.query.cid as string
	
	const { chatListVisible, chatDetailVisible } = useAppStore()
	const { data: conversations_ = [] } = api.poketto.listConversations.useQuery({ spaceId, relationType: UserAppRelationType.used })
	const conversations = conversations_
	// const {data: conversation} = api.flowgpt.getPoketto.useQuery({id: convId, platform: PlatformType.FlowGPT})
	const conv = conversations.find((a) => a.id === convId) ?? conversations[0] // conversation
	const user = useUser()
	
	log.info({ apps: conversations, conv })
	
	return (<RootLayout>
		<div className={'w-full h-full overflow-hidden | flex divide-x'}>
			
			{chatListVisible && <AppList convs={conversations}/>}
			
			<section className={clsx('w-full grow h-full overflow-hidden | flex flex-col')}>
				{user && conv && <AppConversation user={user} conv={conv} msgs={(conv.app.model?.initPrompts ?? [])
					.map((p) => prompt2chatMessage(user, conv, p))}/>}
			</section>
			
			<section className={clsx('w-full md:w-[375px] shrink-0 overflow-x-hidden', 'h-full overflow-y-auto p-4 gap-4', 'flex flex-col ')}>
				{chatDetailVisible && conv && <AppDetail convs={conversations} app={conv.app} comments={conv.app.comments}/>}
			</section>
		
		</div>
	</RootLayout>)
}

const prompt2chatMessage = (u: User, c: ConversationWithRelation, m: PrommptMessage): ChatMessage => ({
	...m, userId: u.id, createdAt: new Date(), updatedAt: new Date(), format: 'text', usingAppId: c.id,
})


const ControlTool = () => {
	const { chatDetailVisible, toggleChatDetail, chatListVisible, toggleChatList, toggleSidebar, sidebarVisible } = useAppStore()
	
	return (
		<Popover>
			<PopoverTrigger>
				<DotsVerticalIcon/>
			</PopoverTrigger>
			<PopoverContent className={'flex flex-col gap-2'}>
				<Button className={'justify-start pl-4'}
				        variant={'ghost'}
				        onClick={toggleSidebar}>{(sidebarVisible ? 'Hide' : 'Show') + ' Sidebar'}</Button>
				<Button className={'justify-start pl-4'}
				        variant={'ghost'}
				        onClick={toggleChatList}>{(chatListVisible ? 'Hide' : 'Show') + ' Chat List'}</Button>
				<Button className={'justify-start pl-4'}
				        variant={'ghost'}
				        onClick={toggleChatDetail}>{(chatDetailVisible ? 'Hide' : 'Show') + ' Chat Detail'}</Button>
				<Button className={'justify-start pl-4'} variant={'ghost'}>Share (todo)</Button>
			</PopoverContent>
		</Popover>
	)
}

const AppConversation = ({ user, conv, msgs }: {
	user: User,
	conv: ConversationWithRelation,
	msgs: ChatMessage[]
}) => {
	log.info({ conv: conv, msgs })
	
	const initialMessages: ChatMessage[] = (conv.app.model!.initPrompts ?? []).map((p) => prompt2chatMessage(user, conv, p))
	const { messages, handleSubmit, input, handleInputChange } = useChat({
		initialMessages: [...initialMessages, // ...app?.poketto.conversation?.messages ?? [], // todo
		                  ...msgs], onError: err => {
			toast.error(err.message)
		},
	})
	
	return (<>
		<div className={'w-full p-4 truncate bg-muted | flex items-center justify-between gap-2'}>
			<div>{conv.app.name}</div>
			<ControlTool/>
		</div>
		
		<div className={'w-full p-2 grow overflow-auto | flex flex-col gap-1'}>
			{messages
				.filter((value, index) => conv.app.model!.isOpenSource || index >= (conv.app.model!.initPrompts.length ?? 0))
				.map((msg, index) => <ChatMessageComp msg={msg} key={index}/>)}
		</div>
		
		<form className={'w-full p-4 | flex justify-center items-center gap-2'} onSubmit={handleSubmit}>
			<Input name={'prompt'} className={'w-[95%]'} autoFocus value={input} onChange={handleInputChange} id={'input'}/>
			<Button type={'submit'}>Send</Button>
		</form>
	</>)
}

const ChatMessageComp = ({ msg }: {
	msg: ChatMessage
}) => {
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


const getAppListView = (conversation: ConversationWithRelation): IAppListView => {
	const latestMessage = conversation.messages[conversation.messages.length - 1]!
	return ({
		id: conversation.app.id,
		avatar: conversation.app.avatar,
		title: conversation.app.name,
		latestMessage,
		latestUser: latestMessage.user,
	})
}

const AppList = ({ convs }: {
	convs: ConversationWithRelation[]
}) => {
	const [search, setSearch] = useDebouncedState('', 200, { leading: false })
	const { data: searchedApps } = api.flowgpt.searchApps.useQuery({ query: search }, { enabled: search.length > 0 })
	
	return (<section id={'chat-list'} className={clsx('w-full md:w-[375px] shrink-0 | flex flex-col items-center', // 'bg-slate-800'
	)}>
		
		<Input defaultValue={search}
		       placeholder={'Search: Title / Description / Init Prompt'}
		       className={'w-[95%] my-2 rounded-2xl bg-accent'}
		       onChange={(event) => {setSearch(event.currentTarget.value)}}/>
		{search ? (// 搜索时
			searchedApps ? <>
				<SectionTitle>Global search results {searchedApps.length ? '' : ' (0)'}</SectionTitle>
				{searchedApps.slice(0, 10).map((prompt) => <SearchResultItem convs={convs} app={prompt} key={prompt.id}/>)}
			</> : <>
				<SectionTitle>Global search results</SectionTitle>
				<Skeleton className={'h-8'}/>
			</>) : (// 	没有搜索时显示最近聊天列表
			<>
				<SectionTitle>Poketto Apps</SectionTitle>
				{convs
					.slice()
					.sort((a, b) => a.updatedAt > b.updatedAt ? -1 : 1)
					.map((app) => <AppListView key={app.id} appListView={getAppListView(app)}/>)}
			</>)}
		
		{/*<SectionTitle>No messages found</SectionTitle>*/}
	</section>)
}


const SearchResultItem = ({ convs, app }: {
	convs: ConversationWithRelation[],
	app: AppWithRelation
}) => {
	const router = useRouter()
	const sid = router.query.sid as string
	
	return (
		<Dialog>
			<DialogTrigger>
				
				<Avatar className={'shrink-0'}>
					<AvatarImage src={app.avatar}/>
				</Avatar>
				<div className={'grow overflow-hidden | flex flex-col gap-1'}>
					<p className={'truncate | text-sm text-primary-foreground/75 font-semibold'}>{app.name}</p>
					<p className={'truncate | '}>{app.desc}</p>
				</div>
				<div className={'w-20 shrink-0 overflow-hidden | flex flex-col gap-1'}>
					<ViewsField v={app.state?.views ?? 0}/>
					<p className={'truncate'}>@{app.creator.name}</p>
				</div>
			</DialogTrigger>
			<DialogContent className={'max-h-[80vh] overflow-auto'}>
				<AppDetail convs={convs} app={app} comments={[]}/>
			</DialogContent>
		</Dialog>
	)
}

const SectionTitle = ({ children }: PropsWithChildren) => <div className={'w-full px-4 py-2 | bg-muted'}>{children}</div>

const AppListView = ({ appListView }: {
	appListView: IAppListView
}) => {
	// const { setPokettoId } = useAppStore()
	const router = useRouter()
	const sid = router.query.sid as string
	console.log({ sid, appListView })
	
	return (
		
		<Link href={getAppLink(appListView.id)} className={'w-full'}>
			<Button variant={'ghost'} className={'w-full px-4 py-2 h-fit | flex items-center gap-4'}>
				<Avatar className={'shrink-0'}>
					<AvatarImage src={appListView.avatar}/>
				</Avatar>
				
				<div className={'grow overflow-hidden | flex flex-col gap-2'}>
					<div className={'w-full | flex gap-2 justify-between'}>
						<span className={'truncate '}>{appListView.title}</span>
						<span>{d(appListView.latestMessage.createdAt).calendar()}</span>
					</div>
					<div className={'flex gap-2'}>
						{/* 只有 group 才需要打开 */}
						<span className={'truncate text-muted-foreground'}>{appListView.latestMessage.content}</span>
					</div>
				</div>
			</Button>
		</Link>
	
	)
}

