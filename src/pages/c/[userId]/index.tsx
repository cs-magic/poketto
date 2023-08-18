import { RootLayout } from "@/layouts/root.layout"
import { ConversationList } from "@/components/conversations"

export default function ConversationPage() {
  return (
    <RootLayout>
      <ConversationList />
    </RootLayout>
  )
}
