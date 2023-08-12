import { useStore } from '@/store'
import clsx from 'clsx'
import ReactMarkdown from 'react-markdown'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { DotsVerticalIcon } from '@radix-ui/react-icons'

import remarkGfm from 'remark-gfm'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'


export const ChatConversation = () => {
	const { poketto, showChatDetail, setShowChatDetail, showChatList, setShowChatList } = useStore()
	
	return (
		<section id={'chat-contents'} className={'w-full min-w-[320px] grow h-full overflow-hidden | flex flex-col bg-background'}>
			<div className={'w-full p-4 truncate bg-muted | flex items-center justify-between gap-2'}>
				<div>{poketto?.basic.title}</div>
				<Popover>
					<PopoverTrigger>
						<DotsVerticalIcon/>
					</PopoverTrigger>
					<PopoverContent className={'flex flex-col gap-2'}>
						<Button className={'justify-start pl-4'} variant={'ghost'} onClick={() => setShowChatList(!showChatList)}>{showChatList ? 'Hide List' : 'Show' +
							' List'}</Button>
						<Button className={'justify-start pl-4'}
						        variant={'ghost'}
						        onClick={() => setShowChatDetail(!showChatDetail)}>{showChatDetail ? 'Hide Detail' : 'Show Detail'}</Button>
						<Button className={'justify-start pl-4'} variant={'ghost'}>Share (todo)</Button>
					</PopoverContent>
				</Popover>
			</div>
			
			<div className={'w-full p-2 grow overflow-auto | flex flex-col gap-1'}>
				{
					poketto?.conversation?.messages.map((msg, index) => (
						<div
							key={index}
							className={clsx(
								'chat tracking-normal text-sm',
								msg.role === 'user' ? 'chat-end' : 'chat-start',
							)}>
							
							<div className={clsx(
								'w-full overflow-auto | chat-bubble prose dark:prose-invert prose-sm',
								msg.role === 'user'
									? 'bg-green-600 text-black' //  'chat-bubble-primary/50'
									: 'bg-sidebar text-primary-foreground/75', // 'chat-bubble-secondary',
							)}>
								
								<ReactMarkdown remarkPlugins={[remarkGfm]}>
									{msg.content}
								</ReactMarkdown>
							
							</div>
						
						</div>
					))
				}
				{/*<Separator orientation={'horizontal'} className={'w-1/2 mx-auto my-8'}/>*/}
			</div>
			
			
			<div className={'w-full p-4 | flex justify-center items-center gap-2'}>
				<Input className={'w-[95%]'}/>
				<Button>Send</Button>
			</div>
		
		</section>
	)
}
