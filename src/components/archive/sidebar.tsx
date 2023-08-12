import { SelfUserAvatar } from '@/components/user'
import { user } from '@/config/user'
import { LightningBoltIcon } from '@radix-ui/react-icons'
import { Icons } from '@/config/assets'
import { app } from '@/config/app'
import React, { type ReactNode } from 'react'

export const NavGroups = ({ title, children }: {
	title: string
	children: ReactNode
}) =>
	<section id={'side-playground'} className={'flex flex-col gap-2'}>
		<h2 className={'text-sm text-muted-foreground'}>{title}</h2>
		{children}
	</section>
export const UserVsBrand = () => {
	return (
		<section className={'flex flex-col gap-4 text-muted-foreground'}>
			<div className={'w-full | flex items-center gap-2 justify-around'}>
				<div className={'flex flex-col items-center gap-2'}>
					<SelfUserAvatar/>
					<span className={'text-xs'}>{user.name}</span>
				</div>
				<LightningBoltIcon className={'text-primary-foreground'}/>
				<div className={'flex flex-col items-center gap-2'}>
					<Icons.logo className={'!wh-12 bg-background p-2'}/>
					<span className={'text-xs'}>{app.name}</span>
				</div>
			</div>
			
			<div>
				<span className={''}>@ {user.workspace}</span>
			</div>
		
		</section>
	)
}
