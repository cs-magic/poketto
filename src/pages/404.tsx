import { RootLayout } from "@/layouts/root.layout"

import ErrorImg from "@/../public/images/timed-out-error.svg"

export default function Custom404() {
  return (
    <RootLayout>
      <h1 className={"text-4xl"}>404</h1>
      <p>Poketto Note: You've come to the wilderness of knowledge.</p>

      <ErrorImg className={"wh-[480px]"} />
    </RootLayout>
  )
}
