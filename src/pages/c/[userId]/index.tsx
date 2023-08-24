/**
 * Copyright (c) CS-Magic, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { RootLayout } from "@/layouts/root.layout"
import { ConversationList } from "@/components/conversations"

export default function ConversationPage() {
  return (
    <RootLayout>
      <ConversationList />
    </RootLayout>
  )
}
