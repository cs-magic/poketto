import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { type IPokettoComment } from '@/ds/poketto'
import d from '@/lib/datetime'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { ResponsiveField } from '@/components/utils/responsive-field'
import React from 'react'
import { IconThumbDown, IconThumbUp } from '@tabler/icons-react'

export const PokettoComment = (
	{
		comment,
	}: { comment: IPokettoComment }) => {
	
	return (
		<Card variant={'default'}>
			<CardHeader>
				{/* todo: title of comment like Apple */}
				{/*<CardTitle>{item.title}</CardTitle>*/}
				<div className={'flex items-center justify-between gap-4 text-primary-foreground/50'}>
					<div className={'flex flex-col gap-2 items-start'}>
						<p>{d(comment.updatedAt).fromNow()}</p>
						<p>@{comment.user.name}</p>
					</div>
					<Avatar className={'shrink-0'}>
						<AvatarImage src={comment.user.avatar}/>
					</Avatar>
				</div>
			</CardHeader>
			<CardContent>
				{comment.content}
			</CardContent>
			<CardFooter className={'gap-4 text-primary-foreground/50'}>
				<ResponsiveField icon={<IconThumbUp/>} title={comment.upvotes.toString()}/>
				<ResponsiveField icon={<IconThumbDown/>} title={'Not Helpful'}/>
			</CardFooter>
		</Card>
	)
}
