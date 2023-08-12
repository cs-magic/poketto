import { useCallback, useState } from 'react'
import clsx from 'clsx'
import { Button } from '@/components/ui/button'

export const CollapsablePara = ({ content }: { content: string }) => {
	const [shownMore, setShownMore] = useState(false)
	const [needMore, setNeedMore] = useState(false)
	
	const ref = useCallback((node: HTMLParagraphElement) => {
		if (!node) return
		setNeedMore(node.scrollHeight > node.clientHeight)
	}, [])
	
	
	return (
		<div className={'w-full flex flex-col'}>
			<p className={clsx(
				!shownMore && 'line-clamp-4',
			)} ref={ref}>
				{content}
			</p>
			
			{!shownMore && needMore && (
				<Button
					onClick={() => setShownMore(true)}
					variant={'link'}
					className={'h-0 pl-6 show-more absolute right-1 bottom-0'}>More</Button>
			)}
			
			{shownMore && <Button variant={'link'} className={'ml-auto'} onClick={() => setShownMore(false)}>Less</Button>}
		</div>
	)
}
