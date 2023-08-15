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
import { type AppComment, type ChatMessage } from '.prisma/client'
import { useUser } from '@/hooks/use-user'
import log from '@/lib/log'
import { type PrommptMessage, type User } from '@prisma/client'
import { useDebouncedState, useWindowScroll } from '@mantine/hooks'
import { Skeleton } from '@/components/ui/skeleton'
import { getAppLink, getAppListView } from '@/lib/poketto'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { ResponsiveField, ViewsField } from '@/components/field'
import React, { type PropsWithChildren, type ReactNode, useCallback, useState } from 'react'
import Link from 'next/link'
import d from '@/lib/datetime'
import { Separator } from '@/components/ui/separator'
import { POKETTO_DETAIL_FEATURES_ENABLED, POKETTO_DETAIL_RATINGS_ENABLED } from '@/config/system'
import numeral from 'numeral'
import _ from 'lodash'
import { DotsVerticalIcon, StarFilledIcon, StarIcon } from '@radix-ui/react-icons'
import { Badge } from '@/components/ui/badge'
import { MarqueeContainer, MasonryContainer } from '@/components/containers'
import { vIsNumber } from '@/lib/number'
import { POKETTO_APP_ID } from '@/config/poketto'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { IconThumbDown, IconThumbUp } from '@tabler/icons-react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'


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
		
		<Link href={getAppLink(sid, appListView.id)} className={'w-full'}>
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


const AppDetail = ({ convs, app, comments }: {
	convs: ConversationWithRelation[],
	app: AppWithRelation,
	comments: AppComment[]
}) => {
	const { convId } = useAppStore()
	const router = useRouter()
	const hasGot = Boolean(convs.find((c) => c.appId === app.id))
	const [scroll, scrollTo] = useWindowScroll()
	const user = useUser()
	
	const onAddApp = () => {
		if (!user) return toast.error('您需要先登陆才能加入该频道，否则我们无法为您保存这些记录 :(')
		if (!convId) return toast.error('您当前并不在工作区内')
		// addApp(createApp(user, app))
		// void router.push(getAppLink(convId, app.id))
		toast.success(`Successfully added app: ${app.name}`)
	}
	
	const onDelApp = () => {
		if (!convId) return toast.error('您当前并不在工作区内')
		// delApp(app.id)
		// const nextApp = convs.find((c) => c.appId !== app.id)!
		// void router.push(getAppLink(convId, nextApp.appId))
		scrollTo({ y: 0 })
	}
	
	return (<>
		<section id={'basic'} className={'w-full | flex items-center gap-2'}>
			<Avatar className={'wh-28 p-4  shrink-0'}>
				<AvatarImage src={app.avatar} className={'rounded-2xl'}/>
			</Avatar>
			
			<div className={'grow overflow-hidden | flex flex-col gap-2'}>
				<div className={'w-full | flex flex-col '}>
					<h2 className={'line-clamp-2'}>{app.name}</h2>
					<p className={'truncate text-primary-foreground/75'}>by {app.creator.name}</p>
				</div>
			</div>
			{<Button
				disabled={hasGot}
				variant={hasGot ? 'default' : 'destructive'}
				className={clsx('w-20 | rounded-3xl transition-all')}
				size={'thin'}
				onClick={onAddApp}>
				{hasGot ? 'Got' : 'Get'}
			</Button>}
		</section>
		
		<Separator orientation={'horizontal'}/>
		
		<section id={'status'} className={clsx('w-full', 'flex items-center justify-between gap-1')}>
			<StatusItem a={'category'} b={app.categoryId} c={'of All 31'}/>
			<StatusItem a={'model'} b={app.model?.type} c={app.creator.name}/>
			{POKETTO_DETAIL_RATINGS_ENABLED && (<StatusItem a={'ratings'} b={numeral(app.state?.stars).format('0.0')} c={<>
				{_.range(Math.floor(app.state?.stars ?? 0)).map((i) => <StarFilledIcon className={'vh-4 leading-none'} key={i}/>)}
				{_.range(5 - Math.floor(app.state?.stars ?? 0)).map((i) => <StarIcon className={'vh-4 leading-none'} key={i}/>)}
			</>}/>)}
			<StatusItem a={'language'} b={app.language} c={'Universal'}/>
		</section>
		
		{/*<section id={'user-cases'} className={'w-full shrink-0 overflow-auto | flex gap-4'}>*/}
		{/*	*/}
		{/*	<DeviceContainer ratio={.6} device={isMobile ? 'iphone-14-pro' : 'surface-pro-2017'}>*/}
		{/*		<div className={'w-full flex flex-col'}>*/}
		{/*			<h2>heading 1</h2>*/}
		{/*			<div>hhh</div>*/}
		{/*			<h2>heading 2</h2>*/}
		{/*			<div>hhh2</div>*/}
		{/*		</div>*/}
		{/*	</DeviceContainer>*/}
		{/*</section>*/}
		
		{/* tags */}
		<section id={'tags'} className={'w-full flex flex-wrap gap-2'}>
			{app.tags.map((tag) => <Badge key={tag.id}>{tag.name}</Badge>)}
		</section>
		
		<section id={'desc'} className={'relative w-full flex flex-col'}>
			<CollapsablePara content={app.desc}/>
		</section>
		
		<section id={'ratings-reviews'} className={'w-full flex flex-col gap-4'}>
			<div className={'flex items-center justify-between'}>
				{/* todo: Ratings & */}
				<h2>Reviews</h2>
				{comments.length > 2 && (<Dialog>
					<DialogTrigger asChild>
						<Button variant={'ghost'}>See All</Button>
					</DialogTrigger>
					<DialogContent className={'max-w-[80vw]  h-[80vh] overflow-auto'}>
						<h2>All the comments</h2>
						<MasonryContainer>
							{comments.map((item) => (<PokettoComment comment={item} key={item.id}/>))}
						</MasonryContainer>
					</DialogContent>
				</Dialog>)}
			</div>
			{comments.length === 0 && 'No Comments Yet !'}
			
			{/* todo: rate level */}
			{/*<div className={'grid grid-col-1 md:grid-cols-2 gap-4'}>*/}
			{/*	<div className={'flex items-end justify-between'}>*/}
			{/*		<p className={'flex items-end gap-2'}>*/}
			{/*			<span className={'text-4xl font-bold'}>{numeral(poketto.state.ratedStars).format('0.0')}</span>*/}
			{/*			<span className={'text-sm font-'}>out of 5</span>*/}
			{/*		</p>*/}
			{/*		<span>{numeral(poketto.state.ratedStars).format('0a')} Ratings</span>*/}
			{/*	</div>*/}
			{/*	<Image src={RatingChart} alt={'rating-chart'} width={320} height={40}/>*/}
			{/*</div>*/}
			<div className={'grid gap-2'}>
				{comments.slice(0, 2).map((item) => (<PokettoComment comment={item} key={item.id}/>))}
			</div>
		</section>
		
		
		<section id={'information'} className={'w-full flex flex-col gap-4'}>
			<h2>Information</h2>
			<div className={'grid grid-cols-2 gap-4'}>
				<InfoItem a={'provider'} b={app.creator.name}/>
				<InfoItem a={'Open Source'} b={app.model?.isOpenSource.toString()}/>
				<InfoItem a={'category'} b={app.categoryId}/>
				<InfoItem a={'language'} b={app.language}/>
			</div>
			<Separator orientation={'horizontal'}/>
			<div className={'grid grid-cols-2 gap-4'}>
				{Object.entries(app.state ?? {})
					.filter((vIsNumber))
					.sort((a, b) => a[0] < b[0] ? -1 : 1)
					.map(([key, val]) => (<InfoItem key={key} a={key} b={val}/>))}
			</div>
		</section>
		
		
		{POKETTO_DETAIL_FEATURES_ENABLED && (<>
			<Separator orientation={'horizontal'}/>
			<section id={'collections'} className={'w-full flex flex-col gap-4'}>
				<h2>Featured In</h2>
				<div>TODO</div>
			</section>
		</>)}
		
		{hasGot && (<section id={'management'} className={'w-full flex flex-col gap-4'}>
			<h2>Management</h2>
			<Button variant={'destructive'} disabled={app.id === POKETTO_APP_ID} onClick={onDelApp}>Uninstall</Button>
		</section>)}
	
	</>)
}


