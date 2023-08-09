import { clsx } from 'clsx'
import React, { useEffect } from 'react'
import { useIntersection } from '@mantine/hooks'

export const ScrollTrigger = ({ trigger }: {
	trigger: any
}) => {
	const { ref, entry } = useIntersection({ rootMargin: '400px' })
	
	useEffect(() => {
		if (entry?.isIntersecting) {
			trigger()
		} else {
			// 取消触底（往回拉）
		}
	}, [entry?.isIntersecting])
	return (
		<p
			ref={ref}
			className={clsx(
				'm-auto px-16 py-8 rounded-2xl flex-center shrink-0',
				' text-primary-foreground bg-card font-bold  animate-pulse',
			)}>
			{entry?.isIntersecting && 'Loading More Data ...'}
		</p>
	)
}
