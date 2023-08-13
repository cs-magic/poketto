import { RootLayout } from '@/layouts/root.layout'
import { ArrowRightIcon, PersonIcon } from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { user } from '@/config/user'
import { UsersIcon } from 'lucide-react'
import { ICON_DIMENSION_MD, ICON_DIMENSION_SM } from '@/config/assets'
import { api } from '@/lib/api'
import { AppListView } from '@/components/list.view'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import _ from 'lodash'
import Link from 'next/link'

import { uri } from '@/config/uri'
import { type ReactNode } from 'react'
import { Grow } from '@/components/utils/grow'

export default function WorkspacesPage() {
	const { data: page } = api.poketto.listPoketto.useQuery({})
	const uid = user.id
	
	const WorkspaceItem = ({ wid, title, avatar, icon }: {
		wid: string, title: string, avatar: string, icon: ReactNode
	}) => {
		return (
			<Link href={`/w/${wid}`} className={'w-full p-2'}>
				<Button variant={'ghost'} className={'w-full inline-flex items-center gap-2'}>
					{icon}
					<p>{title}</p>
					<Grow/>
					<Avatar className={ICON_DIMENSION_MD}>
						<AvatarImage src={avatar}/>
					</Avatar>
				</Button>
			</Link>
		)
	}
	
	return (
		<RootLayout>
			<div className={'w-full h-full'}>
				<Card id={'recent'} variant={'ghost'} className={'flex flex-col gap-4'}>
					<CardHeader>
						<CardTitle>
							Recently visited workspaces
						</CardTitle>
					</CardHeader>
					<CardContent className={'w-full | flex flex-col divide-y'}>
						<WorkspaceItem wid={uid} title={'My Workspace'} avatar={user.avatar} icon={<PersonIcon/>}/>
						<WorkspaceItem wid={'team'} title={'Team Workspace'} avatar={user.avatar} icon={<UsersIcon className={ICON_DIMENSION_SM}/>}/>
					</CardContent>
				</Card>
				
				<Card id={'explore'} variant={'ghost'} className={'w-full'}>
					<CardHeader>
						<div className={'shrink-0 | flex justify-between items-end'}>
							<CardTitle>Explore popular Poketto Apps</CardTitle>
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
							{_.range(3).map((i) => <AppListView poketto={page?.data[i]} key={i}/>)}
						</div>
					</CardContent>
				</Card>
			
			</div>
		
		</RootLayout>
	)
}
