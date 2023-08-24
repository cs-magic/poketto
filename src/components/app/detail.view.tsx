/**
 * Copyright (c) CS-Magic, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { type ReactNode, useCallback, useState } from "react"
import _ from "lodash"
import { StarFilledIcon, StarIcon, SymbolIcon } from "@radix-ui/react-icons"
import { toast } from "sonner"
import Link from "next/link"
import numeral from "numeral"
import ReactMarkdown from "react-markdown"
import { useRouter } from "next/router"
import { Prisma } from ".prisma/client"
import { useUserId } from "@/hooks/use-user"
import { api } from "@/lib/api"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getConversationLink, getConversationsLink, getLocalFlowgptImageUri, getUserLink } from "@/lib/string"
import { POKETTO_APP_ID, POKETTO_DETAIL_FEATURES_ENABLED, POKETTO_DETAIL_RATINGS_ENABLED, URI } from "@/config"
import { Separator } from "@/components/ui/separator"
import clsx from "@/lib/clsx"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { MarqueeContainer, MasonryContainer } from "@/components/containers"
import { vIsNumber } from "@/lib/number"
import { useMustache } from "@/hooks/use-mustache"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import validator = Prisma.validator
import ConversationWhereUniqueInput = Prisma.ConversationWhereUniqueInput

export function AppDetailView({ appId, setOpen }: { appId: string; setOpen?: (v: boolean) => void }) {
  const userId = useUserId()
  const { data: app, error: appError } = api.app.get.useQuery({ appId })

  if (app === undefined) {return <SymbolIcon />}
  if (appError) {return null} // toast.error(appError.message) // 已经在 lib/api 里handle了

  return (
    <div className="flex h-full w-full flex-col gap-2 overflow-auto p-2">
      <section id="basic" className="| flex w-full items-center gap-2">
        <Avatar className="shrink-0 p-4  wh-28">
          <AvatarImage src={getLocalFlowgptImageUri(app.avatar, "md")} className="rounded-2xl" />
        </Avatar>

        <div className="| flex grow flex-col gap-2 overflow-hidden">
          <div className="| flex w-full flex-col ">
            <h2 className="line-clamp-2">{app.name}</h2>
            <p className="truncate text-primary-foreground/75">by {app.creator.name}</p>
          </div>
        </div>

        {!userId ? (
          <Link href={URI.user.auth.signIn} className="p-btn">
            Login to Get
          </Link>
        ) : (
          <InstallButton userId={userId} appId={appId} setOpen={setOpen} />
        )}
      </section>

      <Separator orientation="horizontal" />

      <section id="status" className={clsx("w-full", "flex items-center justify-between gap-1")}>
        <StatusItem a="category" b={`${app.category.main}-${app.category.sub}`} c="of All 31" />
        <StatusItem a="model" b={app.modelName} c={app.creator.name} />
        {POKETTO_DETAIL_RATINGS_ENABLED && (
          <StatusItem
            a="ratings"
            b={numeral(app.state?.stars).format("0.0")}
            c={
              <>
                {_.range(Math.floor(app.state?.stars ?? 0)).map((i) => (
                  <StarFilledIcon className="vh-4 leading-none" key={i} />
                ))}
                {_.range(5 - Math.floor(app.state?.stars ?? 0)).map((i) => (
                  <StarIcon className="vh-4 leading-none" key={i} />
                ))}
              </>
            }
          />
        )}
        <StatusItem a="language" b={app.language} c="Universal" />
      </section>

      {/* <section id={'user-cases'} className={'w-full shrink-0 overflow-auto | flex gap-4'}> */}
      {/*	*/}
      {/*	<DeviceContainer ratio={.6} device={isMobile ? 'iphone-14-pro' : 'surface-pro-2017'}> */}
      {/*		<div className={'w-full flex flex-col'}> */}
      {/*			<h2>heading 1</h2> */}
      {/*			<div>hhh</div> */}
      {/*			<h2>heading 2</h2> */}
      {/*			<div>hhh2</div> */}
      {/*		</div> */}
      {/*	</DeviceContainer> */}
      {/* </section> */}

      {/* tags */}
      <section id="tags" className="flex w-full flex-wrap gap-2">
        {app.tags.map((tag) => (
          <Badge variant="secondary" key={tag.id}>
            {tag.name}
          </Badge>
        ))}
      </section>

      <section id="desc" className="relative flex w-full flex-col">
        <CollapsablePara content={app.desc} />
      </section>

      <section id="ratings-reviews" className="flex w-full flex-col gap-4">
        <div className="flex items-center justify-between">
          {/* todo: Ratings & */}
          <h2>Reviews</h2>
          {app.comments.length > 2 && (
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost">See All</Button>
              </DialogTrigger>
              <DialogContent className="h-[80vh]  max-w-[80vw] overflow-auto">
                <h2>All the comments</h2>
                <MasonryContainer>{/* {comments.map((item) => (<PokettoComment comment={item} key={item.id}/>))} */}</MasonryContainer>
              </DialogContent>
            </Dialog>
          )}
        </div>
        {app.comments.length === 0 && "No Comments Yet !"}

        {/* todo: rate level */}
        {/* <div className={'grid grid-col-1 md:grid-cols-2 gap-4'}> */}
        {/*	<div className={'flex items-end justify-between'}> */}
        {/*		<p className={'flex items-end gap-2'}> */}
        {/*			<span className={'text-4xl font-bold'}>{numeral(poketto.state.ratedStars).format('0.0')}</span> */}
        {/*			<span className={'text-sm font-'}>out of 5</span> */}
        {/*		</p> */}
        {/*		<span>{numeral(poketto.state.ratedStars).format('0a')} Ratings</span> */}
        {/*	</div> */}
        {/*	<Image src={RatingChart} alt={'rating-chart'} width={320} height={40}/> */}
        {/* </div> */}
        <div className="grid gap-2">{/* {comments.slice(0, 2).map((item) => (<PokettoComment comment={item} key={item.id}/>))} */}</div>
      </section>

      <section id="information" className="flex w-full flex-col gap-4">
        <h2>Information</h2>
        <div className="grid grid-cols-2 gap-4">
          <InfoItem a="provider" b={app.creator.name} />
          <InfoItem a="Open Source" b={app.isOpenSource.toString()} />
          <InfoItem a="category" b={`${app.category.main}-${app.category.sub}`} />
          <InfoItem a="language" b={app.language} />
        </div>

        <Separator orientation="horizontal" />
        <div className="grid grid-cols-2 gap-4">
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
          <Separator orientation="horizontal" />
          <section id="collections" className="flex w-full flex-col gap-4">
            <h2>Featured In</h2>
            <div>TODO</div>
          </section>
        </>
      )}

      {userId && <UninstallButton userId={userId} appId={appId} setOpen={setOpen} />}
    </div>
  )
}

