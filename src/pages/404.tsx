/**
 * Copyright (c) CS-Magic, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

import { ErrorIcon } from "@/components/icons"
import { RootLayout } from "@/components/layouts/root.layout"

export default function Custom404() {
  return (
    <RootLayout>
      <div className="flex h-full w-full flex-col items-center gap-2 overflow-auto">
        <h1 className="mt-8 text-4xl">404</h1>
        <p>{"Poketto Note: You've come to the wilderness of knowledge."}</p>

        <ErrorIcon width={480} className="shrink-0 wh-[240px] md:wh-[480px]" />
      </div>
    </RootLayout>
  )
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  }
}
