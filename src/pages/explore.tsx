import React, { Fragment, useEffect } from "react"
import clsx from "clsx"
import { RootLayout } from "@/layouts/root.layout"
import { api } from "@/lib/api"
import { GridContainer, MasonryContainer } from "@/components/containers"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import _ from "lodash"
import { FrameIcon } from "@radix-ui/react-icons"

import { CardsLayoutType } from "@/store/ui.slice"
import { useAppStore } from "@/store"
import { Carousel } from "react-responsive-carousel"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import Image from "next/image"
import { order2icon } from "@/lib/assets"
import { useIntersection } from "@mantine/hooks"
import { CAROUSELS } from "@/config"
import { sortOrders } from "@/ds"
import { AppDialogContainer } from "@/components/app/container"
import { AppVerticalCardView } from "@/components/app/card-vertical.view"

export default function ExplorePage() {
  const { cardsLayout, sortOrder, setSortOrder } = useAppStore()
  const Container = cardsLayout === CardsLayoutType.grid ? GridContainer : MasonryContainer

  const query = api.app.listApps.useInfiniteQuery(
    {},
    {
      getNextPageParam: (lastPage, allPages) => lastPage.nextCursor, // 这个必须加
    }
  )
  const apps = query.data?.pages.flatMap((item) => item.items) ?? []
  // log.info("[FlowGPT] ", apps)

  return (
    <RootLayout>
      {/* main (content - load more) */}
      <div className={clsx("| flex h-full w-full max-w-[1360px] flex-col gap-4 overflow-auto p-4 lg:p-8")}>
        {/*<HomeCarousel/>*/}

        {/* title */}
        <div className={"| flex w-full items-center gap-2 whitespace-nowrap px-2 "}>
          <FrameIcon />
          <span className={"text-lg"}>玩法推荐</span>

          <div className={"grow"} />
          {/*<span className={'hidden md:block'}>Sort By</span>*/}
          <div className={"flex items-center"}>
            {sortOrders.map((order) => {
              const Icon = order2icon[order]
              return (
                <Fragment key={order}>
                  <Separator orientation={"vertical"} className={"h-4 first:hidden"} />
                  <Button
                    className={"flex items-center gap-1 px-2 hover:bg-transparent"}
                    variant={"ghost"}
                    key={order}
                    onClick={() => {
                      setSortOrder(order)
                    }}
                  >
                    <Icon className={""} />
                    <span className={"hidden lg:block"}>{_.startCase(_.capitalize(order))}</span>
                  </Button>
                </Fragment>
              )
            })}
          </div>
        </div>

        {/* content (carousel - cards)*/}

        <Container>
          {apps.map((app) => (
            <AppDialogContainer key={app.id} appId={app.id}>
              <AppVerticalCardView app={app} cardsLayout={cardsLayout} sort={sortOrder} />
            </AppDialogContainer>
          ))}
        </Container>

        {/* load more*/}
        {query.hasNextPage === false ? ( // note: 显式指明
          <div className={"| | m-auto flex w-80 items-center justify-center bg-destructive p-4 text-center text-destructive-foreground"}>
            You have loaded ALL the data.
          </div>
        ) : (
          <ScrollTrigger trigger={query.fetchNextPage} />
        )}
      </div>
    </RootLayout>
  )
}

const HomeCarousel = () => {
  return (
    <Carousel
      className={clsx("mx-auto w-full rounded-2xl md:w-[788px]")}
      showThumbs={false}
      infiniteLoop
      autoPlay
      interval={3000}
      showStatus={false}
      centerMode={true}
      centerSlidePercentage={92}
      stopOnHover={false}
    >
      {CAROUSELS.map((item) => (
        <AspectRatio ratio={2} key={item.title}>
          <Image src={item.src} className={"object-cover object-bottom"} alt={item.src} fill sizes={"w-full rounded-2xl"} />
          <p className="legend">{item.title}</p>
        </AspectRatio>
      ))}
    </Carousel>
  )
}

const ScrollTrigger = ({ trigger }: { trigger: any }) => {
  const { ref, entry } = useIntersection({ rootMargin: "400px" })

  useEffect(() => {
    if (entry?.isIntersecting) {
      trigger()
    } else {
      // 取消触底（往回拉）
    }
  }, [entry?.isIntersecting])
  return (
    <p
      ref={ref}
      className={clsx("flex-center m-auto shrink-0 rounded-2xl px-16 py-8", " animate-pulse bg-card font-bold text-primary-foreground")}
    >
      {entry?.isIntersecting && "Loading More Data ..."}
    </p>
  )
}
