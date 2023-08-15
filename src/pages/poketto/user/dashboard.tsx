import { RootLayout } from '@/layouts/root.layout'
import { UserProfile } from '@/components/user'
import { useUser } from '@/hooks/use-user'
import { useSearchParams } from 'next/navigation'
import { useAppStore } from '@/store'
import { AppViewInDashboard } from '@/components/appInProfile.view'

import { UserAppRelationType } from '@/ds/website'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ChevronDownIcon, Pencil2Icon } from '@radix-ui/react-icons'
import { api } from '@/lib/api'
import { useState } from 'react'


export default function DashboardPage() {
	const user = useUser()
	const sp = useSearchParams()
	const v = (sp?.get('tab') || '') as UserAppRelationType
	const tab = Object.values(UserAppRelationType).includes(v) ? v : UserAppRelationType.used
	const [relationType, setRelationType] = useState<UserAppRelationType>(tab)
	
	return (
		<RootLayout>
			<div className={'w-full h-full p-4 | flex gap-4'}>
				<UserProfile user={user}/>
				
				<div className={'grow | flex flex-col '}>
					{user && (
						<AppsView userId={user.id} relationType={relationType}/>
					)}
				</div>
			
			</div>
		</RootLayout>
	)
}

const AppsView = ({ userId, relationType }: {
	userId: string,
	relationType: UserAppRelationType
}) => {
	
	const { data: apps = [] } = api.poketto.listConversations.useQuery({ userId, relationType })
	return (
		<>
			<div className={'flex gap-2 items-center my-4 h-8'}>
				<Input className={'grow h-full'} placeholder={'Find an app...'}/>
				<Button className={'h-full gap-2'}>Category <ChevronDownIcon/></Button>
				<Button className={'h-full gap-2'}>Language <ChevronDownIcon/></Button>
				<Button className={'h-full gap-2'}>Sort <ChevronDownIcon/></Button>
				<Button className={'h-full gap-2 bg-green-700'}><Pencil2Icon/> New</Button>
			</div>
			
			{
				relationType === UserAppRelationType.used && (
					apps.map((c) => <AppViewInDashboard c={c} key={c.id}/>)
				)
			}
		</>
	)
}








