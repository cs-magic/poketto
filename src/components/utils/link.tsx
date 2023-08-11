import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { clsx } from 'clsx'
import _ from 'lodash'
import React from 'react'

export const MenuLink = ({ field, link, title }: {
	field: string
	link?: string
	title?: string
}) => {
	return (
		<Link href={link ?? `/${field}`} className={'w-full'}>
			<Button className={clsx('w-full justify-start text-xs tracking-widest')} variant={'ghost'}>
				{title ?? _.startCase(_.capitalize(field))}
			</Button>
		</Link>
	)
}
