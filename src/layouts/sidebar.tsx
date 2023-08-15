import React from 'react'
import { Separator } from '@/components/ui/separator'
import { clsx } from 'clsx'
import { ChevronRightIcon, Cross1Icon, EnvelopeOpenIcon, HomeIcon, LightningBoltIcon, MixIcon, RocketIcon, TargetIcon } from '@radix-ui/react-icons'
import { MenuLink } from '@/components/link'
import { useAppStore } from '@/store'
import { useUser } from '@/hooks/use-user'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ICON_DIMENSION_MD } from '@/lib/assets'
import { UserIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { signIn, signOut } from 'next-auth/react'
import { api } from '@/lib/api'
import { InvitationStatus } from '.prisma/client'
import { Badge } from '@/components/ui/badge'
import ReactMarkdown from 'react-markdown'
import Mustache from 'mustache'
import { product, URI, USER_INVITATIONS_COUNT } from '@/config'


export const Sidebar = () => {
	
	const { sidebarVisible } = useAppStore()
	const user = useUser()
	
	return (
		<div className={clsx(
			'h-full max-w-[240px] shrink-0 whitespace-nowrap px-4 pt-8 | flex flex-col gap-6 | bg-sidebar text-sm text-primary-foreground',
		)}>
			
			<section className={'flex flex-col'}>
				<MenuLink icon={<HomeIcon/>} field={'home'} link={URI.app.home}/>
				<MenuLink icon={<RocketIcon/>} field={'explore'} link={URI.app.explore}/>
				{/*<MenuLink field={'toolkits'}/>*/}
			</section>
			
			<Separator/>
			<section className={'flex flex-col'}>
				<MenuLink icon={<MixIcon/>} field={'dashboard'} link={URI.user.dashboard}/>
				<MenuLink icon={<TargetIcon/>} field={'gallery'} link={URI.user.gallery}/>
				{/*<MenuLink field={'integrations'} link={uri.user.integrations}/>*/}
			</section>
			
			<Separator/>
			<section className={'flex flex-col'}>
				<MenuLink icon={<LightningBoltIcon/>} field={'Join Platform Waitlist'} link={URI.user.seek.waitlist}/>
				<MenuLink icon={<EnvelopeOpenIcon/>} field={'poketto-enterprise'} link={URI.user.seek.enterprise}/>
			</section>
			
			{/* footer */}
			<div className={'grow'}/>
			
			{sidebarVisible && user && <InviteCard/>}
			
			<div className={'flex justify-center items-center gap-2 py-4 border-t'}>
				{user && (
					<Avatar className={ICON_DIMENSION_MD}>
						<AvatarImage src={user?.image ?? undefined}/>
						<AvatarFallback><UserIcon/></AvatarFallback>
					</Avatar>
				)}
				
				{sidebarVisible && (
					user ? (
						<>
							<div className={'flex flex-col gap-0'} onClick={() => void signOut()}>
								<span className={'text-xs'}>{user.name}</span>
								<span className={'text-xs text-muted-foreground'}>{user.id}</span>
							</div>
							<div className={'grow'}/>
							<ChevronRightIcon/>
						</>
					) : (
						<Button className={'grow'} variant={'destructive'} onClick={() => void signIn()}>
							登录
						</Button>
					)
				)}
			</div>
		</div>
	)
}


const InviteCard = () => {
	const { data = [] } = api.user.getInvitations.useQuery()
	// todo: include ? on enum type
	const surplus = data.filter((item) => item.status === InvitationStatus.Idle).length
	
	return (
		<div className={'flex flex-col gap-2 whitespace-normal | text-sm border p-4 rounded-xl'}>
			<div className={'flex items-center justify-between'}>
				<Badge className={'w-fit'}>Tips</Badge>
				<Cross1Icon className={'wh-4 text-muted-foreground'}/>
			</div>
			<article className={'prose dark:prose-invert'}>
				<ReactMarkdown>
					{
						Mustache.render('每位 [{{appName}}]({{appDoc}}) 用户都拥有 **{{cnt}}** 张邀请码，分享给您的好友注册成功后将有 [{{currencyName}}]({{currencyDoc}})' +
							' 赠送哦！当前剩余：[{{surplus}}](/dashboard)',
							{
								cnt: USER_INVITATIONS_COUNT,
								surplus,
								appName: product.name,
								appDoc: URI.app.docs.intro,
								currencyName: product.currency,
								currencyDoc: URI.app.docs.currency,
							})
					}
				</ReactMarkdown>
			</article>
			<Button className={'bg-blue-500/75 hover:bg-blue-500'}>Invite</Button>
		
		</div>
	)
}
