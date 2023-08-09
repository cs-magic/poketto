import clsx from 'clsx'
import { Skeleton } from '@/components/ui/skeleton'
import dayjs from 'dayjs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { IconThumbUp } from '@tabler/icons-react'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { type IFlowgptComment } from '@/ds/flowgpt'
import { getShortName } from '@/utils/string'
import { Button } from '@/components/ui/button'

export const Comment = ({ data }: { data: IFlowgptComment | undefined }) => {
	return (
		
		<Card className={clsx(
			'w-full text-muted-foreground text-sm bg-transparent border-0 not-last:border-b-2 rounded-none pr-2',
		)}>
			
			<CardHeader className={'flex flex-row items-center justify-between px-0 py-2'}>
				<div className={'inline-flex-center gap-2 '}>
					
					<Avatar className={'w-7 h-7'}>
						<AvatarImage src={data?.user.image}/>
						<AvatarFallback>{getShortName(data?.user.name ?? '佚名')}</AvatarFallback>
					</Avatar>
					{data?.user.name ?? <Skeleton className={'w-full'}/>}
				</div>
				
				<span>{dayjs(data?.createdAt).format('YYYY-MM-DD')}</span>
			</CardHeader>
			
			<CardContent className={'px-0 py-2'}>
				{data?.body}
			</CardContent>
			
			<CardFooter className={'inline-flex items-center whitespace-nowrap space-x-1 p-0'}>
				<IconThumbUp size={16}/>
				({data?.upvotes})
				
				<Button variant={'ghost'} size={'sm'}>回复</Button>
			</CardFooter>
		</Card>
	
	)
}
