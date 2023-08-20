import { RootLayout } from "@/layouts/root.layout"
import clsx from "@/lib/clsx"
import { api } from "@/lib/api"
import { ConversationList } from "@/components/conversations"
import { useRouter } from "next/router"
import { AppDetailView } from "@/components/app/detail.view"
import { ConversationMain } from "@/components/conv/main"

export default function ConversationPage() {
  const router = useRouter()
  const userId = router.query.userId as string
  const appId = router.query.appId as string
  const { data: curConv } = api.conv.get.useQuery(
    {
      conversation: {
        userId,
        appId,
      },
    },
    { enabled: !!(userId && appId) }
  )

  return (
    <RootLayout>
      <div className={clsx("flex h-full w-full", "overflow-hidden")}>
        <section className={"hidden w-full shrink-[.1] lg:flex lg:w-[375px]"}>
          <ConversationList />
        </section>

        <section className={clsx("relative w-full lg:grow", " overflow-hidden")}>
          {curConv && <ConversationMain cid={curConv.id} />}
        </section>

        <section className={clsx("hidden shrink-[.1] xl:flex xl:w-[375px]")}>{curConv && <AppDetailView appId={curConv.appId} />}</section>
      </div>
    </RootLayout>
  )
}
