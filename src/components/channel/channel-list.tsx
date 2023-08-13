import { useDebouncedState } from '@mantine/hooks'
import { api } from '@/lib/api'
import { type PropsWithChildren } from 'react'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { ViewsField } from '@/components/utils/responsive-field'
import clsx from 'clsx'
import { type IPokettoBasic, type IPokettoChannelListView } from '@/ds/poketto'
import { useAppStore } from '@/store'
import d from '@/lib/datetime'
import { getChannelListView, getChannelUri } from '@/lib/poketto'
import { toast } from '@/components/ui/use-toast'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/router'
import Link from 'next/link'


export const ChannelList = () => {
	const [search, setSearch] = useDebouncedState('', 200, { leading: false })
	const { data: searchedPoketto } = api.poketto.searchPoketto.useQuery({ query: search }, { enabled: search.length > 0 })
	
	const { channels } = useAppStore()
	
	return (
		<section id={'chat-list'} className={clsx(
			'w-full md:w-[375px] shrink-0 | flex flex-col items-center',
			// 'bg-slate-800'
		)}>
			
			<Input defaultValue={search}
			       placeholder={'Search: Title / Description / Init Prompt'}
			       className={'w-[95%] my-2 rounded-2xl bg-accent'}
			       onChange={(event) => {setSearch(event.currentTarget.value)}}/>
			{
				search ? (
					// 搜索时
					searchedPoketto ? <>
						<SectionTitle>Global search results {searchedPoketto.length ? '' : ' (0)'}</SectionTitle>
						{searchedPoketto.slice(0, 10).map((prompt) => <SearchResultItem poketto={prompt} key={prompt.id}/>)}
					</> : <>
						<SectionTitle>Global search results</SectionTitle>
						<Skeleton className={'h-8'}/>
					</>
				) : (
					// 	没有搜索时显示最近聊天列表
					<>
						<SectionTitle>Poketto Channels</SectionTitle>
						{channels
							.slice()
							.sort((a, b) => a.latestTime > b.latestTime ? -1 : 1)
							.map((channel) => <ChannelListView key={channel.poketto.id} channelListView={getChannelListView(channel)}/>)}
					</>
				)
			}
			
			{/*<SectionTitle>No messages found</SectionTitle>*/}
		</section>
	)
}


const SearchResultItem = ({ poketto }: { poketto: IPokettoBasic }) => {
	return (
		<Link href={getChannelUri(poketto.id)} className={clsx(
			'w-full p-2 | flex gap-2 | text-primary-foreground/50 text-xs | hocus:bg-accent cursor-pointer',
		)}>
			<Avatar className={'shrink-0'}>
				<AvatarImage src={poketto.basic.avatar}/>
			</Avatar>
			<div className={'grow overflow-hidden | flex flex-col gap-1'}>
				<p className={'truncate | text-sm text-primary-foreground/75 font-semibold'}>{poketto.basic.title}</p>
				<p className={'truncate | '}>{poketto.basic.desc}</p>
			</div>
			<div className={'w-20 shrink-0 overflow-hidden | flex flex-col gap-1'}>
				<ViewsField v={poketto.state.views}/>
				<p className={'truncate'}>@{poketto.user.name}</p>
			</div>
		</Link>
	)
}

const SectionTitle = ({ children }: PropsWithChildren) => <div className={'w-full px-4 py-2 | bg-muted'}>{children}</div>

const ChannelListView = ({ channelListView }: { channelListView: IPokettoChannelListView }) => {
	// const { setPokettoId } = useAppStore()
	const router = useRouter()
	
	return (
		
		<Button variant={'ghost'} className={'w-full px-4 py-2 h-fit | flex items-center gap-4'} onClick={() => {
			// setPokettoId(channelListView.id)
			// console.log({ channelListView })
			void router.push(getChannelUri(channelListView.id))
			// toast({ title: `changing to ${channelListView.title}` })
		}}>
			<Avatar className={'shrink-0'}>
				<AvatarImage src={channelListView.avatar}/>
			</Avatar>
			
			<div className={'grow overflow-hidden | flex flex-col gap-2'}>
				<div className={'w-full | flex gap-2 justify-between'}>
					<span className={'truncate '}>{channelListView.title}</span>
					<span>{d(channelListView.latestMessage.createdAt).calendar()}</span>
				</div>
				<div className={'flex gap-2'}>
					{channelListView.latestUser && <span>{channelListView.latestUser.name}</span>}
					<span className={'truncate text-muted-foreground'}>{channelListView.latestMessage.content}</span>
				</div>
			</div>
		</Button>
	)
}
