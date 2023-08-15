import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { clsx } from 'clsx'
import _ from 'lodash'
import React, { type ReactNode } from 'react'
import { useAppStore } from '@/store'
import { useRouter } from 'next/router'
import { useUser } from '@/hooks/use-user'
import { toast } from 'sonner'

export const MenuLink = ({ field, icon, link, title }: {
	field: string
	icon?: ReactNode
	link?: string
	title?: string
}) => {
	const { sidebarVisible } = useAppStore()
	const router = useRouter()
	const user = useUser()
	
	return (
		<Button
			onClick={() => {
				// if (!user) return toast.error('该功能需要登录才能使用')
				void router.push(link ?? `/${field}`)
			}}
			className={clsx('w-full transition-all justify-start text-xs tracking-widest gap-2')}
			variant={'ghost'}>
			{icon}
			{sidebarVisible && <span>{title ?? _.startCase(_.capitalize(field))}</span>}
		</Button>
	)
}
