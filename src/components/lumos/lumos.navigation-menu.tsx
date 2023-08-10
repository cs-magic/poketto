import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import Link from 'next/link'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { IconArrowRight, IconUser, IconUsersGroup } from '@tabler/icons-react'
import { Separator } from '@/components/ui/separator'
import { useFocusTrap } from '@mantine/hooks'
import { ICON_DIMENSION_LG, ICON_DIMENSION_SM } from '@/config/assets'
import { clsx } from 'clsx'
import { ArrowRightIcon } from '@radix-ui/react-icons'


export const LumosNavigationMenu = () => {
	const ref = useRef<HTMLButtonElement>(null)
	useEffect(() => {
		console.log(ref.current)
		if (ref.current?.dataset.state === 'closed') {
			ref.current?.click()
		}
	}, [ref])
	
	return (
		<NavigationMenu>
			<NavigationMenuList>
				
				<NavigationMenuItem>
					<Link href={'/'} legacyBehavior passHref>
						<NavigationMenuLink className={navigationMenuTriggerStyle()}>
							Home
						</NavigationMenuLink>
					</Link>
				</NavigationMenuItem>
				
				{/* todo: trigger style not work as expected */}
				<NavigationMenuItem>
					<NavigationMenuTrigger ref={ref}>Workspaces</NavigationMenuTrigger>
					<NavigationMenuContent>
						<div className={'w-[400px] h-[400px] pt-4 overflow-auto | flex flex-col gap-4'}>
							
							<section className={'container flex items-center whitespace-nowrap justify-between gap-2'}>
								<Input placeholder={'Search Workspaces'}/>
								<Button>Create workspace</Button>
							</section>
							
							<section className={'container flex flex-col gap-2'}>
								<h2 className={'text-muted-foreground'}>Recently visited</h2>
								<Button variant={'ghost'} className={'inline-flex items-center gap-2 justify-start pl-4'}><IconUser/> My Workspace</Button>
								<Button variant={'ghost'} className={'inline-flex items-center gap-2 justify-start pl-4'}><IconUsersGroup/>Team Workspace</Button>
							</section>
							
							<section className={'container flex flex-col gap-2'}>
								<h2 className={'text-muted-foreground'}>More workspaces</h2>
								<Button className={'justify-start pl-4'} variant={'ghost'}>No workspaces found</Button>
							</section>
							
							<div className={'grow'}/>
							<div className={'container py-2 | inline-flex items-center gap-2 | border-t  text-foreground/90 text-lg'}>
								<span>View all workspaces </span>
								<IconArrowRight className={'wh-5'}/>
								<ArrowRightIcon className={'wh-5'}/>
							</div>
						</div>
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
	
	)
}
