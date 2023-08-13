import clsx from 'clsx'
import { ControlTool } from '@/components/utils/tools'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useChat } from 'ai/react'
import { toast } from 'sonner'
import { useAppStore } from '@/store'
import { useEffect, useRef } from 'react'
import { nanoid } from 'nanoid'
import { user } from '@/config/user'

export const ChannelContent = () => {
	const questionId = useRef<string>()
	const { channels, pokettoBasic, pushMessage } = useAppStore()
	const initMessages = useAppStore((state) => state.messages.filter((m) => m.channelId === pokettoBasic.id))
	const channel = channels.find((c) => c.poketto.id === pokettoBasic.id)
	
	const { messages, handleSubmit, input, handleInputChange } = useChat({
		initialMessages: [
			...pokettoBasic.model?.initPrompts ?? [],
			...pokettoBasic.conversation?.messages ?? [],
			...initMessages,
		],
		onError: err => {
			toast.error(err.message)
		},
		onFinish: (msg) => {
			pushMessage({
				...msg,
				// id: nanoid(),
				// createdAt: new Date(),
				// content: event.currentTarget.value as string,
				// role: 'user',
				channelId: pokettoBasic.id,
				interactions: {},
				type: 'user',
				format: 'text',
				parentId: questionId.current,
				userId: user.id,
			})
		},
	})
	
	const ref = useRef<HTMLDivElement>(null)
	useEffect(() => {
		ref.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
	}, [pokettoBasic.id])
	
	return (
		<section id={'chat-contents'} className={clsx(
			'w-full grow h-full overflow-hidden | flex flex-col',
		)}>
			<div className={'w-full p-4 truncate bg-muted | flex items-center justify-between gap-2'}>
				<div>{channel?.poketto?.basic.title}</div>
				<ControlTool/>
			</div>
			
			<div className={'w-full p-2 grow overflow-auto | flex flex-col gap-1'}>
				{
					//  todo: use channel messages instead of prompt messages
					messages
						.filter((value, index) =>
							channel?.poketto.permissions.openSource || index >= (channel?.poketto.model.initPrompts.length ?? 0),
						)
						.map((msg, index) => (
							<div
								key={index}
								className={clsx(
									'chat tracking-normal text-sm',
									msg.role === 'assistant' ? 'chat-start' : 'chat-end',
								)}>
								
								<div className={clsx(
									'w-full overflow-auto | chat-bubble prose dark:prose-invert prose-sm',
									{
										'system': 'bg-destructive',
										'function': 'bg-destructive',
										'user': 'bg-green-600 text-black',
										'assistant': 'bg-sidebar text-primary-foreground/75',
									}[msg.role],
								)}>
									
									<ReactMarkdown remarkPlugins={[remarkGfm]}>
										{msg.content}
									</ReactMarkdown>
								</div>
							
							</div>
						))
				}
				<div ref={ref}/>
			</div>
			
			<form className={'w-full p-4 | flex justify-center items-center gap-2'} onSubmit={(event) => {
				questionId.current = nanoid()
				pushMessage({
					id: questionId.current,
					channelId: pokettoBasic.id,
					interactions: {},
					type: 'user',
					content: event.currentTarget.prompt.value as string,
					role: 'user',
					format: 'text',
					createdAt: new Date(),
					parentId: undefined,
					userId: user.id,
				})
				handleSubmit(event)
			}}>
				<Input name={'prompt'} className={'w-[95%]'} autoFocus value={input} onChange={handleInputChange} id={'input'}/>
				<Button type={'submit'}>Send</Button>
			</form>
		
		</section>
	)
}
