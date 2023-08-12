import { useDebouncedState } from '@mantine/hooks'
import { api } from '@/lib/api'
import { type PropsWithChildren } from 'react'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { useStore } from '@/store'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { ViewsField } from '@/components/utils/responsive-field'
import clsx from 'clsx'
import { type IPokettoBasic } from '@/ds/poketto'


export const SearchResultItem = ({ poketto }: { poketto: IPokettoBasic }) => {
	console.log(poketto)
	const { setPokettoId } = useStore()
	
	return (
		<div onClick={() => setPokettoId(poketto.id)} className={clsx(
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
		</div>
	)
}

export const PokettoList = () => {
	const [search, setSearch] = useDebouncedState('', 200, { leading: false })
	const { data: searchedPoketto } = api.poketto.searchPoketto.useQuery({ query: search }, { enabled: search.length > 0 })
	
	const SectionTitle = ({ children }: PropsWithChildren) => <div className={'w-full px-4 py-2 | bg-muted'}>{children}</div>
	
	return (
		<section id={'chat-list'} className={'w-full max-w-[320px] | flex flex-col items-center | bg-slate-800'}>
			
			<Input defaultValue={search}
			       placeholder={'Search: Title / Description / Init Prompt'}
			       className={'w-[95%] my-2 rounded-2xl'}
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
					</>
				)
			}
			
			<SectionTitle>No messages found</SectionTitle>
		</section>
	)
}
