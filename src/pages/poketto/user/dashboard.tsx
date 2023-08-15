import { RootLayout } from '@/layouts/root.layout'
import { useUser } from '@/hooks/use-user'
import { useSearchParams } from 'next/navigation'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ChevronDownIcon, Pencil2Icon, StarIcon } from '@radix-ui/react-icons'
import { api } from '@/lib/api'
import React, { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import dayjs from 'dayjs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { IconUser } from '@tabler/icons-react'
import { Separator } from '@/components/ui/separator'
import { type AppWithRelation, UserAppRelationType, type UserWithRelations } from '@/ds'
import { DEFAULT_USER_AVATAR, DEFAULT_USER_ID, DEFAULT_USER_NAME, POKETTO_CREATOR_ID, POKETTO_CREATOR_NAME } from '@/config'


export default function DashboardPage() {
	const user = useUser()
	const sp = useSearchParams()
	const v = (sp?.get('tab') || '') as UserAppRelationType
	const tab = Object.values(UserAppRelationType).includes(v) ? v : UserAppRelationType.used
	const [relationType, setRelationType] = useState<UserAppRelationType>(tab)
	
	return (<RootLayout>
		<div className={'w-full h-full p-4 | flex gap-4'}>
			<UserProfile user={user}/>
			
			<div className={'grow | flex flex-col '}>
				{user && (<AppsView userId={user.id} relationType={relationType}/>)}
			</div>
		
		</div>
	</RootLayout>)
}

const AppsView = ({ userId, relationType }: {
	userId: string,
	relationType: UserAppRelationType
}) => {
	
	const { data: apps = [] } = api.poketto.listConversations.useQuery({ userId: uid, relationType })
	return (<>
		<div className={'flex gap-2 items-center my-4 h-8'}>
			<Input className={'grow h-full'} placeholder={'Find an app...'}/>
			<Button className={'h-full gap-2'}>Category <ChevronDownIcon/></Button>
			<Button className={'h-full gap-2'}>Language <ChevronDownIcon/></Button>
			<Button className={'h-full gap-2'}>Sort <ChevronDownIcon/></Button>
			<Button className={'h-full gap-2 bg-green-700'}><Pencil2Icon/> New</Button>
		</div>
		
		{relationType === UserAppRelationType.used && (apps.map((c) => <AppViewInDashboard c={c} key={c.id}/>))}
	</>)
}


const AppViewInDashboard = ({ c }: {
	c: AppWithRelation
}) => {
	
	return (<div className={'w-full p-4 | flex justify-between gap-4 | border-y'} key={c.id}>
		<div className={'flex flex-col gap-2'}>
			<div className={'flex gap-2 items-center'}>
				<h2>{c.name}</h2>
				{c.creatorId === POKETTO_CREATOR_ID && <Badge className={'bg-blue-500'}>{POKETTO_CREATOR_NAME}</Badge>}
				<Badge variant={'outline'}>{c.model!.isOpenSource ? 'Open Source' : 'Close Source'}</Badge>
			</div>
			<div className={'text-muted-foreground'}>
				{c.desc}
			</div>
			<div className={'flex gap-4 items-center | text-muted-foreground'}>
				<div className={'inline-flex gap-2 items-center'}>
					<div className={'wh-3 rounded-full bg-blue-500'}/>
					<span>{c.categoryId}</span>
				</div>
				<span>Updated {dayjs(c.updatedAt).fromNow()}</span>
			</div>
		</div>
		
		<div className={'flex flex-col gap-2'}>
			<Button variant={'outline'} size={'sm'} className={'gap-2 h-8'}>
				<StarIcon/>
				<span>Star</span>
				{/*<Separator orientation={'vertical'}/>*/}
				{/*<ChevronDownIcon/>*/}
			</Button>
		</div>
	
	</div>)
}


const UserProfile = ({ user }: {
	user?: UserWithRelations
}) => {
	
	return (<div className={'w-full md:w-[375px] h-fit overflow-x-hidden overflow-y-auto | p-4 | flex flex-col justify-around gap-4 | rounded-2xl'}>
		
		<Avatar className={'wh-[256px] mx-auto'}>
			<AvatarImage src={user?.image ?? DEFAULT_USER_AVATAR} className={''}/>
			<AvatarFallback><IconUser/></AvatarFallback>
		</Avatar>
		
		{/* avatar info*/}
		<div className={'flex flex-col  overflow-hidden'}>
			<h2 className={'text-2xl'}>{user?.name ?? DEFAULT_USER_NAME}</h2>
			<p className={'truncate text-muted-foreground'}>@{user?.id ?? DEFAULT_USER_ID}</p>
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


