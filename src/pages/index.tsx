import { RootLayout } from '@/layouts/root.layout'
import { ArrowRightIcon, PersonIcon } from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button'
import { UserIcon } from 'lucide-react'
import { ICON_DIMENSION_MD } from '@/config/assets'
import { api } from '@/lib/api'
import { AppViewInHomePage } from '@/components/list.view'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import _ from 'lodash'
import Link from 'next/link'

import { uri } from '@/config/uri'
import { Grow } from '@/components/utils/grow'

import { SortOrder } from '@/ds/poketto'
import { useUser } from '@/hooks/use-user'
import log from '@/lib/log'
import { Fragment } from 'react'
import { type Space, type User } from '.prisma/client'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getConversationLink, getSpaceLink } from '@/lib/string'
import { signIn } from 'next-auth/react'
import { todo } from '@/lib/helpers'
import { UserAppRelationType } from '@/ds/website'

export default function WorkspacesPage() {
	const user = useUser()
	
	return (<RootLayout>
		<div className={'w-full h-full'}>
			<Card id={'recent'} variant={'ghost'} className={'flex flex-col gap-4'}>
				<CardHeader>
					<CardTitle>
						Recently visited workspaces
					</CardTitle>
				</CardHeader>
				<CardContent className={'w-full | flex flex-col'}>
					{user ? <Spaces user={user}/> :
						<p className={'text-muted-foreground'}>
							<Button variant={'link'} onClick={() => void signIn()}>登录</Button>后就能拥有专属工作区哦！
						</p>}
				</CardContent>
			</Card>
			
			<ExploreAppInHomePage/>
		
		</div>
	
	</RootLayout>)
}

const SpaceLink = ({ s, user }: {
	s: Space,
	user: User
}) => {
	const { data: convs = [] } = api.poketto.listConversations.useQuery({ spaceId: s.id, relationType: UserAppRelationType.used })
	return (
		<Link key={s.id} href={getConversationLink(s.id, convs[0]?.id ?? '')} className={'w-full p-2'}>
			<Button variant={'ghost'} className={'w-full inline-flex items-center gap-2'}>
				<PersonIcon/>
				<p>{s.name}</p>
				<Grow/>
				<Avatar className={ICON_DIMENSION_MD}>
					<AvatarImage src={user.image ?? undefined}/>
					<AvatarFallback><UserIcon/></AvatarFallback>
				</Avatar>
			</Button>
		</Link>
	)
}

const Spaces = ({ user }: {
	user: User
}) => {
	const { data: spaces = [] } = api.poketto.listSpaces.useQuery({ userId: user.id })
	log.info('spaces: ', spaces)
	return <>
		<h2>Personal Space</h2>
		<div className={'flex flex-col divide-y'}>
			{spaces.filter((s) => s.isPrivate).map((s) =>
				<SpaceLink s={s} user={user} key={s.id}/>)}
		</div>
		
		<h2>Team Spaces <span className={'text-sm text-muted-foreground'}>({spaces.filter((s) => !s.isPrivate).length})</span></h2>
		
		<div className={'flex flex-col divide-y'}>
			{
				spaces.filter((s) => !s.isPrivate).length === 0 && (
					<div className={'text-muted-foreground'}>
						You haven't one team space now, don't you wanna
						<Button onClick={todo} variant={'link'}>join one</Button> ?
					</div>
				)
			}
			{spaces.filter((s) => !s.isPrivate).map((s) => (
				<Link key={s.id} href={getSpaceLink(s.id)} className={'w-full p-2'}>
					<Button variant={'ghost'} className={'w-full inline-flex items-center gap-2'}>
						<PersonIcon/>
						<p>{s.name}</p>
						<Grow/>
						<Avatar className={ICON_DIMENSION_MD}>
							<AvatarImage src={user.image ?? undefined}/>
							<AvatarFallback><UserIcon/></AvatarFallback>
						</Avatar>
					</Button>
				</Link>
			))}
		</div>
	</>
}

const ExploreAppInHomePage = () => {
	const { data: page } = api.flowgpt.listPoketto.useQuery({ sort: SortOrder.trending })
	
	return (<Card id={'explore'} variant={'ghost'} className={'w-full'}>
		<CardHeader>
			<div className={'shrink-0 | flex justify-between items-end'}>
				<CardTitle>Explore Trending Poketto Apps</CardTitle>
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
				{_.sampleSize(_.range(30), 3).map((i) => <AppViewInHomePage app={page?.data[i]} key={i}/>)}
			</div>
		</CardContent>
	</Card>)
}
