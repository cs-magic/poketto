import { useCallback, useState } from 'react'
import clsx from 'clsx'
import { Button } from '@/components/ui/button'
import ReactMarkdown from 'react-markdown'

export const CollapsablePara = ({ content }: { content: string }) => {
	const [shownMore, setShownMore] = useState(false)
	const [needMore, setNeedMore] = useState(false)
	
	const ref = useCallback((node: HTMLParagraphElement) => {
		if (!node) return
		setNeedMore(node.scrollHeight > node.clientHeight)
	}, [])
	
	
	return (
		<div className={'w-full flex flex-col'}>
			<article className={clsx(
				'prose dark:prose-invert',
				!shownMore && 'line-clamp-4',
			)} ref={ref}>
				<ReactMarkdown>
					{content}
				</ReactMarkdown>
			</article>
			
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
