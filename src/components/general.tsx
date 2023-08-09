import React, { HTMLProps, ReactNode } from 'react'
import { useStore } from '@/store'
import { clsx } from 'clsx'

export const IconTitleLine = ({ icon, title, className, ...props }: {
	icon: ReactNode,
	title: string
} & HTMLProps<HTMLDivElement>) => {
	const { collapsed } = useStore()
	
	return (
		<div className={clsx(
			'px-2 py-2 | flex items-center gap-2 | text-muted-foreground cursor-pointer rounded-lg',
			'hover:bg-muted hover:text-accent-foreground',
			className,
		)} {...props}>
			{icon}
			{!collapsed && title}
		</div>
	)
}
