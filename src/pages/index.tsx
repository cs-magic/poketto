import { RootLayout } from '@/layouts/root.layout'
import { ArrowRightIcon } from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button'
import { api } from '@/lib/api'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import _ from 'lodash'
import Link from 'next/link'

import { uri } from '@/config/uri'

import { type AppWithRelation, SortOrder } from '@/ds/poketto'
import { useUser } from '@/hooks/use-user'
import React, { Fragment } from 'react'
import { type User } from '.prisma/client'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { todo } from '@/lib/helpers'
import { Skeleton } from '@/components/ui/skeleton'
import { getAppLink } from '@/lib/poketto'
import dayjs from 'dayjs'
import { UsesField, ViewsField } from '@/components/field'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import { AppCardView } from '@/components/app-card-view'
import { CardsLayoutType } from '@/store/ui.slice'

export default function WorkspacesPage() {
	const user = useUser()
	const router = useRouter()
	
	return (<RootLayout>
		<div className={'w-full h-full'}>
			
			<Card id={'recent-apps'} variant={'ghost'} className={'w-full'}>
				<CardHeader>
					<div className={'shrink-0 | flex justify-between items-end'}>
						<CardTitle>Recently used apps</CardTitle>
						<Button variant={'link'} className={'py-0 h-fit | flex items-center gap-2 text-xs'} onClick={() => {
							if (!user) return void signIn()
							todo()
						}}>
							<span>See all</span>
							<ArrowRightIcon/>
						</Button>
					</div>
				</CardHeader>
				<CardContent className={'w-full flex overflow-auto gap-2'}>
					{user ? <RecentConversations user={user}/> : (
						<div>
							<Button variant={'link'} onClick={() => void signIn()}>登录</Button>后才能查看最近使用的 App 哦！
						</div>
					)}
				</CardContent>
			</Card>
			
			<ExploreApps/>
		
		</div>
	
	</RootLayout>)
}


const RecentConversations = ({ user }: {
	user: User
}) => {
	const { data: conversations = [] } = api.poketto.listConversations.useQuery({ userId: user.id })
	return (
		<>
			{conversations.map((c) => {
				return (
					<div className={'w-48'} key={c.id}>
						<AppCardView app={c.app} cardsLayout={CardsLayoutType.grid} sort={SortOrder.new} key={c.id}/>
					</div>
				)
			})}
		</>
	)
}

const ExploreApps = () => {
	const { data: page } = api.flowgpt.listPoketto.useQuery({ sort: SortOrder.trending })
	
	return (
		<Card id={'explore'} variant={'ghost'} className={'w-full'}>
			<CardHeader>
				<div className={'shrink-0 | flex justify-between items-end'}>
					<CardTitle>Explore trending apps</CardTitle>
					<Link href={uri.app.explore}>
						<Button variant={'link'} className={'py-0 h-fit | flex items-center gap-2 text-xs'}>
							<span>Explore all</span>
							<ArrowRightIcon/>
						</Button>
					</Link>
				</div>
			</CardHeader>
			<CardContent className={'w-full flex justify-between'}>
				<div className={'w-full flex flex-col divide-y'}>
					{_.sampleSize(_.range(30), 3).map((i) => <AppView app={page?.data[i]} key={i}/>)}
				</div>
			</CardContent>
		</Card>
	)
}

const AppView = ({ app }: {
	app: AppWithRelation | undefined
}) => {
	if (!app) return (<div className={'w-full pt-6 pb-3 | flex gap-8 text-muted-foreground'}>
		<Skeleton className={'wh-12'}/>
		
		<div className={'flex flex-col gap-2 grow'}>
			<Skeleton className={'h-4'}/>
			<Skeleton className={'h-8'}/>
			<Skeleton className={'h-4'}/>
		</div>
		
		<div className={'inline-flex gap-2 shrink-0'}>
			<Skeleton className={'w-40 h-8'}/>
		</div>
	</div>)
	
	return (<Link className={'w-full p-3 pt-6 | flex gap-8 text-muted-foreground | hocus:bg-accent cursor-pointer'} href={getAppLink(app.id)}>
		<Avatar className={'rounded-sm'}>
			<AvatarImage src={app.avatar}/>
		</Avatar>
		
		<div className={'flex flex-col gap-2 grow'}>
			<p className={'text-primary-foreground font-semibold'}>{app.name}</p>
			<p className={'line-clamp-2 text-primary-foreground/75'}>{app.desc}</p>
			
			<div className={'inline-flex gap-4'}>
				<p>By {app.name}</p>
				<p>Updated on {dayjs(app.updatedAt).format('DD MMM, YYYY')}</p>
			</div>
		</div>
		
		<div className={'inline-flex gap-2 shrink-0'}>
			<UsesField v={app.state?.calls ?? 0}/>
			<ViewsField v={app.state?.views ?? 0}/>
		</div>
	</Link>)
}
