import React from 'react'
import { Separator } from '@/components/ui/separator'
import { clsx } from 'clsx'
import { ChevronRightIcon, EnvelopeOpenIcon, HomeIcon, LightningBoltIcon, MixIcon, RocketIcon, TargetIcon } from '@radix-ui/react-icons'
import { MenuLink } from '@/components/utils/link'
import { SelfUserAvatar } from '@/components/user'
import { user } from '@/config/user'
import { uri } from '@/config/uri'
import { InviteCard } from '@/components/utils/invitation'
import { useAppStore } from '@/store'


export const Sidebar = () => {
	
	const { sidebarVisible, toggleSidebar } = useAppStore()
	
	return (
		<div className={clsx(
			'h-full max-w-[240px] shrink-0 whitespace-nowrap px-4 pt-8 | flex flex-col gap-6 | bg-sidebar text-sm text-primary-foreground',
		)}>
			{/*<LogoWithName/>*/}
			{/*<Separator/>*/}
			
			<section className={'flex flex-col'}>
				
				{/*<Button variant={'ghost'} className={'justify-start'} onClick={toggleSidebar}>*/}
				{/*	{sidebarVisible ? <TextAlignRightIcon/> : <TextAlignLeftIcon/>}*/}
				{/*</Button>*/}
				
				
				<MenuLink icon={<HomeIcon/>} field={'workspaces'}/>
				<MenuLink icon={<RocketIcon/>} field={'explore'}/>
				{/*<MenuLink field={'toolkits'}/>*/}
			</section>
			
			<Separator/>
			<section className={'flex flex-col'}>
				<MenuLink icon={<MixIcon/>} field={'dashboard'} link={uri.user.dashboard}/>
				<MenuLink icon={<TargetIcon/>} field={'gallery'} link={uri.user.gallery}/>
				{/*<MenuLink field={'integrations'} link={uri.user.integrations}/>*/}
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
				<SelfUserAvatar/>
				{sidebarVisible && (
					<>
						<div className={'flex flex-col gap-0'}>
							<span className={'text-xs'}>{user.name}</span>
							<span className={'text-xs'}>{user.id}</span>
						</div>
						<div className={'grow'}/>
						<ChevronRightIcon/>
					</>
				)}
			</div>
		</div>
	)
}
