import { type AppComment } from ".prisma/client"
import { useRouter } from "next/router"
import { useUser } from "@/hooks/use-user"
import { toast } from "sonner"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import clsx from "clsx"
import { Separator } from "@/components/ui/separator"
import numeral from "numeral"
import _ from "lodash"
import { StarFilledIcon, StarIcon } from "@radix-ui/react-icons"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { MarqueeContainer, MasonryContainer } from "@/components/containers"
import { vIsNumber } from "@/lib/number"
import React, { type ReactNode, useCallback, useEffect, useState } from "react"
import ReactMarkdown from "react-markdown"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import d from "@/lib/datetime"
import { ResponsiveField } from "@/components/field"
import { IconThumbDown, IconThumbUp } from "@tabler/icons-react"
import { api } from "@/lib/api"

import { getConversationLink } from "@/lib/string"
import { type AppWithRelation, type IAppComment } from "@/ds"
import { POKETTO_APP_ID, POKETTO_DETAIL_FEATURES_ENABLED, POKETTO_DETAIL_RATINGS_ENABLED } from "@/config"
import { UserIcon } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "./ui/alert-dialog"

export const AppDetail = ({ app, comments, setOpen }: { app: AppWithRelation; comments: AppComment[]; setOpen?: (v: boolean) => void }) => {
  const router = useRouter()
  const utils = api.useContext()

  const { data: conversations = [] } = api.poketto.listConversations.useQuery({})
  const conv = conversations.find((c) => c.appId === app.id)!

  const { mutate: addApp } = api.poketto.addAppIntoConversation.useMutation({
    onSuccess: (data) => {
      void utils.poketto.listConversations.invalidate()
      toast.success(`Successfully added app: ${app.name}`)
      void router.push(getConversationLink(data.id))
      setOpen && setOpen(false)
    },
  })
  const { mutate: delConv, data: delResult } = api.poketto.delConversation.useMutation({
    onSuccess: (input) => {
      void utils.poketto.listConversations.invalidate()
      void router.push(getConversationLink(conversations.find((c) => c.id !== conv.id)!.id))
    },
  })

  return (
    <>
      <section id={"basic"} className={"| flex w-full items-center gap-2"}>
        <Avatar className={"shrink-0 p-4  wh-28"}>
          <AvatarImage src={app.avatar} className={"rounded-2xl"} />
        </Avatar>

        <div className={"| flex grow flex-col gap-2 overflow-hidden"}>
          <div className={"| flex w-full flex-col "}>
            <h2 className={"line-clamp-2"}>{app.name}</h2>
            <p className={"truncate text-primary-foreground/75"}>by {app.creator.name}</p>
          </div>
        </div>
        {!conv && (
          <Badge
            className={clsx("cursor-pointer rounded-3xl px-4 transition-all")}
            onClick={() => {
              addApp({ appId: app.id })
            }}
          >
            Try
          </Badge>
        )}
      </section>

      <Separator orientation={"horizontal"} />

      <section id={"status"} className={clsx("w-full", "flex items-center justify-between gap-1")}>
        <StatusItem a={"category"} b={`${app.categoryMain}-${app.categorySub}`} c={"of All 31"} />
        <StatusItem a={"model"} b={app.model?.type} c={app.creator.name} />
        {POKETTO_DETAIL_RATINGS_ENABLED && (
          <StatusItem
            a={"ratings"}
            b={numeral(app.state?.stars).format("0.0")}
            c={
              <>
                {_.range(Math.floor(app.state?.stars ?? 0)).map((i) => (
                  <StarFilledIcon className={"vh-4 leading-none"} key={i} />
                ))}
                {_.range(5 - Math.floor(app.state?.stars ?? 0)).map((i) => (
                  <StarIcon className={"vh-4 leading-none"} key={i} />
                ))}
              </>
            }
          />
        )}
        <StatusItem a={"language"} b={app.language} c={"Universal"} />
      </section>

      {/*<section id={'user-cases'} className={'w-full shrink-0 overflow-auto | flex gap-4'}>*/}
      {/*	*/}
      {/*	<DeviceContainer ratio={.6} device={isMobile ? 'iphone-14-pro' : 'surface-pro-2017'}>*/}
      {/*		<div className={'w-full flex flex-col'}>*/}
      {/*			<h2>heading 1</h2>*/}
      {/*			<div>hhh</div>*/}
      {/*			<h2>heading 2</h2>*/}
      {/*			<div>hhh2</div>*/}
      {/*		</div>*/}
      {/*	</DeviceContainer>*/}
      {/*</section>*/}

      {/* tags */}
      <section id={"tags"} className={"flex w-full flex-wrap gap-2"}>
        {app.tags.map((tag) => (
          <Badge variant={"secondary"} key={tag.id}>
            {tag.name}
          </Badge>
        ))}
      </section>

      <section id={"desc"} className={"relative flex w-full flex-col"}>
        <CollapsablePara content={app.desc} />
      </section>

      <section id={"ratings-reviews"} className={"flex w-full flex-col gap-4"}>
        <div className={"flex items-center justify-between"}>
          {/* todo: Ratings & */}
          <h2>Reviews</h2>
          {comments.length > 2 && (
            <Dialog>
              <DialogTrigger asChild>
                <Button variant={"ghost"}>See All</Button>
              </DialogTrigger>
              <DialogContent className={"h-[80vh]  max-w-[80vw] overflow-auto"}>
                <h2>All the comments</h2>
                <MasonryContainer>{/*{comments.map((item) => (<PokettoComment comment={item} key={item.id}/>))}*/}</MasonryContainer>
              </DialogContent>
            </Dialog>
          )}
        </div>
        {comments.length === 0 && "No Comments Yet !"}

        {/* todo: rate level */}
        {/*<div className={'grid grid-col-1 md:grid-cols-2 gap-4'}>*/}
        {/*	<div className={'flex items-end justify-between'}>*/}
        {/*		<p className={'flex items-end gap-2'}>*/}
        {/*			<span className={'text-4xl font-bold'}>{numeral(poketto.state.ratedStars).format('0.0')}</span>*/}
        {/*			<span className={'text-sm font-'}>out of 5</span>*/}
        {/*		</p>*/}
        {/*		<span>{numeral(poketto.state.ratedStars).format('0a')} Ratings</span>*/}
        {/*	</div>*/}
        {/*	<Image src={RatingChart} alt={'rating-chart'} width={320} height={40}/>*/}
        {/*</div>*/}
        <div className={"grid gap-2"}>{/*{comments.slice(0, 2).map((item) => (<PokettoComment comment={item} key={item.id}/>))}*/}</div>
      </section>

      <section id={"information"} className={"flex w-full flex-col gap-4"}>
        <h2>Information</h2>
        <div className={"grid grid-cols-2 gap-4"}>
          <InfoItem a={"provider"} b={app.creator.name} />
          <InfoItem a={"Open Source"} b={app.model?.isOpenSource.toString()} />
          <InfoItem a={"category"} b={`${app.categoryMain}-${app.categorySub}`} />
          <InfoItem a={"language"} b={app.language} />
        </div>
        <Separator orientation={"horizontal"} />
        <div className={"grid grid-cols-2 gap-4"}>
          {Object.entries(app.state ?? {})
            .filter(vIsNumber)
            .sort((a, b) => (a[0] < b[0] ? -1 : 1))
            .map(([key, val]) => (
              <InfoItem key={key} a={key} b={val} />
            ))}
        </div>
      </section>

      {POKETTO_DETAIL_FEATURES_ENABLED && (
        <>
          <Separator orientation={"horizontal"} />
          <section id={"collections"} className={"flex w-full flex-col gap-4"}>
            <h2>Featured In</h2>
            <div>TODO</div>
          </section>
        </>
      )}

      {conv && (
        <>
          <Separator orientation={"horizontal"} />
          <section id={"collections"} className={"flex w-full flex-col gap-4"}>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant={"destructive"} disabled={conv.appId === POKETTO_APP_ID}>
                  Clear
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>确定要清除该App下的所有信息吗（包括会话记录）？</AlertDialogHeader>
                <AlertDialogDescription>⚠️该动作将不可撤销，您也将无法恢复所有过往记录</AlertDialogDescription>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    className={"bg-destructive"}
                    onClick={() => {
                      delConv({ id: conv.id })
                      toast.success(`You have deleted one app.`)
                    }}
                  >
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </section>
        </>
      )}
    </>
  )
}

