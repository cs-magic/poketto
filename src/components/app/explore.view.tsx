import { api } from "@/lib/api"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { DEFAULT_BATCH_CARDS, URI } from "@/config"
import { Button } from "@/components/ui/button"
import { ArrowRightIcon, SymbolIcon } from "@radix-ui/react-icons"
import _ from "lodash"
import { AppDialogContainer } from "@/components/app/container"
import { AppHorizontalCardView } from "@/components/app/card-horizontal.view"

export const ExploreApps = () => {
  const query = api.app.list.useInfiniteQuery(
    {},
    {
      getNextPageParam: (lastPage, allPages) => lastPage.nextCursor, // 这个必须加
    }
  )
  const apps = query.data?.pages.flatMap((item) => item.items)

  return (
    <Card id={"explore"} variant={"ghost"} className={"w-full grow"}>
      <CardHeader>
        <div className={"| flex shrink-0 items-end justify-between"}>
          <CardTitle>Explore trending apps</CardTitle>
          <Link href={URI.app.explore}>
            <Button variant={"link"} className={"| flex h-fit items-center gap-2 py-0 text-xs"}>
              <span>Explore all</span>
              <ArrowRightIcon />
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent className={"flex w-full justify-between"}>
        <div className={"flex w-full flex-col divide-y"}>
          {!apps ? (
            <SymbolIcon />
          ) : (
            _.sampleSize(_.range(DEFAULT_BATCH_CARDS), 3).map((i) => (
              <AppDialogContainer appId={apps[i]!.id} key={i}>
                <AppHorizontalCardView app={apps[i]} key={i} />
              </AppDialogContainer>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
