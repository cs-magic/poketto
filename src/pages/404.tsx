import { RootLayout } from "@/layouts/root.layout"

import ErrorImg from "@/../public/images/timed-out-error.svg"
import { ExploreApps } from "@/components/app/explore.view"

export default function Custom404() {
  return (
    <RootLayout>
      <div className={"flex h-full w-full flex-col items-center gap-2 overflow-auto"}>
        <h1 className={"mt-8 text-4xl"}>404</h1>
        <p>Poketto Note: You've come to the wilderness of knowledge.</p>

        <ErrorImg className={"shrink-0 wh-[240px] md:wh-[480px]"} />

        <ExploreApps />
      </div>
    </RootLayout>
  )
}
