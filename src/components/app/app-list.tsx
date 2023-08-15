import { useDebouncedState } from '@mantine/hooks'
import { api } from '@/lib/api'
import React, { type PropsWithChildren } from 'react'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { ViewsField } from '@/components/utils/responsive-field'
import clsx from 'clsx'
import { type AppWithRelation, type IAppListView, type ConversationWithRelation } from '@/ds/poketto'
import d from '@/lib/datetime'
import { getAppLink, getAppListView } from '@/lib/poketto'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { AppDetail } from '@/components/app/app-detail'


export const AppList = ({ convs }: {
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
