import superjson from "superjson"
import { appInclude, type AppWithRelation } from "@/ds"
import { RootLayout } from "@/layouts/root.layout"
import clsx from "clsx"
import { AppDetail } from "@/components/app-detail-view"
import { type GetServerSideProps } from "next"
import { prisma } from "@/server/db"

export default function ConversationPage({ appStr }: { appStr: string }) {
  const app = superjson.parse<AppWithRelation>(appStr)

  return (
    <RootLayout>
      <div className={"| flex h-full w-full divide-x overflow-hidden"}>
        <section
          className={clsx(" w-full shrink-[.1] overflow-x-hidden md:w-[375px] lg:flex", "h-full gap-4 overflow-y-auto p-4", "flex-col ")}
        >
          <AppDetail app={app} comments={app.comments} />
        </section>
      </div>
    </RootLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const appId = ctx.query.appId as string

  const app = await prisma.app.findUniqueOrThrow({
    where: { id: appId },
    include: appInclude,
  })
  if (!app) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    }
  }

  return {
    props: {
      appStr: superjson.stringify(app),
    },
  }
}
