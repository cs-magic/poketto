import React, { type ReactNode } from 'react'
import { Separator } from '@/components/ui/separator'
import { app, InvitationStatus, user } from '@/config/app'
import { Assets, SelfUserAvatar } from '@/config/assets'
import { Button } from '@/components/ui/button'
import { clsx } from 'clsx'
import { ChevronRightIcon, LightningBoltIcon } from '@radix-ui/react-icons'
import ReactMarkdown from 'react-markdown'
import Mustache from 'mustache'
import { Badge } from '@/components/ui/badge'
import { XIcon } from 'lucide-react'
import { MenuLink } from '@/components/link'

export const NavGroups = ({ title, children }: {
	title: string
	children: ReactNode
}) =>
	<section id={'side-playground'} className={'flex flex-col gap-2'}>
		<h2 className={'text-sm text-muted-foreground'}>{title}</h2>
		{children}
	</section>


export const UserVSLumos = () => {
	return (
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
					<Assets.logo className={'!wh-12 bg-background p-2'}/>
					<span className={'text-xs'}>{app.name}</span>
				</div>
			</div>
			
			<div>
				<span className={''}>@ {user.workspace}</span>
			</div>
		
		</section>
	)
}

export const InviteCard = () => {
	const surplus = user.invitation.to.filter((item) => item.status === InvitationStatus.pending).length
	
	return (
		<div className={'flex flex-col gap-2 whitespace-normal | text-sm border p-4 rounded-xl'}>
			<div className={'flex items-center justify-between'}>
				<Badge variant={'destructive'} className={'w-fit'}>Tips</Badge>
				<XIcon className={'wh-4 text-muted-foreground'}/>
			</div>
			<ReactMarkdown>
				{
					Mustache.render('每位 LUMOS 用户都可以拥有 **3** 张邀请码，分享给您的好友注册成功后将有光子赠送哦！当前剩余：[{{surplus}}](/dashboard)', { surplus })
				}
			
			</ReactMarkdown>
			<Button>Invite</Button>
		
		</div>
	)
}

export const Sidebar = () => {
	
	return (
		<div className={clsx(
			'h-full w-60 shrink-0 whitespace-nowrap px-4 pt-8 | flex flex-col gap-6 | bg-sidebar text-sm text-primary-foreground',
		)}>
			
			<section className={'flex flex-col'}>
				<MenuLink field={'workspaces'}/>
				<MenuLink field={'explore'}/>
				<MenuLink field={'toolkits'}/>
			</section>
			
			<Separator/>
			<section className={'flex flex-col'}>
				<MenuLink field={'dashboard'}/>
				<MenuLink field={'gallery'}/>
				<MenuLink field={'integrations'}/>
			</section>
			
			<Separator/>
			<section className={'flex flex-col'}>
				<MenuLink field={'whats-lumos'} title={'What\'s Lumos?'}/>
				<MenuLink field={'learning-center'}/>
				<MenuLink field={'support-center'}/>
				<MenuLink field={'lumos-enterprise'}/>
				<MenuLink field={'apply-platform-waitlist'}/>
			</section>
			
			{/*<Separator/>*/}
			{/*<section className={'flex flex-col'}>*/}
			{/*	<MenuLink field={'apply-desktop-app-waitlist'}/>*/}
			{/*	<MenuLink field={'apply-mobile-app-waitlist'}/>*/}
			{/*	<MenuLink field={'apply-wechat-waitlist'}/>*/}
			{/*</section>*/}
			
			
			{/* footer */}
			<div className={'grow'}/>
			
			<InviteCard/>
			
			<div className={'flex items-center gap-2 p-4 border-t'}>
				<SelfUserAvatar/>
				<div className={'flex flex-col gap-0'}>
					<span className={'text-xs'}>{user.name}</span>
					<span className={'text-xs'}>{user.id}</span>
				</div>
				<div className={'grow'}/>
				<ChevronRightIcon/>
			</div>
		</div>
	)
}
