import Logo from '../../../public/images/logo/m/1280.svg'
import { app } from '@/config/app'
import React, { type PropsWithChildren } from 'react'
import { useTheme } from 'next-themes'
import { IconBrightnessHalf, IconMoon, IconSun } from '@tabler/icons-react'
import { Skeleton } from '@/components/ui/skeleton'
import { useMount } from '@/hooks/use-mount'
import CommandDemo from '@/components/utils/command'
import { BellIcon, GearIcon, QuestionMarkCircledIcon } from '@radix-ui/react-icons'
import { ICON_DIMENSION_SM } from '@/config/assets'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { MenuLink } from '@/components/utils/link'
import { uri } from '@/config/uri'
import clsx from 'clsx'
import { Button } from '@/components/ui/button'
import { useStore } from '@/store'


export const ThemeSwitcher = () => {
	const { theme, setTheme, themes } = useTheme()
	const mounted = useMount()
	
	if (!mounted || !theme) return <Skeleton className={'w-8 h-8'}/>
	
	const nextTheme = themes[(themes.indexOf(theme) + 1) % themes.length]!
	return (
		<div onClick={() => setTheme(nextTheme)} className={'p-2 hover:bg-accent'}>
			{theme === 'light' && <IconSun className={ICON_DIMENSION_SM}/>}
			{theme === 'dark' && <IconMoon className={ICON_DIMENSION_SM}/>}
			{theme === 'system' && <IconBrightnessHalf className={ICON_DIMENSION_SM}/>}
		</div>
	)
}

export const LogoWithName = () => {
	const { toggleSidebar } = useStore()
	return (
		<Button variant={'ghost'} className={'justify-start gap-2'} onClick={toggleSidebar}>
			<Logo height={24} className={clsx(
				// 'rotate-180'
			)}/>
			<span className={'text-lg tracking-widest'}>{app.name}</span>
		</Button>
	)
}

export const IconContainer = ({ children }: PropsWithChildren) => {
	return (
		<div className={'p-2 hover:bg-accent'}>
			{children}
		</div>
	)
}

export default function Navbar() {
	
	return (
		<div className={'px-4 py-2 | flex items-center | border-b'}>
			
			<LogoWithName/>
			
			<div className={'grow'}/>
			<CommandDemo/>
			
			<Popover>
				<PopoverTrigger>
					<IconContainer children={<QuestionMarkCircledIcon/>}/>
				</PopoverTrigger>
				
				<PopoverContent>
					<section className={'flex flex-col'}>
						<MenuLink field={'whats-poketto'} title={'What\'s Poketto.AI ?'} link={uri.app.docs.intro}/>
						<MenuLink field={'whats-dora'} title={'What\'s Dora ?'} link={uri.app.docs.currency}/>
						<MenuLink field={'learning-center'} link={uri.app.docs.learn}/>
						<MenuLink field={'support-center'} link={uri.app.docs.support}/>
					</section>
				
				</PopoverContent>
			</Popover>
			
			{/* 由 lara 调 */}
			<ThemeSwitcher/>
			
			<IconContainer children={<BellIcon/>}/>
			
			<IconContainer children={<GearIcon/>}/>
		
		</div>
	)
}
