import { product } from '@/config/product'
import React, { Fragment, type PropsWithChildren, type ReactNode } from 'react'
import { useTheme } from 'next-themes'
import { IconBrandOpenai, IconBrightnessHalf, IconLayoutDashboard, IconMoon, IconSearch, IconSun } from '@tabler/icons-react'
import { Skeleton } from '@/components/ui/skeleton'
import { useMount } from '@/hooks/use-mount'
import { BellIcon, GearIcon, PersonIcon, QuestionMarkCircledIcon } from '@radix-ui/react-icons'
import { ICON_DIMENSION_SM, Icons } from '@/config/assets'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { MenuLink } from '@/components/link'
import { uri } from '@/config/uri'
import { Button } from '@/components/ui/button'
import { useAppStore } from '@/store'
import Image from 'next/image'
import CatLogo from '../../public/images/logo/poketto/Your-Sole-Poketto.png'
import { useHotkeys } from '@mantine/hooks'
import { Input } from '@/components/ui/input'
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from '@/components/ui/command'
import _ from 'lodash'


export const ThemeSwitcher = () => {
	const { theme, setTheme, themes } = useTheme()
	const mounted = useMount()
	
	if (!mounted || !theme) return <Skeleton className={'w-8 h-8'}/>
	
	const nextTheme = themes[(themes.indexOf(theme) + 1) % themes.length]!
	return (<div onClick={() => setTheme(nextTheme)} className={'p-2 hover:bg-accent'}>
		{theme === 'light' && <IconSun className={ICON_DIMENSION_SM}/>}
		{theme === 'dark' && <IconMoon className={ICON_DIMENSION_SM}/>}
		{theme === 'system' && <IconBrightnessHalf className={ICON_DIMENSION_SM}/>}
	</div>)
}

export const LogoWithName = () => {
	const { toggleSidebar } = useAppStore()
	return (<Button variant={'ghost'} className={'justify-start gap-2'} onClick={toggleSidebar}>
		{/*<Logo height={24}/>*/}
		<Image src={CatLogo} alt={'Cat Logo'} width={24} height={24}/>
		<span className={'text-lg tracking-widest'}>{product.name}</span>
	</Button>)
}

export const IconContainer = ({ children }: PropsWithChildren) => {
	return (<div className={'p-2 hover:bg-accent'}>
		{children}
	</div>)
}

export default function Navbar() {
	
	return (<div className={'px-4 py-2 | flex items-center | border-b'}>
		
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
	
	</div>)
}


enum CommandType {
	suggestion = 'suggestion', settings = 'settings',
}

interface ICommandItem {
	id: string
	icon: ReactNode
	title?: string
	category: CommandType
	kbd?: string
}

const commands: ICommandItem[] = [{
	id: 'ChatGPT', icon: <IconBrandOpenai/>, category: CommandType.suggestion,
}, {
	id: 'OpenChat', icon: <Icons.openchat/>, category: CommandType.suggestion,
}, {
	id: 'MidJourney', icon: <Icons.midjourney/>, category: CommandType.suggestion,
}, {
	id: 'Dashboard', icon: <IconLayoutDashboard/>, category: CommandType.settings, kbd: '⌘ D',
}, {
	id: 'Profile', icon: <PersonIcon/>, category: CommandType.settings, kbd: '⌘ P',
}, {
	id: 'System', icon: <GearIcon/>, category: CommandType.settings, kbd: '⇧ ⌘ P',
}]

const CommandDemo = () => {
	const [open, setOpen] = React.useState(false)
	const { searchHistory: history, pushSearch: push } = useAppStore()
	
	const KEY = 'K'
	useHotkeys([[`mod+${KEY}`, () => setOpen(!open)]])
	
	return (<>
		<div className={'w-[256px] | relative flex items-center | text-muted-foreground text-sm'}>
			<IconSearch className={'absolute left-2 wh-5'}/>
			<Input className={'grow'} onFocus={() => setOpen(!open)}/>
			<kbd className="absolute right-2 shrink-0 h-6 p-2 |  pointer-events-none inline-flex select-none items-center gap-1 rounded border bg-muted font-mono font-medium text-muted-foreground">
				⌘ {KEY}
			</kbd>
		</div>
		
		<CommandDialog open={open} onOpenChange={setOpen}>
			<CommandInput placeholder="Type a command or search..."/>
			<CommandList className={'max-h-[600px]'}>
				
				<CommandEmpty>No results found.</CommandEmpty>
				
				<CommandGroup heading="History">
					
					<div className={'flex flex-wrap gap-2'}>
						{history
							.map((id) => commands.find((command) => command.id === id)!)
							.map((item) => (<CommandItem key={item.id} className={'flex items-center gap-2'}>
								{item.icon}
								<span>{item.title ?? item.id}</span>
							</CommandItem>))}
					</div>
				
				</CommandGroup>
				
				{Object.entries(_.groupBy(commands, 'category'))
					.map(([cat, items]) => (<Fragment key={cat}>
						<CommandSeparator/>
						<CommandGroup heading={cat} key={cat}>
							{items.map((item) => (<CommandItem key={item.id} className={'flex items-center gap-2'}
							                                   onSelect={() => {
								                                   // ref: https://github.com/pacocoursey/cmdk#nested-items
								                                   console.log('selected ', item)
								                                   push(item.id)
							                                   }}>
								{item.icon}
								<span>{item.title ?? item.id}</span>
							</CommandItem>))}
						
						</CommandGroup>
					</Fragment>))}
			
			</CommandList>
		</CommandDialog>
	</>)
}
