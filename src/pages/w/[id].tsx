import { RootLayout } from '@/layouts/root.layout'
import { useRouter } from 'next/router'
import { Input } from '@/components/ui/input'
import { useDebouncedState } from '@mantine/hooks'
import { api } from '@/lib/api'
import { type FlowgptPromptBasic } from '@/ds/flowgpt'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { type PropsWithChildren } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { ViewsField } from '@/components/utils/responsive-field'
import Link from 'next/link'
import { useStore } from '@/store'
import { FlowgptDetail } from '@/components/flowgpt/detail'


export const SearchResultItem = ({ prompt }: { prompt: FlowgptPromptBasic }) => {
	console.log(prompt)
	const { setPrompt } = useStore()
	
	return (
		<div onClick={() => setPrompt(prompt)} className={'w-full p-2 | flex gap-2 | text-primary-foreground/50 text-xs | hover:bg-accent cursor-pointer'}>
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

export default function WorkspacePage() {
	
	const router = useRouter()
	const wid = router.query.id as string
	
	const [search, setSearch] = useDebouncedState('', 200, { leading: false })
	const { data: prompts } = api.flowgpt.searchPrompts.useQuery({ query: search }, { enabled: search.length > 0 })
	
	const { prompt } = useStore()
	console.log('[WorkspacePage] ', { wid, search, prompts, prompt })
	
	
	const SectionTitle = ({ children }: PropsWithChildren) => <div className={'w-full px-4 py-2 | bg-muted'}>{children}</div>
	return (
		<RootLayout>
			<div className={'w-full h-full overflow-hidden | flex divide-x'}>
				<section id={'chat-list'} className={'w-full max-w-sm | flex flex-col items-center | bg-slate-800'}>
					
					<Input defaultValue={search}
					       placeholder={'Search: Title / Description / Init Prompt'}
					       className={'w-[95%] my-2 rounded-2xl'}
					       onChange={(event) => {setSearch(event.currentTarget.value)}}/>
					{
						search && (
							prompts ? <>
								<SectionTitle>Global search results {prompts.length ? '' : ' (0)'}</SectionTitle>
								{prompts.slice(0, 10).map((prompt) => <SearchResultItem prompt={prompt} key={prompt.id}/>)}
							</> : <>
								<SectionTitle>Global search results</SectionTitle>
								<Skeleton className={'h-8'}/>
							</>
						)
					}
					
					<SectionTitle>No messages found</SectionTitle>
				</section>
				
				<section id={'chat-contents'} className={'grow | bg-cyan-800'}>
				
				</section>
				
				<section id={'chat-detail'} className={'w-full max-w-sm p-4 | hidden xl:flex'}>
					{prompt && <FlowgptDetail prompt={prompt}/>}
				</section>
			</div>
		</RootLayout>
	)
}
