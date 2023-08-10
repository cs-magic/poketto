import Head from 'next/head'
import { app } from '@/config/app'
import { type PropsWithChildren } from 'react'
import { Sidebar } from '@/components/sidebar'
import { clsx } from 'clsx'
import Navbar from '@/components/navbar'
import localFont from 'next/font/local'


const font = localFont({
	src: [
		{ path: '../../public/fonts/weilaiyinghei/GlowSansSC-Normal-v0.93/GlowSansSC-Normal-Thin.otf', weight: '100', style: 'normal' },
		{ path: '../../public/fonts/weilaiyinghei/GlowSansSC-Normal-v0.93/GlowSansSC-Normal-ExtraLight.otf', weight: '200', style: 'normal' },
		{ path: '../../public/fonts/weilaiyinghei/GlowSansSC-Normal-v0.93/GlowSansSC-Normal-Light.otf', weight: '300', style: 'normal' },
		{ path: '../../public/fonts/weilaiyinghei/GlowSansSC-Normal-v0.93/GlowSansSC-Normal-Regular.otf', weight: '400', style: 'normal' },
		{ path: '../../public/fonts/weilaiyinghei/GlowSansSC-Normal-v0.93/GlowSansSC-Normal-Book.otf', weight: '500', style: 'normal' },
		{ path: '../../public/fonts/weilaiyinghei/GlowSansSC-Normal-v0.93/GlowSansSC-Normal-Medium.otf', weight: '600', style: 'normal' },
		{ path: '../../public/fonts/weilaiyinghei/GlowSansSC-Normal-v0.93/GlowSansSC-Normal-Bold.otf', weight: '700', style: 'normal' },
		{ path: '../../public/fonts/weilaiyinghei/GlowSansSC-Normal-v0.93/GlowSansSC-Normal-ExtraBold.otf', weight: '800', style: 'normal' },
		{ path: '../../public/fonts/weilaiyinghei/GlowSansSC-Normal-v0.93/GlowSansSC-Normal-Heavy.otf', weight: '900', style: 'normal' },
	],
})

export const FontWeightGlowSansSC = ['Thin', 'ExtraLight', 'Light', 'Regular', 'Book', 'Medium', 'Bold', 'ExtraBold', 'Heavy']
export const FontWeightTailwind = ['thin', 'extralight', 'light', 'normal',
                                   'medium', 'semibold', 'bold', 'extrabold', 'black']


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
					
					<div className={'grow h-full | flex items-center justify-center gap-2'}>
						{props.children}
					</div>
				</div>
			
			
			</main>
		</>
	)
}
