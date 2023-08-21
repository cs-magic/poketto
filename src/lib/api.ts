/**
 * This is the client-side entrypoint for your tRPC API. It is used to create the `api` object which
 * contains the Next.js App-wrapper, as well as your type-safe React Query hooks.
 *
 * We also create a few inference helpers for input and output types.
 */
import { httpBatchLink, loggerLink, TRPCClientError } from "@trpc/client"
import { createTRPCNext } from "@trpc/next"
import { type inferRouterInputs, type inferRouterOutputs, type TRPCError } from "@trpc/server"
import superjson from "superjson"
import { type RootRouter } from "@/server/trpc.router"
import { URI } from "@/config-const"
import { toast } from "sonner"

const getBaseUrl = () => {
  if (typeof window !== "undefined") return "" // browser should use relative url
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}` // SSR should use vercel url
  return `http://localhost:${process.env.PORT ?? 3000}` // dev SSR should use localhost
}

function handleUnauthorizedErrorsOnClient(error: unknown): boolean {
  if (typeof window === "undefined") return false
  if (!(error instanceof TRPCClientError)) return false
  if (error.data?.code !== "UNAUTHORIZED") return false

  console.warn("Redirecting to /sign-in since user is not authorized")
  toast.error("Redirecting to /sign-in since user is not authorized")
  // void Router.push(URI.user.auth.signin) // todo: https://github.com/trpc/trpc/discussions/2036#discussioncomment-4722528
  window.location.href = URI.user.auth.signin

  return true
}

/** A set of type-safe react-query hooks for your tRPC API. */
export const api = createTRPCNext<RootRouter>({
  config() {
    return {
      // react-query config
      queryClientConfig: {
        defaultOptions: {
          queries: {
            // ref: https://tanstack.com/query/v4/docs/react/reference/QueryClient
            // staleTime: Infinity,
            staleTime: 5 * 1000,
            refetchOnWindowFocus: false,
            refetchOnmount: false,
            refetchOnReconnect: false,
            // notifyOnChangeProps: "tracked",

            retry: (failureCount, error) => {
              if (handleUnauthorizedErrorsOnClient(error)) return false
              return failureCount < 0 // ref: https://github.com/trpc/trpc/discussions/2036#discussioncomment-4722528
            },
            // 这里可以获得从 server 拿过来的 error，然后在客户端反馈，因此可以在这里用 toast
            onError: (error) => {
              const errorMessage = `error: ${(error as TRPCError).message}`
              console.log(errorMessage)
              toast.error(errorMessage)
              return error
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
          enabled: (opts) => process.env.NODE_ENV === "development" || (opts.direction === "down" && opts.result instanceof Error),
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
export type RouterInputs = inferRouterInputs<RootRouter>

/**
 * Inference helper for outputs.
 *
 * @example type HelloOutput = RouterOutputs['example']['hello']
 */
export type RouterOutputs = inferRouterOutputs<RootRouter>
