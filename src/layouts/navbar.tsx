import Logo from '../../public/images/logo/m/1280.svg'
import { app } from '@/config/app'
import React from 'react'
import { useTheme } from 'next-themes'
import { IconBrightnessHalf, IconMoon, IconSun } from '@tabler/icons-react'
import { Skeleton } from '@/components/ui/skeleton'
import { Input } from '@/components/ui/input'
import { useMount } from '@/hooks/use-mount'
import { CommandDemo } from '@/components/command'
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

export default function Navbar() {
	
	return (
		<div className={'mx-2 py-2 | flex justify-between items-center gap-4 | border-b'}>
			<div className={'inline-flex items-center gap-2'}>
				<Logo height={32}/>
				{app.name}
			</div>
			
			{/*<div className={'inline-flex items-center gap-2'}>*/}
			{/*	<Input className={'max-w-md'}/>*/}
			{/*	/!*<CommandShortcut>⌘K</CommandShortcut>*!/*/}
			{/*</div>*/}
			<CommandDemo/>
			
			<ThemeSwitcher/>
		</div>
	)
}
