import React from 'react'
import { Separator } from '@/components/ui/separator'
import { clsx } from 'clsx'
import { ChevronRightIcon, EnvelopeOpenIcon, HomeIcon, LightningBoltIcon, MixIcon, RocketIcon, TargetIcon } from '@radix-ui/react-icons'
import { MenuLink } from '@/components/utils/link'
import { uri } from '@/config/uri'
import { InviteCard } from '@/components/utils/invitation'
import { useAppStore } from '@/store'
import { useUser } from '@/hooks/use-user'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ICON_DIMENSION_MD } from '@/config/assets'
import { UserIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { signIn, signOut } from 'next-auth/react'


export const Sidebar = () => {
	
	const { sidebarVisible } = useAppStore()
	const user = useUser()
	
	return (
		<div className={clsx(
			'h-full max-w-[240px] shrink-0 whitespace-nowrap px-4 pt-8 | flex flex-col gap-6 | bg-sidebar text-sm text-primary-foreground',
		)}>
			
			<section className={'flex flex-col'}>
				<MenuLink icon={<HomeIcon/>} field={'workspaces'} link={uri.app.workspace}/>
				<MenuLink icon={<RocketIcon/>} field={'explore'}/>
				{/*<MenuLink field={'toolkits'}/>*/}
			</section>
			
			<Separator/>
			<section className={'flex flex-col'}>
				<MenuLink icon={<MixIcon/>} field={'dashboard'} link={uri.user.dashboard}/>
				<MenuLink icon={<TargetIcon/>} field={'gallery'} link={uri.user.gallery}/>
				<MenuLink field={'integrations'} link={uri.user.integrations}/>
			</section>
			
			<Separator/>
			<section className={'flex flex-col'}>
				<MenuLink icon={<LightningBoltIcon/>} field={'Join Platform Waitlist'} link={uri.user.seek.waitlist}/>
				<MenuLink icon={<EnvelopeOpenIcon/>} field={'poketto-enterprise'} link={uri.user.seek.enterprise}/>
			</section>
			
			{/* footer */}
			<div className={'grow'}/>
			
			{sidebarVisible && <InviteCard/>}
			
			<div className={'flex justify-center items-center gap-2 py-4 border-t'}>
				<Avatar className={ICON_DIMENSION_MD}>
					<AvatarImage src={user?.image ?? undefined}/>
					<AvatarFallback><UserIcon/></AvatarFallback>
				</Avatar>
				
				{sidebarVisible && (
					user ? (
						<>
							<div className={'flex flex-col gap-0'} onClick={() => void signOut()}>
								<span className={'text-xs'}>{user.name}</span>
								<span className={'text-xs'}>{user.id}</span>
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
