import React, { type ReactNode } from 'react'
import { Separator } from '@/components/ui/separator'
import { app, InvitationStatus, user } from '@/config/app'
import { Icons, SelfUserAvatar } from '@/config/icons'
import { Button } from '@/components/ui/button'
import { clsx } from 'clsx'
import { LightningBoltIcon } from '@radix-ui/react-icons'
import ReactMarkdown from 'react-markdown'
import Mustache from 'mustache'

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
	const surplus = user.invitation.to.filter((item) => item.status === InvitationStatus.pending).length
	
	return (
		<div className={clsx(
			'h-full w-60 p-8 | flex flex-col gap-6 | bg-sidebar text-sm text-primary-foreground',
			FONT_WEIGHT,
		)}>
			
			<section className={'flex flex-col gap-4 text-muted-foreground'}>
				<div className={'w-full | flex items-center gap-2 justify-around'}>
					<div className={'flex flex-col items-center gap-2'}>
						<SelfUserAvatar/>
						<span className={'text-xs'}>{user.name}</span>
					</div>
					{/*<IconBolt className={'text-primary-foreground'}/>*/}
					{/*<IconBoltOff className={'text-primary-foreground'}/>*/}
					{/*<MagicWandIcon className={'text-primary-foreground'}/>*/}
					<LightningBoltIcon className={'text-primary-foreground'}/>
					<div className={'flex flex-col items-center gap-2'}>
						<Icons.logo className={'!wh-12 bg-background p-2'}/>
						<span className={'text-xs'}>{app.name}</span>
					</div>
				</div>
				
				<div>
					<span className={''}>@ {user.workspace}</span>
				</div>
			
			</section>
			
			
			<section className={'flex flex-col gap-0'}>
				<Button className={clsx('justify-start text-xs', FONT_WEIGHT)} variant={'ghost'}>Workspaces</Button>
				<Button className={clsx('justify-start text-xs', FONT_WEIGHT)} variant={'ghost'}>Toolkits</Button>
				<Button className={clsx('justify-start text-xs', FONT_WEIGHT)} variant={'ghost'}>Integrations</Button>
			</section>
			
			<Separator/>
			
			<section className={'flex flex-col gap-0'}>
				<Button className={clsx('justify-start text-xs', FONT_WEIGHT)} variant={'ghost'}>Dashboard</Button>
				<Button className={clsx('justify-start text-xs', FONT_WEIGHT)} variant={'ghost'}>Gallery</Button>
			</section>
			
			<Separator/>
			
			<section className={'flex flex-col gap-0'}>
				<Button className={clsx('justify-start text-xs', FONT_WEIGHT)} variant={'ghost'}>{'What\'s Lumos?'}</Button>
				<Button className={clsx('justify-start text-xs', FONT_WEIGHT)} variant={'ghost'}>Learning Center</Button>
				<Button className={clsx('justify-start text-xs', FONT_WEIGHT)} variant={'ghost'}>Support Center</Button>
				<Button className={clsx('justify-start text-xs', FONT_WEIGHT)} variant={'ghost'}>Lumos Enterprise</Button>
				<Button className={clsx('justify-start text-xs', FONT_WEIGHT)} variant={'ghost'}>Download Desktop App</Button>
			</section>
			
			<div className={'grow'}/>
			
			<Separator/>
			<div className={'flex flex-col gap-2 | text-sm'}>
				<ReactMarkdown>
					{
						Mustache.render('每位 LUMOS 用户都可以拥有 **3** 张邀请码，分享给您的好友注册成功后将有光子赠送哦！当前剩余：[{{surplus}}](/dashboard)', { surplus })
					}
				
				</ReactMarkdown>
				<Button>Invite</Button>
			
			</div>
		
		</div>
	)
}
