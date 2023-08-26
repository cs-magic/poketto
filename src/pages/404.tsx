/**
 * Copyright (c) CS-Magic, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { RootLayout } from "@/layouts/root.layout"

import { Icons } from "@/components/icons"

export default function Custom404() {
  return (
    <RootLayout>
      <div className="flex h-full w-full flex-col items-center gap-2 overflow-auto">
        <h1 className="mt-8 text-4xl">404</h1>
        <p>{"Poketto Note: You've come to the wilderness of knowledge."}</p>

        <Icons.Error width={480} className="shrink-0 wh-[240px] md:wh-[480px]" />
      </div>
    </RootLayout>
  )
}
