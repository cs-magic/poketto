import { RootLayout } from "@/layouts/root.layout"

import ErrorImg from "@/../public/images/timed-out-error.svg"
import { ExploreAppsWidget } from "@/components/app/explore.widget"

export default function Custom404() {
  return (
    <RootLayout>
      <div className={"flex h-full w-full flex-col items-center gap-2 overflow-auto"}>
        <h1 className={"mt-8 text-4xl"}>404</h1>
        <p>Poketto Note: You've come to the wilderness of knowledge.</p>

        <ErrorImg width={480} className={"shrink-0 wh-[240px] md:wh-[480px]"} />

        <ExploreAppsWidget />
      </div>
    </RootLayout>
  )
}
