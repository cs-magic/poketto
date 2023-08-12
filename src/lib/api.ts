/**
 * This is the client-side entrypoint for your tRPC API. It is used to create the `api` object which
 * contains the Next.js App-wrapper, as well as your type-safe React Query hooks.
 *
 * We also create a few inference helpers for input and output types.
 */
import { httpBatchLink, loggerLink, TRPCClientError } from '@trpc/client'
import { createTRPCNext } from '@trpc/next'
import { type inferRouterInputs, type inferRouterOutputs } from '@trpc/server'
import superjson from 'superjson'
import { type AppRouter } from 'src/server/api'
import { Router } from 'next/router'

const getBaseUrl = () => {
	if (typeof window !== 'undefined') return '' // browser should use relative url
	if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}` // SSR should use vercel url
	return `http://localhost:${process.env.PORT ?? 3000}` // dev SSR should use localhost
}


function handleUnauthorizedErrorsOnClient(error: unknown): boolean {
	if (typeof window === 'undefined') return false
	if (!(error instanceof TRPCClientError)) return false
	if (error.data?.code !== 'UNAUTHORIZED') return false
	
	console.warn('Redirecting to /sign-in since user is not authorized')
	// Router.push('/sign-in') // todo: https://github.com/trpc/trpc/discussions/2036#discussioncomment-4722528
	
	return true
}

/** A set of type-safe react-query hooks for your tRPC API. */
export const api = createTRPCNext<AppRouter>({
	config() {
		return {
			
			queryClientConfig: {
				defaultOptions: {
					queries: {
						retry: (failureCount, error) => {
							if (handleUnauthorizedErrorsOnClient(error)) return false
							return failureCount < 0 // ref: https://github.com/trpc/trpc/discussions/2036#discussioncomment-4722528
						},
					},
					mutations: {
						retry: (_, error) => {
							handleUnauthorizedErrorsOnClient(error)
							return false
						},
					},
				},
			},
			
			/**
			 * Transformer used for data de-serialization from the server.
			 *
			 * @see https://trpc.io/docs/data-transformers
			 */
			transformer: superjson,
			
			/**
			 * Links used to determine request flow from client to server.
			 *
			 * @see https://trpc.io/docs/links
			 */
			links: [
				loggerLink({
					enabled: (opts) =>
						process.env.NODE_ENV === 'development' ||
						(opts.direction === 'down' && opts.result instanceof Error),
				}),
				httpBatchLink({
					url: `${getBaseUrl()}/api/trpc`,
				}),
			],
		}
	},
	/**
	 * Whether tRPC should await queries when server rendering pages.
	 *
	 * @see https://trpc.io/docs/nextjs#ssr-boolean-default-false
	 */
	ssr: false,
})

/**
 * Inference helper for inputs.
 *
 * @example type HelloInput = RouterInputs['example']['hello']
 */
export type RouterInputs = inferRouterInputs<AppRouter>;

/**
 * Inference helper for outputs.
 *
 * @example type HelloOutput = RouterOutputs['example']['hello']
 */
export type RouterOutputs = inferRouterOutputs<AppRouter>;
