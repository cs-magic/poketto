import Head from 'next/head'
import { app } from '@/config/app'
import React, { type PropsWithChildren, useEffect } from 'react'
import { Sidebar } from '@/components/layout/sidebar'
import Navbar from '@/components/layout/navbar'
import { clsx } from 'clsx'
import { font } from '@/config/assets'
import { useMount } from '@/hooks/use-mount'
import { useStore } from '@/store'
import { api } from '@/lib/api'


export function RootLayout(props: PropsWithChildren) {
	
	// !IMPORTANT: avoid persistence ssr
	const mounted = useMount()
	
	// !IMPORTANT: (force state direction) always change [only ID] in sub pages/components, and trigger prompt update in root layout when id changes
	const { pokettoId: id, setPokettoBasic, setPokettoComments } = useStore()
	const { data: withConversation } = api.poketto.getPoketto.useQuery({ id })
	const { data: comments } = api.poketto.listComments.useQuery({ id })
	
	console.log({ comments })
	
	useEffect(() => {
		if (withConversation) // 防止闪烁
			setPokettoBasic(withConversation)
	}, [withConversation])
	
	useEffect(() => {
		if (comments)  // 防止闪烁
			setPokettoComments(comments)
	}, [comments])
	
	return (
		<>
			<Head>
				<title>{app.name}</title>
				<meta name="description" content={app.desc}/>
				<link rel="icon" href={app.icon}/>
			</Head>
			
			<main className={clsx(
				'h-screen | flex flex-col | font-light text-foreground bg-background text-sm',
				font.className,
			)}>
				
				<Navbar/>
				
				<div className={'grow overflow-hidden | flex divide-x'}>
					<Sidebar/>
					
					<div className={'grow overflow-hidden h-full | flex flex-col items-center justify-center gap-2'}>
						{!mounted ? 'Loading...' : props.children}
					</div>
				</div>
			</main>
		
		</>
	)
}
