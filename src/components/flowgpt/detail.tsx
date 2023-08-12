import { type FlowgptPromptBasic } from '@/ds/flowgpt'
import Image from 'next/image'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import numeral from 'numeral'
import _ from 'lodash'
import { PersonIcon, StarFilledIcon, StarIcon } from '@radix-ui/react-icons'
import { Separator } from '@/components/ui/separator'
import RatingChart from '../../../public/images/rating-chart.png'
import { type ReactNode } from 'react'
import { FlowgptComments } from '@/components/flowgpt/flowgpt-comment'
import { DeviceContainer } from '@/components/utils/devices'
import { useMobile } from '@/hooks/use-device'

export const FlowgptDetail = (
	{
		id,
		
		upvotes,
		ranking,
		rankingForNew,
		comments,
		
		User,
		Tag,
		
		model,
		type,
		
		title,
		description,
		initPrompt,
		
		thumbnailURL,
		language,
		
	}: FlowgptPromptBasic,
) => {
	const rankingStar = Math.floor(ranking)
	const isMobile = useMobile()
	
	const StatusItem = ({ a, b, c }: { a: string, b: ReactNode, c: ReactNode }) => {
		return (
			<div className={'flex flex-col items-center gap-1 shrink-0'}>
				<div className={'uppercase text-muted-foreground font-bold'}>{a}</div>
				<div className={'text-2xl font-semibold text-primary-foreground/75'}>{b}</div>
				<div className={'text-primary-foreground/75'}>{c}</div>
			</div>
		)
	}
	
	const InfoItem = ({ a, b }: { a: string, b: ReactNode }) => {
		return (
			<div className={'flex flex-col items-center gap-1'}>
				<div className={'text-muted-foreground font-bold capitalize'}>{a}</div>
				<div className={'text-primary-foreground/75'}>{b}</div>
			</div>
		)
	}
	
	
	return (
		<div className={'max-w-[1440px] mx-auto h-full overflow-x-hidden overflow-y-auto | flex flex-col gap-4'}>
			
			<section id={'basic'} className={'w-full flex items-center gap-4'}>
				<Avatar className={'wh-32 p-4 shrink-0'}>
					<AvatarImage src={thumbnailURL} className={'rounded-3xl '}/>
				</Avatar>
				
				<div className={'flex flex-col gap-4'}>
					<div className={'overflow-hidden |flex flex-col gap-2'}>
						<h2 className={'truncate'}>{title}</h2>
						<p className={'truncate'}>{User.name}</p>
					</div>
					<Button className={'w-20 rounded-3xl'} size={'thin'}>Get</Button>
				</div>
			</section>
			
			<Separator orientation={'horizontal'}/>
			
			<section id={'status'} className={'w-full overflow-auto | flex shrink-0  items-center justify-between gap-4'}>
				<StatusItem a={'model'} b={language} c={'Chat'}/>
				<Separator orientation={'vertical'} className={'h-1/2'}/>
				<StatusItem a={'ratings'} b={numeral(ranking).format('0.0')} c={<div className={'flex items-center'}>
					{_.range(ranking).map((i) => <StarFilledIcon key={i}/>)}
					{_.range(5 - rankingStar).map((i) => <StarIcon key={i}/>)}
				</div>}/>
				<Separator orientation={'vertical'} className={'h-1/2'}/>
				<StatusItem a={'chart'} b={`No. ${numeral(ranking).format('0.0')}`} c={Tag ? Tag[0]!.name : 'ALL'}/>
				<Separator orientation={'vertical'} className={'h-1/2'}/>
				<StatusItem a={'developer'} b={<PersonIcon className={'wh-8'}/>} c={User.name}/>
				<Separator orientation={'vertical'} className={'h-1/2'}/>
				<StatusItem a={'language'} b={language} c={'Universal'}/>
			</section>
			
			<section id={'user-cases'} className={'w-full shrink-0 overflow-auto | flex gap-4'}>
				
				<DeviceContainer ratio={.6} device={isMobile ? 'iphone-14-pro' : 'surface-pro-2017'}>
					<div className={'w-full flex flex-col'}>
						<h2>heading 1</h2>
						<div>hhh</div>
						<h2>heading 2</h2>
						<div>hhh2</div>
					</div>
				
				</DeviceContainer>
			</section>
			
			<section id={'desc'} className={'w-full flex'}>
				<div className={'line-clamp-4'}>
					{description}
					{/*	todo: add `more` button if clamped */}
				</div>
			</section>
			
			<section id={'ratings-reviews'} className={'w-full flex flex-col gap-4'}>
				<div className={'flex items-center justify-between'}>
					<h2>Ratings & Reviews</h2>
					<Button variant={'ghost'}>See All</Button>
				</div>
				<div className={'grid grid-col-1 md:grid-cols-2 gap-4'}>
					<div className={'flex items-end justify-between'}>
						<p className={'flex items-end gap-2'}>
							<span className={'text-4xl font-bold'}>{numeral(ranking).format('0.0')}</span>
							<span className={'text-sm font-'}>out of 5</span>
						</p>
						<span>{numeral(ranking).format('0a')} Ratings</span>
					</div>
					<Image src={RatingChart} alt={'rating-chart'} width={320} height={40}/>
				</div>
				<FlowgptComments id={id}/>
			</section>
			
			<section id={'information'} className={'w-full flex flex-col gap-4'}>
				<h2>Information</h2>
				<div className={'grid grid-cols-2 gap-4'}>
					<InfoItem a={'provider'} b={User.name}/>
					<InfoItem a={'category'} b={Tag[0] ? Tag[0].name : 'NONE'}/>
					<InfoItem a={'language'} b={language}/>
				</div>
			</section>
			
			
			<Separator orientation={'horizontal'}/>
			<section id={'collections'} className={'w-full flex flex-col gap-4'}>
				<h2>Featured In</h2>
				<div>TODO</div>
			</section>
		</div>
	)
}
