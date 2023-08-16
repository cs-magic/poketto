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
import { type ChatMessage, ChatMessageFormatType, PromptRoleType } from '.prisma/client'
import { type User } from '@prisma/client'
import { useDebouncedState, useScrollIntoView } from '@mantine/hooks'
import { Skeleton } from '@/components/ui/skeleton'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { ViewsField } from '@/components/field'
import React, { type PropsWithChildren, useEffect, useState } from 'react'
import Link from 'next/link'
import d from '@/lib/datetime'
import { ChevronDownIcon, DotsVerticalIcon } from '@radix-ui/react-icons'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { AppDetail } from '@/components/app-detail-view'
import { type GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import { prisma } from '@/server/db'
import { getConversationLink } from '@/lib/string'
import superjson from 'superjson'
import Mustache from 'mustache'
import { nanoid } from 'nanoid'
import { type AppWithRelation, conversationInclude, type ConversationWithRelation, type UserWithRelations, userWithRelationsInclude } from '@/ds'
import { URI } from '@/config'
import { Badge } from '@/components/ui/badge'
import { useMustache } from '@/hooks/use-mustache'


export default function ConversationPage({ user, conversationStr }: {
	user: UserWithRelations,
	conversationStr: string
}) {
	const conversation = superjson.parse<ConversationWithRelation>(conversationStr)
	const { chatListVisible, chatDetailVisible } = useAppStore()
	
	return (<RootLayout>
		<div className={'w-full h-full overflow-hidden | flex divide-x'}>
			
			{chatListVisible && user && (
				<section className={'relative w-full md:w-[375px] shrink-0 | flex flex-col items-center'}>
					<AppList user={user}/>
				</section>
			)}
			
			<section className={clsx('relative w-full grow h-full overflow-hidden | flex flex-col')}>
				{user && conversation && <AppConversation u={user} c={conversation}/>}
			</section>
			
			{chatDetailVisible && (
				<section className={clsx('w-full md:w-[375px] shrink-0 overflow-x-hidden', 'h-full overflow-y-auto p-4 gap-4', 'flex flex-col ')}>
					{chatDetailVisible && conversation && <AppDetail app={conversation.app} comments={conversation.app.comments}/>}
				</section>
			)}
		
		</div>
	</RootLayout>)
}


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

const AppConversation = ({ u, c }: {
	u: User,
	c: ConversationWithRelation
}) => {
	const { data: persistedMessages = [] } = api.poketto.listMessages.useQuery({ cid: c.id })
	const { mutate: pushMessage } = api.poketto.pushMessage.useMutation()
	const [scrolled, setScrolled] = useState(false)
	const [unread, setUnread] = useState(false)
	
	const { messages, handleSubmit, input, handleInputChange } = useChat({
		initialMessages: persistedMessages,
		onError: err => toast.error(err.message),
		onFinish: (msg) => pushMessage({ ...msg, cid: c.id }),
		onResponse: (response) => {
			if (scrolled && response.status === 200) setUnread(true)
		},
	})
	
	// log.info({ persistedMessages, messages })
	const { scrollIntoView, targetRef, scrollableRef } = useScrollIntoView<HTMLDivElement>({
		offset: 60,
	})
	
	useEffect(() => {
		if (!scrolled) {
			setUnread(false)
			scrollIntoView({ alignment: 'end' })
		}
	})
	
	return (<>
		<div className={'w-full py-6 px-4 truncate bg-muted | flex items-center justify-between gap-2'}>
			<div>{c.app.name}</div>
			<ControlTool/>
		</div>
		
		<div className={'w-full p-2 grow overflow-auto | flex flex-col gap-1'} ref={scrollableRef} onScroll={(event) => {
			const { scrollHeight, scrollTop, clientHeight } = event.currentTarget
			setScrolled(scrollHeight >= scrollTop + clientHeight + 1 /*有误差*/)
		}}>
			{messages
				// .filter((value, index) => c.app.model!.isOpenSource || index >= (c.app.model!.initPrompts.length ?? 0))
				.map((msg, index) => <ChatMessageComp user={u} msg={{
					...msg,
					conversationId: c.id,
					id: nanoid(),
				}} key={index}/>)}
			<div ref={targetRef}/>
		</div>
		
		{unread && <Badge variant={'default'} className={'absolute bottom-[80px] right-4'} onClick={() => scrollIntoView()}>New Message <ChevronDownIcon/></Badge>}
		<form className={'w-full p-4 | flex justify-center items-center gap-2'} onSubmit={(event) => {
			handleSubmit(event)
			pushMessage({ content: input, role: PromptRoleType.user, cid: c.id })
		}}>
			<Input name={'prompt'} className={'w-[95%]'} autoFocus value={input} onChange={handleInputChange} id={'input'}/>
			<Button type={'submit'}>Send</Button>
		</form>
	</>)
}

const ChatMessageComp = ({ msg, user }: {
	user: User
	msg: ChatMessage
}) => {
	const { role } = msg
	const m = useMustache()
	return msg.format === ChatMessageFormatType.systemNotification
		? <span className={'mx-auto my-2 text-muted-foreground'}>{msg.content}</span>
		: (
			<div className={clsx('chat tracking-normal text-sm', role === PromptRoleType.assistant ? 'chat-start' : 'chat-end')}>
				
				<div className={clsx('w-full overflow-auto | chat-bubble prose dark:prose-invert prose-sm', {
					'system': 'bg-slate-700', 'function': 'bg-destructive', 'user': 'bg-green-600 text-black', 'assistant': 'bg-sidebar text-primary-foreground/75',
				}[role])}>
					
					<ReactMarkdown remarkPlugins={[remarkGfm]}>
						{m(msg.content)}
					</ReactMarkdown>
				
				</div>
			</div>
		)
	
}

const AppList = ({ user }: {
	user: User
}) => {
	const { data: conversations = [] } = api.poketto.listConversations.useQuery({ uid: user.id })
	const [search, setSearch] = useDebouncedState('', 200, { leading: false })
	const { data: searchedApps } = api.flowgpt.searchApps.useQuery({ query: search }, { enabled: search.length > 0 })
	
	return (<>
		
		<Input defaultValue={search}
		       placeholder={'Search: Title / Description / Init Prompt'}
		       className={'w-[95%] my-2 rounded-2xl bg-accent'}
		       onChange={(event) => {setSearch(event.currentTarget.value)}}/>
		{search ? (// 搜索时
			searchedApps ? <>
				<SectionTitle>Global search results {searchedApps.length ? '' : ' (0)'}</SectionTitle>
				{searchedApps.slice(0, 10).map((prompt) => <SearchResultItem app={prompt} key={prompt.id}/>)}
			</> : <>
				<SectionTitle>Global search results</SectionTitle>
				<Skeleton className={'h-8'}/>
			</>) : (// 	没有搜索时显示最近聊天列表
			<>
				<SectionTitle>Poketto Apps</SectionTitle>
				{conversations
					.slice()
					.sort((a, b) => a.updatedAt > b.updatedAt ? -1 : 1)
					.map((c) => <ConversationListView key={c.id} c={c}/>)}
			</>)}
		
		{/*<SectionTitle>No messages found</SectionTitle>*/}
	</>)
}

const SearchResultItem = ({ app }: {
	app: AppWithRelation
}) => {
	
	return (
		<Dialog>
			<DialogTrigger className={'w-full flex items-center p-2 gap-2 hover:bg-accent'}>
				<Avatar className={'shrink-0'}>
					<AvatarImage src={app.avatar}/>
				</Avatar>
				<div className={'grow overflow-hidden | flex flex-col gap-1'}>
					<p className={'truncate | text-sm text-primary-foreground/75 font-semibold'}>{app.name}</p>
					<p className={'truncate | '}>{app.desc}</p>
				</div>
				<div className={'w-20 shrink-0 whitespace-nowrap overflow-hidden | flex flex-col gap-1'}>
					<ViewsField v={app.state?.views ?? 0}/>
					<p className={'truncate'}>@{app.creator.name}</p>
				</div>
			</DialogTrigger>
			<DialogContent className={'max-h-[80vh] overflow-auto'}>
				<AppDetail app={app} comments={[]}/>
			</DialogContent>
		</Dialog>)
}

const SectionTitle = ({ children }: PropsWithChildren) => <div className={'w-full px-4 py-2 | bg-muted'}>{children}</div>

const ConversationListView = ({ c }: {
	c: ConversationWithRelation
}) => {
	const m = useMustache()
	return (
		
		<Link href={getConversationLink(c.id)} className={'w-full'}>
			<Button variant={'ghost'} className={'w-full px-4 py-2 h-fit | flex items-center gap-4'}>
				<Avatar className={'shrink-0'}>
					<AvatarImage src={c.app.avatar}/>
				</Avatar>
				
				<div className={'grow overflow-hidden | flex flex-col gap-2'}>
					<div className={'w-full | flex gap-2 justify-between'}>
						<span className={'truncate '}>{c.app.name}</span>
						<span>{d(c.messages[c.messages.length - 1]!.createdAt).calendar()}</span>
					</div>
					<div className={'flex gap-2'}>
						{/* 只有 group 才需要打开 */}
						<span className={'truncate text-muted-foreground'}>{m(c.messages[c.messages.length - 1]!.content)}</span>
					</div>
				</div>
			</Button>
		</Link>
	
	)
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const session = await getSession(ctx)
	const cid = ctx.query.cid as string
	
	if (session) {
		const user = await prisma.user.findUnique({ where: { id: session.user.id }, include: userWithRelationsInclude }) as UserWithRelations
		const conversation = await prisma.conversation.findUnique({ where: { userId: user.id, id: cid }, include: conversationInclude })
		if (conversation) {
			return {
				props: {
					user,
					conversationStr: superjson.stringify(conversation),
				},
			}
		}
	}
	
	return {
		redirect: {
			destination: URI.user.auth.signin, permanent: false,
		},
	}
}
