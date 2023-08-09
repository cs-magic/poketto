import React, { type HTMLProps, type ReactNode } from 'react'
import { useStore } from '@/store'
import { clsx } from 'clsx'
import Link from 'next/link'

export const IconTitleLine = ({ icon, title, href, className, ...props }: {
	icon: ReactNode,
	title: string
	href: string
} & HTMLProps<HTMLAnchorElement>) => {
	const { collapsed } = useStore()
	
	return (
		<Link
			href={href}
			className={clsx(
				'px-2 py-2 | flex items-center gap-2 | text-muted-foreground cursor-pointer rounded-lg',
				'hover:bg-muted hover:text-accent-foreground',
				className,
			)} {...props}>
			{icon}
			{!collapsed && title}
		</Link>
	)
}
