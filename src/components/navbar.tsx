import Logo from '../../public/images/logo/m/1280.svg'
import { app } from '@/config/app'
import React, { type PropsWithChildren } from 'react'
import { useTheme } from 'next-themes'
import { IconBrightnessHalf, IconMoon, IconSun } from '@tabler/icons-react'
import { Skeleton } from '@/components/ui/skeleton'
import { useMount } from '@/hooks/use-mount'
import CommandDemo from '@/components/command'
import { BellIcon, GearIcon, QuestionMarkCircledIcon } from '@radix-ui/react-icons'
import { ICON_DIMENSION_SM } from '@/config/assets'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { MenuLink } from '@/components/link'


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
	return (
		<div className={'inline-flex items-center gap-2'}>
			<Logo height={32}/>
			<span className={'text-xl tracking-widest'}>{app.name}</span>
		</div>
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
			
			{/*<LumosNavigationMenu/>*/}
			{/*<NavigationMenuDemo/>*/}
			
			<LogoWithName/>
			
			<div className={'grow'}/>
			<CommandDemo/>
			
			<Popover>
				<PopoverTrigger>
					<IconContainer children={<QuestionMarkCircledIcon/>}/>
				</PopoverTrigger>
				
				<PopoverContent>
					<section className={'flex flex-col'}>
						<MenuLink field={'whats-lumos'} title={'What\'s Lumos?'}/>
						<MenuLink field={'learning-center'}/>
						<MenuLink field={'support-center'}/>
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
