import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { clsx } from 'clsx'
import _ from 'lodash'
import React, { type ReactNode } from 'react'
import { useAppStore } from '@/store'

export const MenuLink = ({ field, icon, link, title }: {
	field: string
	icon?: ReactNode
	link?: string
	title?: string
}) => {
	const { sidebarVisible } = useAppStore()
	
	return (
		<Link href={link ?? `/${field}`} className={'w-full transition-all'}>
			<Button className={clsx('w-full justify-start text-xs tracking-widest gap-2')} variant={'ghost'}>
				{icon}
				{sidebarVisible && <span>{title ?? _.startCase(_.capitalize(field))}</span>}
			</Button>
		</Link>
	)
}
