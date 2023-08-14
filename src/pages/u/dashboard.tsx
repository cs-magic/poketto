import { RootLayout } from '@/layouts/root.layout'
import { UserProfile } from '@/components/user'
import { useUser } from '@/hooks/use-user'
import { useSearchParams } from 'next/navigation'
import { useAppStore } from '@/store'
import { ChannelViewInProfile } from '@/components/channelInProfile.view'

import { ProfileTab } from '@/ds/website'


export default function DashboardPage() {
	const user = useUser()
	const sp = useSearchParams()
	const v = (sp?.get('created') || '') as ProfileTab
	const tab = Object.values(ProfileTab).includes(v) ? v : ProfileTab.used
	
	const { channels } = useAppStore()
	
	return (
		<RootLayout>
			<div className={'w-full h-full p-4 | flex gap-4'}>
				<UserProfile user={user}/>
				
				<div className={'grow | flex flex-col '}>
					{
						tab === ProfileTab.used && (
							channels.map((c) => <ChannelViewInProfile c={c} key={c.poketto.id}/>)
						)
					}
				</div>
			
			</div>
		</RootLayout>
	)
}










