import { user } from '@/config/user'
import { InvitationStatus } from '@/ds/system'
import { Badge } from '@/components/ui/badge'
import ReactMarkdown from 'react-markdown'
import Mustache from 'mustache'
import { app } from '@/config/app'
import { uri } from '@/config/uri'
import { Button } from '@/components/ui/button'
import React from 'react'
import { Cross1Icon } from '@radix-ui/react-icons'

export const InviteCard = () => {
	const surplus = user.invitation.to.filter((item) => item.status === InvitationStatus.pending).length
	
	return (
		<div className={'flex flex-col gap-2 whitespace-normal | text-sm border p-4 rounded-xl'}>
			<div className={'flex items-center justify-between'}>
				<Badge className={'w-fit'}>Tips</Badge>
				<Cross1Icon className={'wh-4 text-muted-foreground'}/>
			</div>
			<article className={'prose dark:prose-invert'}>
				<ReactMarkdown>
					{
						Mustache.render('每位 [{{appName}}]({{appDoc}}) 用户都拥有 **5** 张邀请码，分享给您的好友注册成功后将有 [{{currencyName}}]({{currencyDoc}})' +
							' 赠送哦！当前剩余：[{{surplus}}](/dashboard)',
							{
								surplus,
								appName: app.name,
								appDoc: uri.app.docs.intro,
								currencyName: app.currency,
								currencyDoc: uri.app.docs.currency,
							})
					}
				</ReactMarkdown>
			</article>
			<Button variant={'destructive'}>Invite</Button>
		
		</div>
	)
}
