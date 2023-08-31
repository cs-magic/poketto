/**
 * Copyright (c) CS-Magic, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

import { ConversationList } from "@/components/conv/list"
import { RootLayout } from "@/components/layouts/root.layout"

export default function ConversationPage() {
  return (
    <RootLayout>
      <ConversationList />
    </RootLayout>
  )
}

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  }
}
