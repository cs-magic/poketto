import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import numeral from 'numeral'
import _ from 'lodash'
import { StarFilledIcon, StarIcon } from '@radix-ui/react-icons'
import { Separator } from '@/components/ui/separator'
import { type ReactNode } from 'react'
import { PokettoComment } from '@/components/pokettoComment'
import clsx from 'clsx'
import { CollapsablePara } from '@/components/utils/collapsable-para'
import { type IPokettoBasic, type IPokettoComment } from '@/ds/poketto'
import { POKETTO_DETAIL_FEATURES_ENABLED, POKETTO_DETAIL_RATINGS_ENABLED } from '@/config/system'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { MarqueeContainer, MasonryContainer } from '@/components/utils/containers'
import { useAppStore } from '@/store'
import { createChannel, getChannelUri } from '@/lib/poketto'
import { toast } from '@/components/ui/use-toast'
import { useRouter } from 'next/router'
import { POKETTO_CHANNEL_ID } from '@/config/poketto'
import { useWindowScroll } from '@mantine/hooks'

export const ChannelDetail = ({ poketto, comments }: { poketto: IPokettoBasic, comments: IPokettoComment[] }) => {
	const { addChannel, channels, delChannel } = useAppStore()
	const router = useRouter()
	const hasGot = Boolean(channels.find((c) => c.poketto.id === poketto.id))
	const [scroll, scrollTo] = useWindowScroll()
	
	const onAddChannel = () => {
		addChannel(createChannel(poketto))
		void router.push(getChannelUri(poketto.id))
		toast({ title: `Successfully added channel: ${poketto.basic.title}` })
	}
	
	const onDelChannel = () => {
		delChannel(poketto.id)
		const nextChannel = channels.find((c) => c.poketto.id !== poketto.id)
		void router.push(getChannelUri(nextChannel!.poketto.id))
		scrollTo({ y: 0 })
	}
	
	return (
		<section id={'poketto-channel-detail'} className={clsx(
			'w-full md:w-[375px] shrink-0 overflow-x-hidden',
			'h-full overflow-y-auto p-4 gap-4',
			'flex flex-col ',
		)}>
			
			<section id={'basic'} className={'w-full | flex items-center gap-2'}>
				<Avatar className={'wh-28 p-4  shrink-0'}>
					<AvatarImage src={poketto.basic.avatar} className={'rounded-2xl'}/>
				</Avatar>
				
				<div className={'grow overflow-hidden | flex flex-col gap-2'}>
					<div className={'w-full | flex flex-col '}>
						<h2 className={'line-clamp-2'}>{poketto.basic.title}</h2>
						<p className={'truncate text-primary-foreground/75'}>by {poketto.model.manufacturer}</p>
					</div>
				</div>
				{
					<Button
						disabled={hasGot}
						variant={hasGot ? 'default' : 'destructive'}
						className={clsx(
							'w-20 | rounded-3xl transition-all',
						)}
						size={'thin'}
						onClick={onAddChannel}>
						{hasGot ? 'Got' : 'Get'}
					</Button>
				}
			</section>
			
			<Separator orientation={'horizontal'}/>
			
			<section id={'status'} className={clsx(
				'w-full',
				'flex items-center justify-between gap-1',
			)}>
				<StatusItem a={'category'} b={poketto.basic.category[0]} c={'of All 31'}/>
				<StatusItem a={'model'} b={poketto.model.type} c={poketto.model.manufacturer}/>
				{
					POKETTO_DETAIL_RATINGS_ENABLED && (
						<StatusItem a={'ratings'} b={numeral(poketto.state.ratedStars).format('0.0')} c={<>
							{_.range(Math.floor(poketto.state.ratedStars)).map((i) => <StarFilledIcon className={'vh-4 leading-none'} key={i}/>)}
							{_.range(5 - Math.floor(poketto.state.ratedStars)).map((i) => <StarIcon className={'vh-4 leading-none'} key={i}/>)}
						</>}/>
					)
				}
				<StatusItem a={'language'} b={poketto.basic.language} c={'Universal'}/>
			</section>
			
			{/*<section id={'user-cases'} className={'w-full shrink-0 overflow-auto | flex gap-4'}>*/}
			{/*	*/}
			{/*	<DeviceContainer ratio={.6} device={isMobile ? 'iphone-14-pro' : 'surface-pro-2017'}>*/}
			{/*		<div className={'w-full flex flex-col'}>*/}
			{/*			<h2>heading 1</h2>*/}
			{/*			<div>hhh</div>*/}
			{/*			<h2>heading 2</h2>*/}
			{/*			<div>hhh2</div>*/}
			{/*		</div>*/}
			{/*	</DeviceContainer>*/}
			{/*</section>*/}
			
			{/* tags */}
			<section id={'tags'} className={'w-full flex flex-wrap gap-2'}>
				{poketto.basic.tags.map((tag) => <Badge key={tag}>{tag}</Badge>)}
			</section>
			
			<section id={'desc'} className={'relative w-full flex flex-col'}>
				<CollapsablePara content={poketto.basic.desc}/>
			</section>
			
			<section id={'ratings-reviews'} className={'w-full flex flex-col gap-4'}>
				<div className={'flex items-center justify-between'}>
					{/* todo: Ratings & */}
					<h2>Reviews</h2>
					{
						comments.length > 2 && (
							<Dialog>
								<DialogTrigger asChild>
									<Button variant={'ghost'}>See All</Button>
								</DialogTrigger>
								<DialogContent className={'max-w-[80vw]  h-[80vh] overflow-auto'}>
									<h2>All the comments</h2>
									<MasonryContainer>
										{comments.map((item) => (
											<PokettoComment comment={item} key={item.id}/>
										))}
									</MasonryContainer>
								</DialogContent>
							</Dialog>
						)
					}
				</div>
				{comments.length === 0 && 'No Comments Yet !'}
				
				{/* todo: rate level */}
				{/*<div className={'grid grid-col-1 md:grid-cols-2 gap-4'}>*/}
				{/*	<div className={'flex items-end justify-between'}>*/}
				{/*		<p className={'flex items-end gap-2'}>*/}
				{/*			<span className={'text-4xl font-bold'}>{numeral(poketto.state.ratedStars).format('0.0')}</span>*/}
				{/*			<span className={'text-sm font-'}>out of 5</span>*/}
				{/*		</p>*/}
				{/*		<span>{numeral(poketto.state.ratedStars).format('0a')} Ratings</span>*/}
				{/*	</div>*/}
				{/*	<Image src={RatingChart} alt={'rating-chart'} width={320} height={40}/>*/}
				{/*</div>*/}
				<div className={'grid gap-2'}>
					{comments.slice(0, 2).map((item) => (
						<PokettoComment comment={item} key={item.id}/>
					))}
				</div>
			</section>
			
			
			<section id={'information'} className={'w-full flex flex-col gap-4'}>
				<h2>Information</h2>
				<div className={'grid grid-cols-2 gap-4'}>
					<InfoItem a={'provider'} b={poketto.model.manufacturer}/>
					<InfoItem a={'Open Source'} b={poketto.permissions.openSource.toString()}/>
					<InfoItem a={'category'} b={poketto.basic.category[0] ?? 'No Category'}/>
					<InfoItem a={'language'} b={poketto.basic.language}/>
				</div>
				<Separator orientation={'horizontal'}/>
				<div className={'grid grid-cols-2 gap-4'}>
					{Object.entries(poketto.state)
						.sort((a, b) => a[0] < b[0] ? -1 : 1)
						.map(([key, val]) => (
							<InfoItem key={key} a={key} b={val}/>
						))}
				</div>
			</section>
			
			
			{POKETTO_DETAIL_FEATURES_ENABLED && (
				<>
					<Separator orientation={'horizontal'}/>
					<section id={'collections'} className={'w-full flex flex-col gap-4'}>
						<h2>Featured In</h2>
						<div>TODO</div>
					</section>
				</>
			)}
			
			{
				hasGot && (
					<section id={'management'} className={'w-full flex flex-col gap-4'}>
						<h2>Management</h2>
						<Button variant={'destructive'} disabled={poketto.id === POKETTO_CHANNEL_ID} onClick={onDelChannel}>Uninstall</Button>
					</section>
				)
			}
		
		</section>
	)
}


const StatusItem = ({ a, b, c }: { a: string, b: ReactNode, c: ReactNode }) => {
	return (
		<div className={'w-full overflow-hidden whitespace-nowrap py-2 | flex flex-col items-center justify-between gap-1'}>
			<div className={'uppercase text-muted-foreground font-bold'}>{a}</div>
			<MarqueeContainer className={'text-lg'}>{b}</MarqueeContainer>
			<div className={'flex justify-center items-center text-primary-foreground/50'}>{c}</div>
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
