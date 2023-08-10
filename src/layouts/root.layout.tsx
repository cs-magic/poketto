import Head from 'next/head'
import { app } from '@/config/app'
import React, { type PropsWithChildren } from 'react'
import { Sidebar } from '@/components/sidebar'
import Navbar from '@/components/navbar'
import { clsx } from 'clsx'
import { font } from '@/config/assets'


export function RootLayout(props: PropsWithChildren) {
	
	return (
		<>
			<Head>
				<title>{app.name}</title>
				<meta name="description" content={app.desc}/>
				<link rel="icon" href={app.icon}/>
			</Head>
			
			<main className={clsx('h-screen | flex flex-col | font-light text-foreground bg-background text-sm', font.className)}>
				
				<Navbar/>
				
				<div className={'grow overflow-hidden | flex divide-x'}>
					<Sidebar/>
					
					<div className={'grow overflow-hidden h-full px-8 py-4 | flex items-center justify-center gap-2'}>
						{props.children}
					</div>
				</div>
			</main>
		
		</>
	)
}
