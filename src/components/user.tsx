import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Icons } from '@/config/assets'
import numeral from 'numeral'
import { Button } from '@/components/ui/button'
import React from 'react'
import { IconUser } from '@tabler/icons-react'
import { type UserWithRelations } from '@/ds/user'
import { Skeleton } from '@/components/ui/skeleton'

/**
 * todo: next-auth with user profile
 *
 * @param user
 * @return {JSX.Element}
 * @constructor
 */
export const UserProfile = ({ user }: { user?: UserWithRelations }) => {
	if (!user) return (<div className={'w-72 h-96 bg-card rounded-2xl | p-8 | flex flex-col justify-around gap-2'}>
		{/* avatar info*/}
		<div className={'flex items-center gap-2'}>
			<Skeleton className={'wh-8 rounded-full'}/>
			<div className={'flex flex-col grow overflow-hidden'}>
				<Skeleton/>
			</div>
		</div>
		
		{/* cs coins */}
		<div className={'flex items-center gap-2'}>
			<Icons.csCoin/>
			<Skeleton className={'grow'}/>
		</div>
		
		{/*	stat */}
		<div className={'flex items-center justify-around gap-2'}>
			<Skeleton/>
		</div>
		
		{/*	collections */}
		<div className={'flex items-center justify-around gap-2'}>
			<Button>作品</Button>
			<Button>收藏</Button>
		</div>
	</div>)
	
	return (<div className={'w-72 h-96 bg-card rounded-2xl | p-8 | flex flex-col justify-around gap-2'}>
		{/* avatar info*/}
		<div className={'flex items-center gap-2'}>
			<Avatar>
				<AvatarImage src={user.image ?? undefined}/>
				<AvatarFallback><IconUser/></AvatarFallback>
			</Avatar>
			<div className={'flex flex-col grow overflow-hidden'}>
				<p>{user.name}</p>
				<p className={'truncate'}>{user.desc}</p>
			</div>
		</div>
		
		{/* cs coins */}
		<div className={'flex items-center gap-2'}>
			<Icons.csCoin/>
			{numeral(user.balance).format('0a')} CS 币
			<Button className={'ml-auto'}>充值</Button>
		</div>
		
		{/*	stat */}
		<div className={'flex items-center justify-around gap-2'}>
			<div className={'flex flex-col items-center gap-2'}>
				<span>关注</span>
				<span>{user.following.length}</span>
			</div>
			<div className={'flex flex-col items-center gap-2'}>
				<span>粉丝</span>
				<span>{user.followedBy.length}</span>
			</div>
			<div className={'flex flex-col items-center gap-2'}>
				<span>影响力</span>
				<span>{user.impact}</span>
			</div>
		</div>
		
		{/*	collections */}
		<div className={'flex items-center justify-around gap-2'}>
			<Button>作品</Button>
			<Button>收藏</Button>
		</div>
	</div>)
}
