import { RootLayout } from '@/layouts/root.layout'
import { UserProfile } from '@/components/user'
import { useUser } from '@/hooks/use-user'
import { useSearchParams } from 'next/navigation'
import { useAppStore } from '@/store'
import { AppViewInDashboard } from '@/components/appInProfile.view'

import { ProfileTab } from '@/ds/website'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ChevronDownIcon, Pencil2Icon } from '@radix-ui/react-icons'


export default function DashboardPage() {
	const user = useUser()
	const sp = useSearchParams()
	const v = (sp?.get('created') || '') as ProfileTab
	const tab = Object.values(ProfileTab).includes(v) ? v : ProfileTab.used
	
	const { apps } = useAppStore()
	
	return (
		<RootLayout>
			<div className={'w-full h-full p-4 | flex gap-4'}>
				<UserProfile user={user}/>
				
				<div className={'grow | flex flex-col '}>
					
					<div className={'flex gap-2 items-center my-4 h-8'}>
						<Input className={'grow h-full'} placeholder={'Find an app...'}/>
						<Button className={'h-full gap-2'}>Category <ChevronDownIcon/></Button>
						<Button className={'h-full gap-2'}>Language <ChevronDownIcon/></Button>
						<Button className={'h-full gap-2'}>Sort <ChevronDownIcon/></Button>
						<Button className={'h-full gap-2 bg-green-700'}><Pencil2Icon/> New</Button>
					</div>
					
					{
						tab === ProfileTab.used && (
							apps.map((c) => <AppViewInDashboard c={c} key={c.poketto.id}/>)
						)
					}
				</div>
			
			</div>
		</RootLayout>
	)
}










