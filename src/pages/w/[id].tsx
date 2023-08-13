import { RootLayout } from '@/layouts/root.layout'
import { PokettoDetail } from '@/components/channel/channel-detail'
import { PokettoList } from '@/components/channel/channel-list'
import { useAppStore } from '@/store'
import { useChat } from 'ai/react'
import { toast } from 'sonner'
import clsx from 'clsx'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ControlTool } from '@/components/utils/tools'


export default function ConversationPage() {
	
	
	const { channels, pokettoId, pokettoBasic, chatListVisible, chatDetailVisible, pokettoComments } = useAppStore()
	const channel = channels.find((c) => c.poketto.id === pokettoId)
	
	const { messages, handleSubmit, input, handleInputChange } = useChat({
		initialMessages: [
			...channel?.poketto.model.initPrompts ?? [],
			...channel?.poketto.conversation?.messages ?? [],
		],
		onError: err => {
			toast.error(err.message)
		},
	})
	
	console.log({ messages })
	
	return (
		<RootLayout>
			<div className={'w-full h-full overflow-hidden | flex divide-x'}>
				
				{chatListVisible && <PokettoList/>}
				
				<section id={'chat-contents'} className={clsx(
					'w-full grow h-full overflow-hidden | flex flex-col',
				)}>
					<div className={'w-full p-4 truncate bg-muted | flex items-center justify-between gap-2'}>
						<div>{channel?.poketto?.basic.title}</div>
						<ControlTool/>
					</div>
					
					<div className={'w-full p-2 grow overflow-auto | flex flex-col gap-1'}>
						{
							messages
								.filter((value, index) => channel?.poketto.permissions.openSource || index >= (channel?.poketto.model.initPrompts.length ?? 0))
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
					</div>
					
					<form className={'w-full p-4 | flex justify-center items-center gap-2'} onSubmit={handleSubmit}>
						<Input name={'prompt'} className={'w-[95%]'} autoFocus value={input} onChange={handleInputChange} id={'input'}/>
						<Button type={'submit'}>Send</Button>
					</form>
				
				</section>
				
				{chatDetailVisible && pokettoBasic && <PokettoDetail poketto={pokettoBasic} comments={pokettoComments}/>}
			</div>
		</RootLayout>
	)
}
