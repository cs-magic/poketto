import { useDebouncedState } from '@mantine/hooks'
import { api } from '@/lib/api'
import { type PropsWithChildren } from 'react'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { ViewsField } from '@/components/utils/responsive-field'
import clsx from 'clsx'
import { type AppWithRelation, type IAppListView } from '@/ds/poketto'
import { useAppStore } from '@/store'
import d from '@/lib/datetime'
import { getAppListView, getAppLink } from '@/lib/poketto'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/router'
import Link from 'next/link'


export const AppList = () => {
	const [search, setSearch] = useDebouncedState('', 200, { leading: false })
	const { data: searchedPoketto } = api.flowgpt.searchPoketto.useQuery({ query: search }, { enabled: search.length > 0 })
	
	const { apps } = useAppStore()
	
	return (<section id={'chat-list'} className={clsx('w-full md:w-[375px] shrink-0 | flex flex-col items-center', // 'bg-slate-800'
	)}>
		
		<Input defaultValue={search}
		       placeholder={'Search: Title / Description / Init Prompt'}
		       className={'w-[95%] my-2 rounded-2xl bg-accent'}
		       onChange={(event) => {setSearch(event.currentTarget.value)}}/>
		{search ? (// 搜索时
			searchedPoketto ? <>
				<SectionTitle>Global search results {searchedPoketto.length ? '' : ' (0)'}</SectionTitle>
				{searchedPoketto.slice(0, 10).map((prompt) => <SearchResultItem app={prompt} key={prompt.id}/>)}
			</> : <>
				<SectionTitle>Global search results</SectionTitle>
				<Skeleton className={'h-8'}/>
			</>) : (// 	没有搜索时显示最近聊天列表
			<>
				<SectionTitle>Poketto Apps</SectionTitle>
				{apps
					.slice()
					.sort((a, b) => a.latestTime > b.latestTime ? -1 : 1)
					.map((app) => <AppListView key={app.poketto.id} appListView={getAppListView(app)}/>)}
			</>)}
		
		{/*<SectionTitle>No messages found</SectionTitle>*/}
	</section>)
}


const SearchResultItem = ({ app }: { app: AppWithRelation }) => {
	return (
		<Link href={getAppLink(app.id)} className={clsx('w-full p-2 | flex gap-2 | text-primary-foreground/50 text-xs | hocus:bg-accent cursor-pointer')}>
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
		</Link>)
}

const SectionTitle = ({ children }: PropsWithChildren) => <div className={'w-full px-4 py-2 | bg-muted'}>{children}</div>

const AppListView = ({ appListView }: { appListView: IAppListView }) => {
	// const { setPokettoId } = useAppStore()
	const router = useRouter()
	
	return (
		
		<Button variant={'ghost'} className={'w-full px-4 py-2 h-fit | flex items-center gap-4'} onClick={() => {
			void router.push(getAppLink(appListView.id))
		}}>
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
		</Button>)
}
