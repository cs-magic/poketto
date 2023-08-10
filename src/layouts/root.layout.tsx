import Head from 'next/head'
import { app } from '@/config/app'
import { type PropsWithChildren } from 'react'
import { Sidebar } from '@/components/sidebar'
import { clsx } from 'clsx'
import Navbar from '@/components/navbar'
import { font } from '@/config/assets'


export function RootLayout(props: PropsWithChildren) {
	
	return (
		<>
			<Head>
				<title>{app.name}</title>
				<meta name="description" content={app.desc}/>
				<link rel="icon" href={app.icon}/>
			</Head>
			<main className={clsx(
				// todo: allow font weight/source adjustment in settings
				'h-screen | flex flex-col | font-light text-foreground bg-background text-sm',
				font.className,
				// "| bg-gradient-to-b from-[#2e026d] to-[#15162c]"
			)}>
				
				<Navbar/>
				
				<div className={'grow overflow-hidden | flex divide-x'}>
					<Sidebar/>
					
					<div className={'grow h-full p-4 | flex items-center justify-center gap-2'}>
						{props.children}
					</div>
				</div>
			
			
			</main>
		</>
	)
}
