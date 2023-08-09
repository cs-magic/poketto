import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { clsx } from 'clsx'
import { type ReactNode } from 'react'
import { getShortName } from '@/lib/string'

export const Chat = (props: {
	isSelf: boolean
	user: {
		name: string
		avatar?: string
		avatarFallback?: ReactNode
	}
	content: string
	time?: Date
	status?: any
}) => {
	return (
		<div className={'w-full flex gap-2 text-sm py-2 z-10 bg-background'}>
			<Avatar className={'shrink-0'}>
				<AvatarImage src={props.user.avatar}/>
				<AvatarFallback>{props.user.avatarFallback ?? getShortName(props.user.name)}</AvatarFallback>
			</Avatar>
			
			<div className={clsx(
				'grow',
				props.isSelf ? 'text-green-500' : 'text-slate-500',
			)}>
				{props.content}
			</div>
		</div>
	)
}
