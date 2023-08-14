import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Icons } from '@/config/assets'
import numeral from 'numeral'
import { Button } from '@/components/ui/button'
import React from 'react'
import { IconUser } from '@tabler/icons-react'
import { type UserWithRelations } from '@/ds/user'
import { Skeleton } from '@/components/ui/skeleton'
import { Separator } from '@/components/ui/separator'

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
	
	return (<div className={'w-full md:w-[375px] h-fit overflow-x-hidden overflow-y-auto | p-4 | flex flex-col justify-around gap-4 | rounded-2xl'}>
		
		<Avatar className={'wh-[256px] mx-auto'}>
			<AvatarImage src={user.image ?? undefined} className={''}/>
			<AvatarFallback><IconUser/></AvatarFallback>
		</Avatar>
		
		{/* avatar info*/}
		<div className={'flex flex-col  overflow-hidden'}>
			<h2 className={'text-2xl'}>{user.name}</h2>
			<p className={'truncate text-muted-foreground'}>@{user.id}</p>
			<p className={'my-2 lines-clamp-2 text-primary-foreground/75'}>{user.desc ?? 'You haven\'t said anything about yourself ~'}</p>
		</div>
		
		<Button variant={'outline'}>Edit your profile</Button>
		
		{/*	stat */}
		<div className={'flex items-center justify-around gap-2'}>
			<div className={'flex flex-col items-center gap-2'}>
				<span>关注</span>
				<span>{user.following.length}</span>
			</div>
			<Separator orientation={'vertical'} className={'h-8'}/>
			<div className={'flex flex-col items-center gap-2'}>
				<span>粉丝</span>
				<span>{user.followedBy.length}</span>
			</div>
			<Separator orientation={'vertical'} className={'h-8'}/>
			<div className={'flex flex-col items-center gap-2'}>
				<span>影响力</span>
				<span>{user.impact}</span>
			</div>
			<Separator orientation={'vertical'} className={'h-8'}/>
			<div className={'flex flex-col items-center gap-2'}>
				<span>甜甜圈</span>
				<span>{user.balance}</span>
			</div>
		</div>
		
		{/*	collections */}
		<div className={'grid grid-cols-2 gap-4'}>
			<Button>作品</Button>
			<Button>收藏</Button>
		</div>
	
	</div>)
}
