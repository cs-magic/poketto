import { type Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { type AppType } from 'next/app'
import { api } from '@/lib/api'
import '@/styles/globals.css'
import React from 'react'
import { ThemeProvider } from 'next-themes'
// import { Toaster } from '@/components/ui/toaster'
import { Toaster } from 'sonner'
import ErrorBoundary from '@/components/error-boundary'

const MyApp: AppType<{ session: Session | null }> =
	({
		 Component,
		 pageProps: { session, ...pageProps },
	 }) => {
		return (
			<ThemeProvider attribute="class" defaultTheme={'dark'}>
				<SessionProvider session={session}>
					<ErrorBoundary>
						<Component {...pageProps} />
					</ErrorBoundary>
					<Toaster/>
				</SessionProvider>
			</ThemeProvider>
		
		)
	}

export default api.withTRPC(MyApp)
