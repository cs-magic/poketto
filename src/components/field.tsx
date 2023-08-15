import React, { type HTMLProps, type ReactNode } from 'react'
import { IconEye, IconGitFork } from '@tabler/icons-react'
import { ICON_DIMENSION_SM } from '@/config/assets'
import numeral from 'numeral'
import { clsx } from 'clsx'

export const ResponsiveField = ({
	                                icon, title, titleSm, className, ...props
                                }: {
	icon: ReactNode
	title: string
	titleSm?: string
} & HTMLProps<HTMLDivElement>) => {
	return (
		<div className={clsx('inline-flex items-center gap-1 | hover:text-primary-foreground/75 cursor-pointer', className)} {...props}>
			{icon}
			<span className={'hidden md:block'}> {title}</span>
			<span className={'md:hidden'}>{titleSm}</span>
		</div>
	)
}

export const UsesField = ({ v }: { v: number }) => <ResponsiveField icon={<IconGitFork className={ICON_DIMENSION_SM}/>}
                                                                    title={`${numeral(v).format('0a')} Uses`}
                                                                    titleSm={numeral(v).format('0a')}/>
export const ViewsField = ({ v }: { v: number }) => <ResponsiveField icon={<IconEye className={ICON_DIMENSION_SM}/>}
                                                                     title={`${numeral(v).format('0a')} Views`}
                                                                     titleSm={numeral(v).format('0a')}/>
