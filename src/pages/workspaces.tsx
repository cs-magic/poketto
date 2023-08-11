import { RootLayout } from '@/layouts/root.layout'
import { ArrowRightIcon, PersonIcon } from '@radix-ui/react-icons'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { user } from '@/config/user'
import { UsersIcon } from 'lucide-react'
import { ICON_DIMENSION_MD, ICON_DIMENSION_SM } from '@/config/assets'
import { api } from '@/lib/api'
import { SortOrder } from '@/ds/flowgpt'
import { Skeleton } from '@/components/ui/skeleton'
import { PocketListView } from '@/components/pocket/pocket.list.view'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import _ from 'lodash'
import Link from 'next/link'

import { uri } from '@/config/uri'

export const Grow = () => <div className={'grow'}/>

export default function WorkspacesPage() {
	const { data: page } = api.flowgpt.listPrompts.useQuery({ order: SortOrder.recommended })
	
	return (
		<RootLayout>
			<div className={'w-full h-full'}>
				<Card id={'recent'} variant={'ghost'} className={'flex flex-col gap-4'}>
					<CardHeader>
						<CardTitle>
							Recently visited workspaces
						</CardTitle>
					</CardHeader>
					<CardContent className={'w-full | flex flex-col gap-1'}>
						<Button variant={'ghost'} className={'inline-flex items-center gap-2'}>
							<PersonIcon/>
							<p>My Workspace</p>
							<Grow/>
							<Avatar className={ICON_DIMENSION_MD}>
								<AvatarImage src={user.avatar}/>
							</Avatar>
						</Button>
						<Separator orientation={'horizontal'}/>
						<Button variant={'ghost'} className={'inline-flex items-center gap-2'}>
							<UsersIcon className={ICON_DIMENSION_SM}/>
							<span>Team Workspace</span>
							<Grow/>
							<Avatar className={ICON_DIMENSION_MD}>
								<AvatarImage src={user.avatar}/>
							</Avatar>
						</Button>
					</CardContent>
				</Card>
				
				<Card id={'explore'} variant={'ghost'} className={'w-full'}>
					<CardHeader>
						<div className={'shrink-0 | flex justify-between items-end'}>
							<CardTitle>Explore popular Pocket Apps</CardTitle>
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
							{_.range(3).map((i) => <PocketListView props={page?.data[i]} key={i}/>)}
						</div>
					</CardContent>
				</Card>
			
			</div>
		
		</RootLayout>
	)
}
