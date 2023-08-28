/**
 * Copyright (c) CS-Magic, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Prisma } from ".prisma/client"
import { type IconProps } from "@radix-ui/react-icons/dist/types"
import type { NextComponentType, NextPage, NextPageContext } from "next"
import type { Session } from "next-auth"
import type { AppProps } from "next/app"
import { type ForwardRefExoticComponent, type ReactNode, type RefAttributes } from "react"

import resources from "@/@types/resources"

import AppGetPayload = Prisma.AppGetPayload
import AppSelect = Prisma.AppSelect
import ChatMessageGetPayload = Prisma.ChatMessageGetPayload
import ChatMessageSelect = Prisma.ChatMessageSelect
import ConversationGetPayload = Prisma.ConversationGetPayload
import ConversationInclude = Prisma.ConversationInclude
import ConversationSelect = Prisma.ConversationSelect

import UserGetPayload = Prisma.UserGetPayload
import UserSelect = Prisma.UserSelect
import validator = Prisma.validator

// -----------------------------------------------------------------------------
// next-auth, ref: https://stackoverflow.com/a/69968164/9422455
// -----------------------------------------------------------------------------

export type NextPageWithAuth<P = {}, IP = P> = NextPage<P, IP> & {
  auth?: boolean
}

export type NextComponentWithAuth = NextComponentType<NextPageContext, any, {}> & Partial<NextPageWithAuth>

export type ExtendedAppProps<P = { session: Session }> = AppProps<P> & {
  Component: NextComponentWithAuth
}

// -----------------------------------------------------------------------------
// UI
// -----------------------------------------------------------------------------

export type IMAGE_SIZE = "xs" | "md" | "raw" | "full"

export enum CardsLayoutType {
  masonry = "masonry",
  grid = "grid",
}

// -----------------------------------------------------------------------------
// User Preference (which can be managed via either by store or api)
// -----------------------------------------------------------------------------

export type SortOrder = keyof typeof resources.common.sorts
export const sortOrders = Object.keys(resources.common.sorts)

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
  email: true,
  platformType: true,
  platformId: true,
  platformArgs: true,
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
      platformType: true,
      platformId: true,
      platformArgs: true,
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

// -----------------------------------------------------------------------------
// general
// -----------------------------------------------------------------------------

export type MenuKey = keyof typeof resources.common.menus

export interface IMenuItem {
  field: MenuKey
  link: string
  Icon?: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>
}

export enum CommandType {
  suggestion = "suggestion",
  settings = "settings",
}

export interface ICommandItem {
  id: string
  Icon: (props: any) => ReactNode
  title?: string
  category: CommandType
  kbd?: string
}
