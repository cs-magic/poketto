import { type NextRouter } from "next/dist/shared/lib/router/router"
import { type AppContextType, type AppInitialProps, type NextComponentType, type NextPageContext } from "next/dist/shared/lib/utils"

declare global {
  namespace PrismaJson {
    // you can use typical basic types
    type PlatformArgs = object
  }
}

declare module "next" {
  import { type Session } from "next-auth"
  // type AppType<P = { session: Session; auth?: boolean }> = NextComponentType<AppContextType, P, AppPropsType<any, P>>

  // type AppPropsType<Router extends NextRouter = NextRouter, PageProps = {}> = AppInitialProps<PageProps> & {
  //   Component: NextComponentType<NextPageContext, any, { auth?: boolean }>
  //   router: Router
  //   __N_SSG?: boolean
  //   __N_SSP?: boolean
  // }
}
