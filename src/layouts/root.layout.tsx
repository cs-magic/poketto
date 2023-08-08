import Head from 'next/head'
import { app } from '@/config/app'
import Sidebar from '@/components/mantine/sidebar'
import { PropsWithChildren } from 'react'


export function RootLayout(props: PropsWithChildren) {
	
	return (
		<>
			<Head>
				<title>{app.name}</title>
				<meta name="description" content={app.desc}/>
				<link rel="icon" href={app.icon}/>
			</Head>
			<main className="h-screen | flex items-center justify-center | bg-gradient-to-b from-[#2e026d] to-[#15162c]">
				
				<Sidebar/>
				
				<div className={'grow'}>
					{props.children}
				</div>
			
			</main>
		</>
	)
}
