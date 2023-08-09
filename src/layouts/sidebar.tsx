import React, { type ReactNode } from 'react'
import { IconCategory, IconHistory, IconPlug, IconUsers, IconVectorTriangle, IconWorldCode, IconX } from '@tabler/icons-react'
import { IconTitleLine } from '@/components/general'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { user } from '@/config/app'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { uri } from '@/config'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { UserProfile } from '@/components/user/profile'

export const NavGroups = ({ title, children }: {
	title: string
	children: ReactNode
}) =>
	<section id={'side-playground'} className={'flex flex-col gap-2'}>
		<h2 className={'text-sm text-muted-foreground'}>{title}</h2>
		{children}
	</section>


export const Sidebar = () => {
	return (
		<div className={'h-full w-52 p-2 py-2 | flex flex-col gap-4'}>
			
			<NavGroups title={'广场'}>
				<IconTitleLine icon={<IconCategory/>} title={'首页'} href={uri.home}/>
				<IconTitleLine icon={<IconWorldCode/>} title={'发现'} href={uri.discover}/>
				<IconTitleLine icon={<IconPlug/>} title={'插件'} href={uri.plugins}/>
			</NavGroups>
			
			<Separator className={'w-full'}/>
			<NavGroups title={'我的空间'}>
				<IconTitleLine icon={<IconUsers/>} title={'我的关注'} href={uri.me.following}/>
				<IconTitleLine icon={<IconHistory/>} title={'历史记录'} href={uri.me.history}/>
				<IconTitleLine icon={<IconVectorTriangle/>} title={'星空图'} href={uri.me.graph}/>
			</NavGroups>
			
			<div className={'grow'}/>
			
			<Card>
				<CardHeader>
					<CardTitle className={'flex items-center justify-between'}>
						<Badge variant={'secondary'}>分享</Badge>
						<IconX className={'text-muted-foreground'}/>
					</CardTitle>
				</CardHeader>
				<CardContent className={'flex flex-col gap-2 | text-sm'}>
					每位魔法师用户都可以拥有三张 Lumos 社区的邀请码，您可以将其分享给您的好友，注册成功后将有 CS 币赠送哦！
				</CardContent>
			</Card>
			
			<Separator className={'w-full'}/>
			<HoverCard openDelay={100}>
				<HoverCardTrigger>
					<div className={'flex items-center gap-2 text-muted-foreground'}>
						<Avatar className={'border border-muted'}>
							<AvatarImage src={`https://robohash.org/${user.id}?set=set2&size=180x180`}/>
						</Avatar>
						<div className={'grow overflow-hidden | flex flex-col gap-1'}>
							<p className={'text-sm'}>{user.name}</p>
							<p className={'text-xs truncate'}>{user.email}</p>
						</div>
						{/*<IconChevronRight className={'text-muted-foreground'}/>*/}
					</div>
				</HoverCardTrigger>
				
				<HoverCardContent>
					<UserProfile/>
				</HoverCardContent>
			</HoverCard>
		
		</div>
	)
}
