/**
 * Copyright (c) CS-Magic, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

import { RootLayout } from "@/layouts/root.layout"

export default function GalleryPage() {
  return <RootLayout>From Poketto Official: 很快就会上线，请再耐心等等吧！</RootLayout>
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  }
}
