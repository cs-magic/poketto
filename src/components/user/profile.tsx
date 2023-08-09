import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { user } from '@/config/app'
import { Icons } from '@/config/icons'
import numeral from 'numeral'
import { Button } from '@/components/ui/button'
import React from 'react'

export const UserProfile = () => {
	return (
		<div className={'w-72 h-96 bg-card rounded-2xl | p-8 | flex flex-col justify-around gap-2'}>
			{/* avatar info*/}
			<div className={'flex items-center gap-2'}>
				<Avatar>
					<AvatarImage src={user.avatar}/>
				</Avatar>
				<div className={'flex flex-col  overflow-hidden'}>
					<p>{user.name}</p>
					<p className={'truncate'}>{user.desc}</p>
				</div>
			</div>
			
			{/* cs coins */}
			<div className={'flex items-center gap-2'}>
				<Icons.csCoin/>
				{numeral(user.balance.current).format('0a')} CS 币
				<Button className={'ml-auto'}>充值</Button>
			</div>
			
			{/*	stat */}
			<div className={'flex items-center justify-around gap-2'}>
				<div className={'flex flex-col items-center gap-2'}>
					<span>关注</span>
					<span>{user.social.following}</span>
				</div>
				<div className={'flex flex-col items-center gap-2'}>
					<span>粉丝</span>
					<span>{user.social.followers}</span>
				</div>
				<div className={'flex flex-col items-center gap-2'}>
					<span>影响力</span>
					<span>{user.social.impact}</span>
				</div>
			</div>
			
			{/*	collections */}
			<div className={'flex items-center justify-around gap-2'}>
				<Button>作品</Button>
				<Button>收藏</Button>
			</div>
		</div>
	)
}
