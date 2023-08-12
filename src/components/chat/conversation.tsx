import { useStore } from '@/store'
import clsx from 'clsx'
import ReactMarkdown from 'react-markdown'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { DotsVerticalIcon } from '@radix-ui/react-icons'

export const ChatConversation = () => {
	const { prompt } = useStore()
	
	
	return (
		<section id={'chat-contents'} className={'w-full min-w-[320px] grow h-full overflow-hidden | flex flex-col bg-background'}>
			<div className={'w-full p-4 truncate bg-muted | flex items-center justify-between gap-2'}>
				<div>{prompt?.title}</div>
				<DotsVerticalIcon/>
			</div>
			
			<div className={'w-full p-2 grow overflow-auto | flex flex-col gap-1'}>
				{
					prompt?.Conversation.messages.map((msg, index) => (
						<div
							key={index}
							className={clsx(
								'chat tracking-wide',
								msg.role === 'user' ? 'chat-end' : 'chat-start',
							)}>
							
							<div className={clsx(
								'chat-bubble',
								msg.role === 'user'
									? 'bg-green-600 text-black' //  'chat-bubble-primary/50'
									: 'bg-sidebar text-primary-foreground/75', // 'chat-bubble-secondary',
							)}>
								
								<ReactMarkdown>
									{msg.content}
								</ReactMarkdown>
							
							</div>
						
						</div>
					))
				}
			</div>
			
			<div className={'w-full p-2 | flex justify-center items-center gap-2'}>
				<Input className={'w-[95%]'}/>
				<Button>Send</Button>
			</div>
		
		</section>
	)
}
