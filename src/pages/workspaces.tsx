import { RootLayout } from '@/layouts/root.layout'
import { ArrowRightIcon, ChevronRightIcon, PersonIcon } from '@radix-ui/react-icons'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { user } from '@/config/user'
import { UsersIcon } from 'lucide-react'
import { ICON_DIMENSION_MD, ICON_DIMENSION_SM } from '@/config/assets'

export const Grow = () => <div className={'grow'}/>

export default function WorkspacesPage() {
	return (
		<RootLayout>
			<div className={'w-full h-full | flex flex-col gap-8'}>
				<section id={'recent'} className={'flex flex-col gap-4'}>
					<h2>Recently visited workspaces</h2>
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
				</section>
				
				<section id={'explore'} className={'flex flex-col gap-4'}>
					<div className={'flex justify-between'}>
						<h2>Explore popular Pocket Apps</h2>
						<Button variant={'ghost'} className={'gap-2'}>
							<span>Explore all</span>
							<ArrowRightIcon/>
						</Button>
					</div>
				</section>
			</div>
		
		</RootLayout>
	)
}