export function CollapsablePara({ content }: { content: string }) {
  const [shownMore, setShownMore] = useState(false)
  const [needMore, setNeedMore] = useState(false)
  const m = useMustache()

  const ref = useCallback((node: HTMLParagraphElement) => {
    if (!node) {return}
    setNeedMore(node.scrollHeight > node.offsetHeight)
  }, [])

  return (
    <div className="flex w-full flex-col">
      <article className={clsx("p-prose", !shownMore && "line-clamp-4")} ref={ref}>
        <ReactMarkdown>{m(content)}</ReactMarkdown>
      </article>

      {needMore && ( // todo: better show-more effect with harmonious gradient
        <Button variant="link" className="ml-auto" onClick={() => setShownMore(!shownMore)}>
          {shownMore ? "Less" : "More"}
        </Button>
      )}
    </div>
  )
}

export function StatusItem({ a, b, c }: { a: string; b: ReactNode; c: ReactNode }) {
  return (
    <div className="| flex w-full flex-col items-center justify-between gap-1 overflow-hidden whitespace-nowrap py-2">
      <div className="font-bold uppercase text-muted-foreground">{a}</div>
      <MarqueeContainer className="text-lg">{b}</MarqueeContainer>
      <div className="flex items-center justify-center text-primary-foreground/50">{c}</div>
    </div>
  )
}

export function InfoItem({ a, b }: { a: string; b: ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="font-bold capitalize text-muted-foreground">{a}</div>
      <div className="text-primary-foreground/75">{b}</div>
    </div>
  )
}

/**
 * 新加app后应该立即进入
 */
export function InstallButton({ userId, appId, setOpen }: { userId: string; appId: string; setOpen?: (v: boolean) => void }) {
  const router = useRouter()

  const utils = api.useContext()
  const { data: hasApp } = api.conv.has.useQuery({ appId })
  const go = () => void router.push(getConversationLink(userId, appId)) // app.id 进数据库后会生成新的

  const { mutate: addApp } = api.conv.add.useMutation({
    onSuccess: (data) => {
      toast.success(`Successfully added one app`)
      void utils.conv.list.invalidate()
      void utils.conv.has.invalidate()
      setOpen && setOpen(false)
      go()
    },
  })

  return (
    <Button
      className={clsx(" h-6 rounded-3xl px-4 transition-all")}
      onClick={() => {
        hasApp ? go() : addApp({ appId })
      }}
    >
      {hasApp ? "Open" : "Get"}
    </Button>
  )
}

/**
 * 删除app后应该留在原地, todo: maybe can go into the list page, if so
 */
export function UninstallButton({ userId, appId, setOpen }: { userId: string; appId: string; setOpen?: (v: boolean) => void }) {
  const router = useRouter()

  const utils = api.useContext()
  const { data: hasApp } = api.conv.has.useQuery({ appId })

  const { mutate: delConv, data: delResult } = api.conv.del.useMutation({
    onSuccess: (input) => {
      toast.success(`You have deleted one app.`)
      void utils.conv.list.invalidate()
      void utils.conv.has.invalidate()
      setOpen && setOpen(false)
      void router.push(getConversationsLink(userId))
    },
  })

  if (!hasApp) {return null}

  return (
    <section id="collections" className="my-4 flex w-full flex-col gap-4">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" disabled={appId === POKETTO_APP_ID}>
            Clear
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>确定要清除该App下的所有信息吗（包括会话记录）？</AlertDialogHeader>
          <AlertDialogDescription>⚠️该动作将不可撤销，您也将无法恢复所有过往记录</AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive"
              onClick={() =>
                delConv(
                  validator<ConversationWhereUniqueInput>()({
                    conversation: { appId, userId },
                  })
                )
              }
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  )
}
