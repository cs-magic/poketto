import Head from 'next/head'
import { app } from '@/config/app'
import React, { type PropsWithChildren } from 'react'
import { Sidebar } from '@/components/layout/sidebar'
import Navbar from '@/components/layout/navbar'
import { clsx } from 'clsx'
import { font } from '@/config/assets'
import { useMount } from '@/hooks/use-mount'


export function RootLayout(props: PropsWithChildren) {
	
	const mounted = useMount()
	
	return (
		<>
			<Head>
				<title>{app.name}</title>
				<meta name="description" content={app.desc}/>
				<link rel="icon" href={app.icon}/>
			</Head>
			
			<main className={clsx(
				'w-screen h-screen | flex flex-col | font-light text-foreground text-sm',
				'bg-background',
				// 'bg-zinc-900',
				font.className,
			)}>
				<Navbar/>
				{
					!mounted
						? <div className={'w-full grow | flex justify-center items-center'}>Loading...</div> // !IMPORTANT: avoid persistence ssr
						: <div className={'grow overflow-hidden | flex divide-x'}>
							<Sidebar/>
							<div className={'grow overflow-hidden h-full | flex flex-col items-center justify-center gap-2'}>
								{props.children}
							</div>
						</div>
				}
			</main>
		</>
	)
}