const CollapsablePara = ({ content }: { content: string }) => {
  const [shownMore, setShownMore] = useState(false)
  const [needMore, setNeedMore] = useState(false)

  const ref = useCallback((node: HTMLParagraphElement) => {
    if (!node) return
    setNeedMore(node.scrollHeight > node.offsetHeight)
  }, [])

  return (
    <div className={"flex w-full flex-col"}>
      <article className={clsx("prose dark:prose-invert", !shownMore && "line-clamp-4")} ref={ref}>
        <ReactMarkdown>{content}</ReactMarkdown>
      </article>

      {needMore && ( // todo: better show-more effect with harmonious gradient
        <Button variant={"link"} className={"ml-auto"} onClick={() => setShownMore(!shownMore)}>
          {shownMore ? "Less" : "More"}
        </Button>
      )}
    </div>
  )
}

const StatusItem = ({ a, b, c }: { a: string; b: ReactNode; c: ReactNode }) => {
  return (
    <div className={"| flex w-full flex-col items-center justify-between gap-1 overflow-hidden whitespace-nowrap py-2"}>
      <div className={"font-bold uppercase text-muted-foreground"}>{a}</div>
      <MarqueeContainer className={"text-lg"}>{b}</MarqueeContainer>
      <div className={"flex items-center justify-center text-primary-foreground/50"}>{c}</div>
    </div>
  )
}

const InfoItem = ({ a, b }: { a: string; b: ReactNode }) => {
  return (
    <div className={"flex flex-col items-center gap-1"}>
      <div className={"font-bold capitalize text-muted-foreground"}>{a}</div>
      <div className={"text-primary-foreground/75"}>{b}</div>
    </div>
  )
}

const PokettoComment = ({ comment }: { comment: IAppComment }) => {
  return (
    <Card variant={"default"}>
      <CardHeader>
        {/* todo: title of comment like Apple */}
        {/*<CardTitle>{item.title}</CardTitle>*/}
        <div className={"flex items-center justify-between gap-4 text-primary-foreground/50"}>
          <div className={"flex flex-col items-start gap-2"}>
            <p>{d(comment.updatedAt).fromNow()}</p>
            <p>@{comment.user.name}</p>
          </div>
          <Avatar className={"shrink-0"}>
            <AvatarImage src={comment.user.image ?? ""} />
            <AvatarFallback>
              <UserIcon />
            </AvatarFallback>
          </Avatar>
        </div>
      </CardHeader>
      <CardContent>{comment.content}</CardContent>
      <CardFooter className={"gap-4 text-primary-foreground/50"}>
        <ResponsiveField icon={<IconThumbUp />} title={comment.upvotes.toString()} />
        <ResponsiveField icon={<IconThumbDown />} title={"Not Helpful"} />
      </CardFooter>
    </Card>
  )
}
