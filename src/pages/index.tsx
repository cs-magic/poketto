import { RootLayout } from '@/layouts/root.layout'
import { ArrowRightIcon, PersonIcon } from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button'
import { UsersIcon } from 'lucide-react'
import { ICON_DIMENSION_SM } from '@/config/assets'
import { api } from '@/lib/api'
import { AppViewInHomePage } from '@/components/list.view'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import _ from 'lodash'
import Link from 'next/link'

import { uri } from '@/config/uri'
import { Grow } from '@/components/utils/grow'

import { SortOrder } from '@/ds/poketto'
import { useUser } from '@/hooks/use-user'

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
				<CardContent className={'w-full | flex flex-col divide-y'}>
					{user?.id ? <Workspaces userId={user.id}/> : 'You have no workspaces currently !'}
				</CardContent>
			</Card>
			
			<ExploreAppInHomePage/>
		
		</div>
	
	</RootLayout>)
}

const Workspaces = ({ userId }: { userId: string }) => {
	const { data: workspaces = [] } = api.poketto.listSpaces.useQuery({ userId })
	return <>
		{workspaces.map((w) => (<Link href={`/w/${w.id}`} className={'w-full p-2'} key={w.id}>
				<Button variant={'ghost'} className={'w-full inline-flex items-center gap-2'}>
					{w.isPrivate ? <PersonIcon/> : <UsersIcon className={ICON_DIMENSION_SM}/>}
					<p>{w.name}</p>
					<Grow/>
					{/*<Avatar className={ICON_DIMENSION_MD}>*/}
					{/*	<AvatarImage src={avatar}/>*/}
					{/*</Avatar>*/}
				</Button>
			</Link>
			// <WorkspaceItem key={w.id} wid={w.id} title={w.name} icon={w.isPrivate ? <PersonIcon/> : <UsersIcon className={ICON_DIMENSION_SM}/>}/>
		))}
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
