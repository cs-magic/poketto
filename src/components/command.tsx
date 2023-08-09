'use client'

import * as React from 'react'
import {
	CalendarIcon,
	EnvelopeClosedIcon,
	FaceIcon,
	GearIcon,
	PersonIcon,
	RocketIcon,
} from '@radix-ui/react-icons'

import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
	CommandShortcut,
} from '@/components/ui/command'
import { Input } from '@/components/ui/input'

export default function CommandDialogDemo() {
	const [open, setOpen] = React.useState(false)
	
	React.useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
				e.preventDefault()
				setOpen((open) => !open)
			}
		}
		
		document.addEventListener('keydown', down)
		return () => document.removeEventListener('keydown', down)
	}, [])
	
	return (
		<>
			<div className={'max-w-sm | relative flex items-center '}>
				<Input className={'grow'}/>
				<kbd className="absolute right-2 shrink-0 h-6 p-2 |  pointer-events-none inline-flex select-none items-center gap-1 rounded border bg-muted font-mono font-medium text-muted-foreground opacity-100">
					⌘ K
				</kbd>
			</div>
			<CommandDialog open={open} onOpenChange={setOpen}>
				<CommandInput placeholder="Type a command or search..."/>
				<CommandList>
					<CommandEmpty>No results found.</CommandEmpty>
					<CommandGroup heading="Suggestions">
						<CommandItem>
							<CalendarIcon className="mr-2 h-4 w-4"/>
							<span>Calendar</span>
						</CommandItem>
						<CommandItem>
							<FaceIcon className="mr-2 h-4 w-4"/>
							<span>Search Emoji</span>
						</CommandItem>
						<CommandItem>
							<RocketIcon className="mr-2 h-4 w-4"/>
							<span>Launch</span>
						</CommandItem>
					</CommandGroup>
					<CommandSeparator/>
					<CommandGroup heading="Settings">
						<CommandItem>
							<PersonIcon className="mr-2 h-4 w-4"/>
							<span>Profile</span>
							<CommandShortcut>⌘P</CommandShortcut>
						</CommandItem>
						<CommandItem>
							<EnvelopeClosedIcon className="mr-2 h-4 w-4"/>
							<span>Mail</span>
							<CommandShortcut>⌘B</CommandShortcut>
						</CommandItem>
						<CommandItem>
							<GearIcon className="mr-2 h-4 w-4"/>
							<span>Settings</span>
							<CommandShortcut>⌘S</CommandShortcut>
						</CommandItem>
					</CommandGroup>
				</CommandList>
			</CommandDialog>
		</>
	)
}
