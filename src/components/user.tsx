import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Icons } from '@/config/assets'
import numeral from 'numeral'
import { Button } from '@/components/ui/button'
import React from 'react'
import { IconUser } from '@tabler/icons-react'
import { type UserWithRelations } from '@/ds/user'
import { Skeleton } from '@/components/ui/skeleton'
import { Separator } from '@/components/ui/separator'
import { getRobotAvatar } from '@/lib/string'

export const DEFAULT_USRE_NAME = "游客"
export const DEFAULT_USRE_ID = "guest"
export const DEFAULT_USRE_AVATAR = getRobotAvatar(DEFAULT_USRE_ID)

/**
 * todo: next-auth with user profile
 *
 * @param user
 * @return {JSX.Element}
 * @constructor
 */
export const UserProfile = ({ user }: { user?: UserWithRelations }) => {
	
	return (<div className={'w-full md:w-[375px] h-fit overflow-x-hidden overflow-y-auto | p-4 | flex flex-col justify-around gap-4 | rounded-2xl'}>
		
		<Avatar className={'wh-[256px] mx-auto'}>
			<AvatarImage src={user?.image ?? DEFAULT_USRE_AVATAR} className={''}/>
			<AvatarFallback><IconUser/></AvatarFallback>
		</Avatar>
		
		{/* avatar info*/}
		<div className={'flex flex-col  overflow-hidden'}>
			<h2 className={'text-2xl'}>{user?.name ?? DEFAULT_USRE_NAME}</h2>
			<p className={'truncate text-muted-foreground'}>@{user?.id ?? DEFAULT_USRE_ID}</p>
			<p className={'my-2 lines-clamp-2 text-primary-foreground/75'}>{user?.desc ?? 'You haven\'t said anything about yourself ~'}</p>
		</div>
		
		<Button variant={'outline'} disabled={!user}>Edit your profile</Button>
		
		{/*	stat */}
		<div className={'flex items-center justify-around gap-2'}>
			<Button disabled={!user} className={'grow h-fit p-2 flex flex-col items-center gap-2'} variant={'ghost'}>
				<span>关注</span>
				<span>{user?.following.length ?? 0}</span>
			</Button>
			<Separator orientation={'vertical'} className={'h-8'}/>
			<Button disabled={!user} className={'grow h-fit p-2  flex flex-col items-center gap-2'} variant={'ghost'}>
				<span>粉丝</span>
				<span>{user?.followedBy.length ?? 0}</span>
			</Button>
			<Separator orientation={'vertical'} className={'h-8'}/>
			<Button disabled={!user} className={'grow h-fit p-2  flex flex-col items-center gap-2'} variant={'ghost'}>
				<span>影响力</span>
				<span>{user?.impact ?? 0}</span>
			</Button>
			<Separator orientation={'vertical'} className={'h-8'}/>
			<Button disabled={!user} className={'grow h-fit p-2  flex flex-col items-center gap-2'} variant={'ghost'}>
				<span>甜甜圈</span>
				<span>{user?.balance ?? 0}</span>
			</Button>
		</div>
		
		{/*	collections */}
		<div className={'grid grid-cols-2 gap-4'}>
			<Button disabled={!user}>作品</Button>
			<Button disabled={!user}>收藏</Button>
		</div>
	
	</div>)
}
