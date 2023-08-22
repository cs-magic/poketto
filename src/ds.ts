import { ChatMessageFormatType, Prisma, PromptRoleType } from ".prisma/client"
import { type NextComponentType, type NextPage, type NextPageContext } from "next"
import { type AppProps } from "next/app"
import { type Session } from "next-auth"
import { type ForwardRefExoticComponent, type ReactNode, type RefAttributes } from "react"
import { type IconProps } from "@radix-ui/react-icons/dist/types"
import UserGetPayload = Prisma.UserGetPayload
import AppGetPayload = Prisma.AppGetPayload
import ConversationGetPayload = Prisma.ConversationGetPayload
import validator = Prisma.validator
import ConversationSelect = Prisma.ConversationSelect
import ConversationInclude = Prisma.ConversationInclude
import AppSelect = Prisma.AppSelect
import UserSelect = Prisma.UserSelect
import ChatMessageSelect = Prisma.ChatMessageSelect
import ChatMessageGetPayload = Prisma.ChatMessageGetPayload
import { RoleTypeType } from "../prisma/generated/zod"

// -----------------------------------------------------------------------------
// general
// -----------------------------------------------------------------------------

export const sortOrders = ["recommend", "top", "most-saved", "new", "trending", "follow", "mostViewed"] as const
export type SortOrder = (typeof sortOrders)[number]

export type IMAGE_SIZE = "xs" | "md" | "raw"

export interface INavItem {
  title: string
  link: string
  Icon?: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>
}

// -----------------------------------------------------------------------------
// models
// -----------------------------------------------------------------------------

export const selectUserForListView = validator<UserSelect>()({
  id: true,
  name: true,
  image: true,
})
export type UserForListView = UserGetPayload<{ select: typeof selectUserForListView }>

export const selectUserProfile = validator<UserSelect>()({
  ...selectUserForListView,
  description: true,
  followingCount: true,
  followedByCount: true,
  balance: true,
})
export type UserForProfile = UserGetPayload<{ select: typeof selectUserProfile }>

export const selectAppForListView = validator<AppSelect>()({
  id: true,
  version: true,
  platformId: true,
  platformType: true,
  avatar: true,
  name: true,
  desc: true,
  creatorId: true,
  tags: true,
  state: true,
  modelName: true,
  language: true,
  isOpenSource: true,
  createdAt: true,
  updatedAt: true,
  category: true,
  creator: {
    select: {
      id: true,
      name: true,
    },
  },
})
export type AppForListView = AppGetPayload<{ select: typeof selectAppForListView }>

export const selectAppForDetailView = validator<AppSelect>()({
  ...selectAppForListView,
  comments: true,
  modelArgs: true,
})
export type AppForDetailView = AppGetPayload<{ select: typeof selectAppForDetailView }>

// ref: https://stackoverflow.com/a/69943634/9422455
export const selectConvForListView = validator<ConversationSelect>()({
  // @ts-ignore
  // latestMessage: true, // 这会覆盖我的 messages 数据结构，因为 latestMessages need messages
  messages: {
    orderBy: { updatedAt: "desc" },
    take: 1,
    select: {
      updatedAt: true,
      content: true,
    },
  },
  pinned: true,
  userId: true,
  appId: true,
  app: {
    select: selectAppForListView,
  },
})

export type ConvForListView = ConversationGetPayload<{ select: typeof selectConvForListView }>

export const includeConvForDetailView = validator<ConversationInclude>()({
  app: { select: selectAppForDetailView },
  messages: {
    include: {
      user: true, // 获取每条信息的用户
    },
  },
})
export type ConvForDetailView = ConversationGetPayload<{
  include: typeof includeConvForDetailView
}>

export const selectChatMessageForListView = validator<ChatMessageSelect>()({
  id: true,
  createdAt: true,
  // updatedAt: true, // todo: support message modification
  content: true,
  role: true,
  format: true,
  user: {
    select: selectUserForListView,
  },
})
export type SelectChatMessageForListView = ChatMessageGetPayload<{ select: typeof selectChatMessageForListView }>
export type AllMessage =
  | SelectChatMessageForListView
  | {
      systemType: "notification" | "date"
      content: string
    }

///////////////////////////
// next-auth
// ref: https://stackoverflow.com/a/69968164/9422455
///////////////////////////

// type PageAuth = {
//   role: string
//   loading?: JSX.Element
//   unauthorized?: string
// }

export type NextPageWithAuth<P = {}, IP = P> = NextPage<P, IP> & {
  auth?: boolean
}

export type NextComponentWithAuth = NextComponentType<NextPageContext, any, {}> & Partial<NextPageWithAuth>

export type ExtendedAppProps<P = { session: Session }> = AppProps<P> & {
  Component: NextComponentWithAuth
}

export enum CommandType {
  suggestion = "suggestion",
  settings = "settings",
}

export interface ICommandItem {
  id: string
  icon: ReactNode
  title?: string
  category: CommandType
  kbd?: string
}
