/**
 * Copyright (c) CS-Magic, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useIntersection } from "@mantine/hooks"
import { FrameIcon } from "@radix-ui/react-icons"
import _ from "lodash"
import Image from "next/image"
import React, { Fragment, useEffect, useState } from "react"
import { Carousel } from "react-responsive-carousel"

import { useAppStore } from "@/store"

import { CAROUSELS } from "@/config"

import type { SortOrder } from "@/ds"
import { CardsLayoutType, sortOrders } from "@/ds"

import { IconContainer } from "@/layouts/navbar"
import { RootLayout } from "@/layouts/root.layout"

import { AppVerticalCardView } from "@/components/app/card-vertical.view"
import { AppDialogContainer } from "@/components/app/container"
import { GridContainer, MasonryContainer, ResponsiveTooltip } from "@/components/containers"
import { Order2icon } from "@/components/icons"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Separator } from "@/components/ui/separator"

import { api } from "@/lib/api"
import clsx from "@/lib/clsx"

export default function ExplorePage() {
  const [sortOrder, setSortOrder] = useState<SortOrder>("mostViewed")
  const { cardsLayout } = useAppStore()
  const Container = cardsLayout === CardsLayoutType.grid ? GridContainer : MasonryContainer

  const query = api.app.list.useInfiniteQuery(
    { sortOrder },
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
        {/* <HomeCarousel/> */}

        {/* title */}
        <div className="| flex w-full items-center gap-2 whitespace-nowrap px-2 ">
          <FrameIcon />
          <span className="text-lg">玩法推荐</span>

          <div className="grow" />
          <div className="flex items-center gap-2">
            {sortOrders.map((order) => {
              const Icon = Order2icon[order]
              return (
                <Fragment key={order}>
                  <Separator orientation="vertical" className="h-4 first:hidden" />

                  <IconContainer className={clsx(sortOrder === order && "text-primary")}>
                    <ResponsiveTooltip
                      content={_.startCase(_.capitalize(order))}
                      onClick={() => {
                        setSortOrder(order)
                      }}
                    >
                      <Icon />
                    </ResponsiveTooltip>
                  </IconContainer>
                </Fragment>
              )
            })}
          </div>
        </div>

        {/* content (carousel - cards) */}

        <Container>
          {apps.map((app) => (
            <AppDialogContainer key={app.id} appId={app.id}>
              <AppVerticalCardView app={app} cardsLayout={cardsLayout} sort={sortOrder} />
            </AppDialogContainer>
          ))}
        </Container>

        {/* load more */}
        {query.hasNextPage === false ? ( // note: 显式指明
          <div className="| | m-auto flex w-80 items-center justify-center bg-destructive p-4 text-center text-destructive-foreground">
            You have loaded ALL the data.
          </div>
        ) : (
          <ScrollTrigger trigger={query.fetchNextPage} />
        )}
      </div>
    </RootLayout>
  )
}

function HomeCarousel() {
  return (
    <Carousel
      className={clsx("mx-auto w-full rounded-2xl md:w-[788px]")}
      showThumbs={false}
      infiniteLoop
      autoPlay
      interval={3000}
      showStatus={false}
      centerMode
      centerSlidePercentage={92}
      stopOnHover={false}
    >
      {CAROUSELS.map((item) => (
        <AspectRatio ratio={2} key={item.title}>
          <Image src={item.src} className="object-cover object-bottom" alt={item.src} fill sizes="w-full rounded-2xl" />
          <p className="legend">{item.title}</p>
        </AspectRatio>
      ))}
    </Carousel>
  )
}

function ScrollTrigger({ trigger }: { trigger: any }) {
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
