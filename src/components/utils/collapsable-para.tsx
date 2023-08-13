import { useCallback, useState } from 'react'
import clsx from 'clsx'
import { Button } from '@/components/ui/button'
import ReactMarkdown from 'react-markdown'
import { useAppStore } from '@/store'

export const CollapsablePara = ({ content }: { content: string }) => {
	const { pokettoBasic } = useAppStore()
	const [shownMore, setShownMore] = useState(false)
	const [needMore, setNeedMore] = useState(false)
	
	const ref = useCallback((node: HTMLParagraphElement) => {
		if (!node) return
		setNeedMore(node.scrollHeight > node.offsetHeight)
	}, [pokettoBasic.id])
	
	
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
			
			{needMore && (
				// todo: better show-more effect with harmonious gradient
				<Button variant={'link'} className={'ml-auto'} onClick={() => setShownMore(!shownMore)}>
					{shownMore ? 'Less' : 'More'}
				</Button>
			)}
		</div>
	)
}
