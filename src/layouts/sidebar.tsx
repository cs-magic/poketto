import React, { type ReactNode } from 'react'
import { IconBolt, IconX } from '@tabler/icons-react'
import { Separator } from '@/components/ui/separator'
import { app, InvitationStatus, user } from '@/config/app'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Icons, SelfUserAvatar } from '@/config/icons'
import { Button } from '@/components/ui/button'
import { clsx } from 'clsx'

export const NavGroups = ({ title, children }: {
	title: string
	children: ReactNode
}) =>
	<section id={'side-playground'} className={'flex flex-col gap-2'}>
		<h2 className={'text-sm text-muted-foreground'}>{title}</h2>
		{children}
	</section>


export const Sidebar = () => {
	const FONT_WEIGHT = 'font-light'
	return (
		<div className={clsx(
			'h-full w-60 p-8 | flex flex-col gap-8 | bg-sidebar text-sm text-primary-foreground',
			FONT_WEIGHT,
		)}>
			
			<section className={'flex flex-col gap-4 text-muted-foreground'}>
				<div className={'w-full | flex items-center gap-2 justify-around'}>
					<div className={'flex flex-col items-center gap-2'}>
						<SelfUserAvatar/>
						<span className={'text-xs'}>{user.name}</span>
					</div>
					<IconBolt className={'text-primary-foreground'}/>
					<div className={'flex flex-col items-center gap-2'}>
						<Icons.logo className={'!wh-12 bg-background p-2'}/>
						<span className={'text-xs'}>{app.name}</span>
					</div>
				</div>
				
				<div>
					<span className={''}>@ {user.workspace}</span>
				</div>
				
				<Button>Invite</Button>
			</section>
			
			
			<div className={'flex flex-col gap-0'}>
				<Button className={clsx('justify-start text-xs', FONT_WEIGHT)} variant={'ghost'}>Workspace</Button>
				<Button className={clsx('justify-start text-xs', FONT_WEIGHT)} variant={'ghost'}>Dashboard</Button>
				<Button className={clsx('justify-start text-xs', FONT_WEIGHT)} variant={'ghost'}>Gallery</Button>
				<Button className={clsx('justify-start text-xs', FONT_WEIGHT)} variant={'ghost'}>Integrations</Button>
			</div>
			
			<Separator/>
			
			<div className={'flex flex-col gap-0'}>
				<Button className={clsx('justify-start text-xs', FONT_WEIGHT)} variant={'ghost'}>{'What\'s Lumos?'}</Button>
				<Button className={clsx('justify-start text-xs', FONT_WEIGHT)} variant={'ghost'}>Learning Center</Button>
				<Button className={clsx('justify-start text-xs', FONT_WEIGHT)} variant={'ghost'}>Support Center</Button>
				<Button className={clsx('justify-start text-xs', FONT_WEIGHT)} variant={'ghost'}>Lumos Enterprise</Button>
				<Button className={clsx('justify-start text-xs', FONT_WEIGHT)} variant={'ghost'}>Download Desktop App</Button>
			</div>
			
			<div className={'grow'}/>
			
			<div className={'p-2 | flex flex-col gap-2 | border '}>
				<div className={'flex items-center justify-between'}>
					<Badge variant={'secondary'}>Tips</Badge>
					<IconX className={'text-muted-foreground'}/>
				</div>
				<div className={'flex flex-col gap-2 | text-sm'}>
					<p>每位魔法师用户都可以拥有三张 Lumos 社区的邀请码，您可以将其分享给您的好友，注册成功后将有 CS 币赠送哦！</p>
					<Button>当前剩余：{user.invitation.to.filter((item) => item.status === InvitationStatus.pending).length}</Button>
				</div>
			</div>
		
		</div>
	)
}
