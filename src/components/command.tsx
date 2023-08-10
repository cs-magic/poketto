'use client'

import * as React from 'react'
import { Fragment, type ReactNode } from 'react'
import { GearIcon, PersonIcon } from '@radix-ui/react-icons'

import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut } from '@/components/ui/command'
import { Input } from '@/components/ui/input'
import { useHotkeys } from '@mantine/hooks'
import { IconBrandOpenai, IconLayoutDashboard, IconSearch } from '@tabler/icons-react'
import { Icons } from '@/config/icons'
import _ from 'lodash'
import { useStore } from '@/store'


export enum CommandType {
	suggestion = 'suggestion',
	settings = 'settings',
}

export interface ICommandItem {
	id: string
	icon: ReactNode
	title?: string
	category: CommandType
	kbd?: string
}

export const commands: ICommandItem[] = [
	{
		id: 'ChatGPT',
		icon: <IconBrandOpenai/>,
		category: CommandType.suggestion,
	},
	{
		id: 'OpenChat',
		icon: <Icons.openchat/>,
		category: CommandType.suggestion,
	},
	{
		id: 'MidJourney',
		icon: <Icons.midjourney/>,
		category: CommandType.suggestion,
	},
	{
		id: 'Dashboard',
		icon: <IconLayoutDashboard/>,
		category: CommandType.settings,
		kbd: '⌘ D',
	},
	{
		id: 'Profile',
		icon: <PersonIcon/>,
		category: CommandType.settings,
		kbd: '⌘ P',
	},
	{
		id: 'System',
		icon: <GearIcon/>,
		category: CommandType.settings,
		kbd: '⇧ ⌘ P',
	},
]

export default function CommandDialogDemo() {
	const [open, setOpen] = React.useState(false)
	const { history, push } = useStore()
	
	const KEY = 'K'
	useHotkeys([
		[`mod+${KEY}`, () => setOpen(!open)],
	])
	
	return (
		<>
			<div className={'w-[256px] | relative flex items-center | text-muted-foreground text-sm'}>
				<IconSearch className={'absolute left-2 wh-5'}/>
				<Input className={'grow'} onFocus={() => setOpen(!open)}/>
				<kbd className="absolute right-2 shrink-0 h-6 p-2 |  pointer-events-none inline-flex select-none items-center gap-1 rounded border bg-muted font-mono font-medium text-muted-foreground opacity-100">
					⌘ {KEY}
				</kbd>
			</div>
			
			<CommandDialog open={open} onOpenChange={setOpen}>
				<CommandInput placeholder="Type a command or search..."/>
				<CommandList className={'max-h-[600px]'}>
					
					<CommandEmpty>No results found.</CommandEmpty>
					
					<CommandGroup heading="History">
						
						<div className={'flex flex-wrap gap-2'}>
							{
								history
									.map((id) => commands.find((command) => command.id === id)!)
									.map((item) => (
										<CommandItem key={item.id} className={'flex items-center gap-2'}>
											{item.icon}
											<span>{item.title ?? item.id}</span>
										</CommandItem>
									))
							}
						</div>
					
					</CommandGroup>
					
					{
						Object.entries(_.groupBy(commands, 'category'))
							.map(([cat, items]) => (
								<Fragment key={cat}>
									<CommandSeparator/>
									<CommandGroup heading={cat} key={cat}>
										{
											items.map((item) => (
												<CommandItem key={item.id} className={'flex items-center gap-2'}
												             onSelect={() => {
													             // ref: https://github.com/pacocoursey/cmdk#nested-items
													             console.log('selected ', item)
													             push(item.id)
												             }}>
													{item.icon}
													<span>{item.title ?? item.id}</span>
												</CommandItem>
											))
										}
									
									</CommandGroup>
								</Fragment>
							))
					}
				
				</CommandList>
			</CommandDialog>
		</>
	)
}
