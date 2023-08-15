import { type AppWithRelation, type IAppComment } from '@/ds/poketto'
import { type AppComment } from '.prisma/client'
import { useAppStore } from '@/store'
import { useRouter } from 'next/router'
import { useWindowScroll } from '@mantine/hooks'
import { useUser } from '@/hooks/use-user'
import { toast } from 'sonner'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import clsx from 'clsx'
import { Separator } from '@/components/ui/separator'
import { POKETTO_DETAIL_FEATURES_ENABLED, POKETTO_DETAIL_RATINGS_ENABLED } from '@/config/system'
import numeral from 'numeral'
import _ from 'lodash'
import { StarFilledIcon, StarIcon } from '@radix-ui/react-icons'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { MarqueeContainer, MasonryContainer } from '@/components/containers'
import { vIsNumber } from '@/lib/number'
import React, { type ReactNode, useCallback, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import d from '@/lib/datetime'
import { ResponsiveField } from '@/components/field'
import { IconThumbDown, IconThumbUp } from '@tabler/icons-react'
import { api } from '@/lib/api'
import { getAppLink } from '@/lib/poketto'

export const AppDetail = ({ app, comments }: {
	app: AppWithRelation, comments: AppComment[]
}) => {
	const router = useRouter()
	const [scroll, scrollTo] = useWindowScroll()
	const user = useUser()
	
	const addApp = api.poketto.addAppIntoConversation.useMutation()
	
	const onAddApp = () => {
		if (!user) return toast.error('您需要先登陆才能加入该频道，否则我们无法为您保存这些记录 :(')
		addApp.mutate({ appId: app.id })
		// todo: mutate result
		toast.success(`Successfully added app: ${app.name}`)
		void router.push(getAppLink(app.id))
	}
	
	return (<>
		<section id={'basic'} className={'w-full | flex items-center gap-2'}>
			<Avatar className={'wh-28 p-4  shrink-0'}>
				<AvatarImage src={app.avatar} className={'rounded-2xl'}/>
			</Avatar>
			
			<div className={'grow overflow-hidden | flex flex-col gap-2'}>
				<div className={'w-full | flex flex-col '}>
					<h2 className={'line-clamp-2'}>{app.name}</h2>
					<p className={'truncate text-primary-foreground/75'}>by {app.creator.name}</p>
				</div>
			</div>
			{
				<Badge
					className={clsx('px-4 rounded-3xl transition-all cursor-pointer')}
					onClick={onAddApp}>
					Try
				</Badge>
			}
		</section>
		
		<Separator orientation={'horizontal'}/>
		
		<section id={'status'} className={clsx('w-full', 'flex items-center justify-between gap-1')}>
			<StatusItem a={'category'} b={app.categoryId} c={'of All 31'}/>
			<StatusItem a={'model'} b={app.model?.type} c={app.creator.name}/>
			{POKETTO_DETAIL_RATINGS_ENABLED && (<StatusItem a={'ratings'} b={numeral(app.state?.stars).format('0.0')} c={<>
				{_.range(Math.floor(app.state?.stars ?? 0)).map((i) => <StarFilledIcon className={'vh-4 leading-none'} key={i}/>)}
				{_.range(5 - Math.floor(app.state?.stars ?? 0)).map((i) => <StarIcon className={'vh-4 leading-none'} key={i}/>)}
			</>}/>)}
			<StatusItem a={'language'} b={app.language} c={'Universal'}/>
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
			{app.tags.map((tag) => <Badge variant={'secondary'} key={tag.id}>{tag.name}</Badge>)}
		</section>
		
		<section id={'desc'} className={'relative w-full flex flex-col'}>
			<CollapsablePara content={app.desc}/>
		</section>
		
		<section id={'ratings-reviews'} className={'w-full flex flex-col gap-4'}>
			<div className={'flex items-center justify-between'}>
				{/* todo: Ratings & */}
				<h2>Reviews</h2>
				{comments.length > 2 && (<Dialog>
					<DialogTrigger asChild>
						<Button variant={'ghost'}>See All</Button>
					</DialogTrigger>
					<DialogContent className={'max-w-[80vw]  h-[80vh] overflow-auto'}>
						<h2>All the comments</h2>
						<MasonryContainer>
							{/*{comments.map((item) => (<PokettoComment comment={item} key={item.id}/>))}*/}
						</MasonryContainer>
					</DialogContent>
				</Dialog>)}
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
				{/*{comments.slice(0, 2).map((item) => (<PokettoComment comment={item} key={item.id}/>))}*/}
			</div>
		</section>
		
		
		<section id={'information'} className={'w-full flex flex-col gap-4'}>
			<h2>Information</h2>
			<div className={'grid grid-cols-2 gap-4'}>
				<InfoItem a={'provider'} b={app.creator.name}/>
				<InfoItem a={'Open Source'} b={app.model?.isOpenSource.toString()}/>
				<InfoItem a={'category'} b={app.categoryId}/>
				<InfoItem a={'language'} b={app.language}/>
			</div>
			<Separator orientation={'horizontal'}/>
			<div className={'grid grid-cols-2 gap-4'}>
				{Object.entries(app.state ?? {})
					.filter((vIsNumber))
					.sort((a, b) => a[0] < b[0] ? -1 : 1)
					.map(([key, val]) => (<InfoItem key={key} a={key} b={val}/>))}
			</div>
		</section>
		
		{POKETTO_DETAIL_FEATURES_ENABLED && (<>
			<Separator orientation={'horizontal'}/>
			<section id={'collections'} className={'w-full flex flex-col gap-4'}>
				<h2>Featured In</h2>
				<div>TODO</div>
			</section>
		</>)}
	</>)
}


const CollapsablePara = ({ content }: {
	content: string
}) => {
	const [shownMore, setShownMore] = useState(false)
	const [needMore, setNeedMore] = useState(false)
	
	const ref = useCallback((node: HTMLParagraphElement) => {
		if (!node) return
		setNeedMore(node.scrollHeight > node.offsetHeight)
	}, [])
	
	
	return (<div className={'w-full flex flex-col'}>
		<article className={clsx('prose dark:prose-invert', !shownMore && 'line-clamp-4')} ref={ref}>
			<ReactMarkdown>
				{content}
			</ReactMarkdown>
		</article>
		
		{needMore && (// todo: better show-more effect with harmonious gradient
			<Button variant={'link'} className={'ml-auto'} onClick={() => setShownMore(!shownMore)}>
				{shownMore ? 'Less' : 'More'}
			</Button>)}
	</div>)
}


const StatusItem = ({ a, b, c }: {
	a: string, b: ReactNode, c: ReactNode
}) => {
	return (<div className={'w-full overflow-hidden whitespace-nowrap py-2 | flex flex-col items-center justify-between gap-1'}>
		<div className={'uppercase text-muted-foreground font-bold'}>{a}</div>
		<MarqueeContainer className={'text-lg'}>{b}</MarqueeContainer>
		<div className={'flex justify-center items-center text-primary-foreground/50'}>{c}</div>
	</div>)
}

const InfoItem = ({ a, b }: {
	a: string, b: ReactNode
}) => {
	return (<div className={'flex flex-col items-center gap-1'}>
		<div className={'text-muted-foreground font-bold capitalize'}>{a}</div>
		<div className={'text-primary-foreground/75'}>{b}</div>
	</div>)
}


const PokettoComment = ({
	                        comment,
                        }: {
	comment: IAppComment
}) => {
	
	return (<Card variant={'default'}>
		<CardHeader>
			{/* todo: title of comment like Apple */}
			{/*<CardTitle>{item.title}</CardTitle>*/}
			<div className={'flex items-center justify-between gap-4 text-primary-foreground/50'}>
				<div className={'flex flex-col gap-2 items-start'}>
					<p>{d(comment.updatedAt).fromNow()}</p>
					<p>@{comment.user.name}</p>
				</div>
				<Avatar className={'shrink-0'}>
					<AvatarImage src={comment.user.avatar}/>
				</Avatar>
			</div>
		</CardHeader>
		<CardContent>
			{comment.content}
		</CardContent>
		<CardFooter className={'gap-4 text-primary-foreground/50'}>
			<ResponsiveField icon={<IconThumbUp/>} title={comment.upvotes.toString()}/>
			<ResponsiveField icon={<IconThumbDown/>} title={'Not Helpful'}/>
		</CardFooter>
	</Card>)
}