const StatusItem = ({ a, b, c }: {
	a: string,
	b: ReactNode,
	c: ReactNode
}) => {
	return (<div className={'w-full overflow-hidden whitespace-nowrap py-2 | flex flex-col items-center justify-between gap-1'}>
		<div className={'uppercase text-muted-foreground font-bold'}>{a}</div>
		<MarqueeContainer className={'text-lg'}>{b}</MarqueeContainer>
		<div className={'flex justify-center items-center text-primary-foreground/50'}>{c}</div>
	</div>)
}

const InfoItem = ({ a, b }: {
	a: string,
	b: ReactNode
}) => {
	return (<div className={'flex flex-col items-center gap-1'}>
		<div className={'text-muted-foreground font-bold capitalize'}>{a}</div>
		<div className={'text-primary-foreground/75'}>{b}</div>
	</div>)
}


const PokettoComment = (
	{
		comment,
	}: {
		comment: IAppComment
	}) => {
	
	return (
		<Card variant={'default'}>
			<CardHeader>
				{/* todo: title of comment like Apple */}
				{/*<CardTitle>{item.title}</CardTitle>*/}
				<div className={'flex items-center justify-between gap-4 text-primary-foreground/50'}>
					<div className={'flex flex-col gap-2 items-start'}>
						<p>{d(comment.updatedAt).fromNow()}</p>
						<p>@{comment.user.name}</p>
					</div>
					<Avatar className={'shrink-0'}>
						<AvatarImage src={comment.user.avatar}/>
					</Avatar>
				</div>
			</CardHeader>
			<CardContent>
				{comment.content}
			</CardContent>
			<CardFooter className={'gap-4 text-primary-foreground/50'}>
				<ResponsiveField icon={<IconThumbUp/>} title={comment.upvotes.toString()}/>
				<ResponsiveField icon={<IconThumbDown/>} title={'Not Helpful'}/>
			</CardFooter>
		</Card>
	)
}


const CollapsablePara = ({ content }: {
	content: string
}) => {
	const [shownMore, setShownMore] = useState(false)
	const [needMore, setNeedMore] = useState(false)
	
	const ref = useCallback((node: HTMLParagraphElement) => {
		if (!node) return
		setNeedMore(node.scrollHeight > node.offsetHeight)
	}, [])
	
	
	return (
		<div className={'w-full flex flex-col'}>
			<article className={clsx(
				'prose dark:prose-invert',
				!shownMore && 'line-clamp-4',
			)} ref={ref}>
				<ReactMarkdown>
					{content}
				</ReactMarkdown>
			</article>
			
			{needMore && (
				// todo: better show-more effect with harmonious gradient
				<Button variant={'link'} className={'ml-auto'} onClick={() => setShownMore(!shownMore)}>
					{shownMore ? 'Less' : 'More'}
				</Button>
			)}
		</div>
	)
}
