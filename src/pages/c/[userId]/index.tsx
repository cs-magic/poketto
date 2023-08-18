import { RootLayout } from "@/layouts/root.layout"
import { ConversationList } from "@/components/conversations"

export default function ConversationPage() {
  return (
    <RootLayout>
      <div className={"| flex h-full w-full divide-x overflow-hidden"}>
        <section className={"| | relative flex w-full shrink-0 flex-col items-center overflow-hidden md:w-[375px]"}>
          <ConversationList />
        </section>
      </div>
    </RootLayout>
  )
}
