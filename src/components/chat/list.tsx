import { useDebouncedState } from '@mantine/hooks'
import { api } from '@/lib/api'
import { type PropsWithChildren } from 'react'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { type FlowgptPromptBasic } from '@/ds/flowgpt'
import { useStore } from '@/store'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { ViewsField } from '@/components/utils/responsive-field'
import clsx from 'clsx'


export const SearchResultItem = ({ prompt }: { prompt: FlowgptPromptBasic }) => {
	console.log(prompt)
	const { setPromptId } = useStore()
	
	return (
		<div onClick={() => setPromptId(prompt.id)} className={clsx(
			'w-full p-2 | flex gap-2 | text-primary-foreground/50 text-xs | hocus:bg-accent cursor-pointer',
		)}>
			<Avatar className={'shrink-0'}>
				<AvatarImage src={prompt.thumbnailURL}/>
			</Avatar>
			<div className={'grow overflow-hidden | flex flex-col gap-1'}>
				<p className={'truncate | text-sm text-primary-foreground/75 font-semibold'}>{prompt.title}</p>
				<p className={'truncate | '}>{prompt.description}</p>
			</div>
			<div className={'w-20 shrink-0 overflow-hidden | flex flex-col gap-1'}>
				<ViewsField v={prompt.views}/>
				<p className={'truncate'}>@{prompt.User.name}</p>
			</div>
		</div>
	)
}

export const ChatList = () => {
	const [search, setSearch] = useDebouncedState('', 200, { leading: false })
	const { data: searchedPrompts } = api.flowgpt.searchPrompts.useQuery({ query: search }, { enabled: search.length > 0 })
	
	const SectionTitle = ({ children }: PropsWithChildren) => <div className={'w-full px-4 py-2 | bg-muted'}>{children}</div>
	
	return (
		<section id={'chat-list'} className={'w-full min-w-[320px] max-w-sm | flex flex-col items-center | bg-slate-800'}>
			
			<Input defaultValue={search}
			       placeholder={'Search: Title / Description / Init Prompt'}
			       className={'w-[95%] my-2 rounded-2xl'}
			       onChange={(event) => {setSearch(event.currentTarget.value)}}/>
			{
				search ? (
					// 搜索时
					searchedPrompts ? <>
						<SectionTitle>Global search results {searchedPrompts.length ? '' : ' (0)'}</SectionTitle>
						{searchedPrompts.slice(0, 10).map((prompt) => <SearchResultItem prompt={prompt} key={prompt.id}/>)}
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
