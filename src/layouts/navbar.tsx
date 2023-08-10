import Logo from '../../public/images/logo/m/1280.svg'
import { app } from '@/config/app'
import React from 'react'
import { useTheme } from 'next-themes'
import { IconBrightnessHalf, IconMoon, IconSun } from '@tabler/icons-react'
import { Skeleton } from '@/components/ui/skeleton'
import { Input } from '@/components/ui/input'
import { useMount } from '@/hooks/use-mount'
import CommandDemo from '@/components/command'
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger, navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import Link from 'next/link'
// import { CommandShortcut } from '@/components/ui/command'


export const ThemeSwitcher = () => {
	const { theme, setTheme, themes } = useTheme()
	const mounted = useMount()
	
	if (!mounted || !theme) return <Skeleton className={'w-8 h-8'}/>
	
	const nextTheme = themes[(themes.indexOf(theme) + 1) % themes.length]!
	return (
		<div onClick={() => setTheme(nextTheme)}>
			{theme === 'light' && <IconSun/>}
			{theme === 'dark' && <IconMoon/>}
			{theme === 'system' && <IconBrightnessHalf/>}
		</div>
	)
}

export const LogoWithName = () => {
	return (
		<div className={'inline-flex items-center gap-2'}>
			<Logo height={32}/>
			{app.name}
		</div>
	)
}

export default function Navbar() {
	
	return (
		<div className={'px-4 py-2 | flex items-center gap-4 | border-b'}>
			
			
			<NavigationMenu>
				<NavigationMenuList className={''}>
					
					<NavigationMenuItem>
						<Link href={'/'} legacyBehavior passHref>
							<NavigationMenuLink className={navigationMenuTriggerStyle()}>
								Home
							</NavigationMenuLink>
						</Link>
					</NavigationMenuItem>
					
					{/* todo: trigger style not work as expected */}
					<NavigationMenuItem>
						<NavigationMenuTrigger>Workspaces</NavigationMenuTrigger>
						<NavigationMenuContent>
							Mark Shawn
						</NavigationMenuContent>
					</NavigationMenuItem>
					
					<NavigationMenuItem>
						<NavigationMenuTrigger>Toolkits</NavigationMenuTrigger>
						<NavigationMenuContent>
							Mark Shawn
						</NavigationMenuContent>
					</NavigationMenuItem>
					
					<NavigationMenuItem>
						<Link href={'/explore'} legacyBehavior passHref>
							<NavigationMenuLink className={navigationMenuTriggerStyle()}>
								Explore
							</NavigationMenuLink>
						</Link>
					</NavigationMenuItem>
				
				</NavigationMenuList>
			</NavigationMenu>
			
			<div className={'grow'}/>
			<CommandDemo/>
			
			{/* 由 lara 调 */}
			<ThemeSwitcher/>
		</div>
	)
}
