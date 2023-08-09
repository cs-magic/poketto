import Head from 'next/head'
import { app } from '@/config/app'
import { type PropsWithChildren } from 'react'
import { Sidebar } from '@/layouts/sidebar'
import { clsx } from 'clsx'
import Navbar from '@/layouts/navbar'


export function RootLayout(props: PropsWithChildren) {
	
	return (
		<>
			<Head>
				<title>{app.name}</title>
				<meta name="description" content={app.desc}/>
				<link rel="icon" href={app.icon}/>
			</Head>
			<main className={clsx(
				'h-screen | flex flex-col ',
				// "| bg-gradient-to-b from-[#2e026d] to-[#15162c]"
			)}>
				
				<Navbar/>
				
				<div className={'grow overflow-hidden py-2 | flex divide-x'}>
					<Sidebar/>
					
					<div className={'grow h-full | flex items-center justify-center gap-2'}>
						{props.children}
					</div>
				</div>
			
			
			</main>
		</>
	)
}
