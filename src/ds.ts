import { Prisma, type User } from ".prisma/client"
import { type ChatMessage } from "@prisma/client"
import { type Message } from "ai"
import type sampleBasicPrompt from "@/data/flowgpt/prompt-basic_2.json"
import type sampleComment from "@/data/flowgpt/comment.getComments/comment.json"
import type sampleConversation from "@/data/flowgpt/conversation.json"
import UserGetPayload = Prisma.UserGetPayload
import AppGetPayload = Prisma.AppGetPayload
import ConversationGetPayload = Prisma.ConversationGetPayload
import validator = Prisma.validator
import ConversationSelect = Prisma.ConversationSelect
import ConversationInclude = Prisma.ConversationInclude
import AppSelect = Prisma.AppSelect
import UserSelect = Prisma.UserSelect

// -----------------------------------------------------------------------------
// general
// -----------------------------------------------------------------------------

export type ID = string | number

// -----------------------------------------------------------------------------
// database
// -----------------------------------------------------------------------------

export const userWithRelationsInclude = {
  followedBy: true,
  following: true,
}

export const userAppRelationTypes = ["create", "used", "starred"] as const
export type UserAppRelationType = (typeof userAppRelationTypes)[number]

export type UserWithRelations = UserGetPayload<{
  include: typeof userWithRelationsInclude
}> & {
  impact: number
}

// -----------------------------------------------------------------------------
// flowgpt
// -----------------------------------------------------------------------------

export type IFlowgptPromptBasic = typeof sampleBasicPrompt
export type IFlowgptUserBasic = typeof sampleBasicPrompt.User
export type IFlowgptConversation = typeof sampleConversation
export type IFlowGPTComment = typeof sampleComment
export const GET_PROMPTS_BATCH_SIZE = 36

export interface FlowgptPromptFull // todo: add comments
  extends IFlowgptPromptBasic {
  Conversation: IFlowgptConversation
}

const flowgptSortOrders = ["recommend", "top", "most-saved", "new", "trending", "follow"] as const
export const sortOrders = [...flowgptSortOrders, "mostViewed"] as const
export type SortOrder = (typeof sortOrders)[number]

export interface IAppComment extends Omit<IFlowGPTComment, "user"> {
  ratedStars: number
  content: string // !important: support markdown
  user: User
}

export const appInclude = {
  creator: true,
  actions: true, // note: unnecessary to track appActions
  tags: true,
  state: true,
  comments: true,
}
type IAppInclude = typeof appInclude
export type AppWithRelation = AppGetPayload<{
  include: IAppInclude
}>

// -----------------------------------------------------------------------------
// poketto
// -----------------------------------------------------------------------------

/**
 * - 判断是否用户消息取决于 user 类型，因此在 user 里实现
 */
export interface IAppMessage extends Message {
  type: "user" | "notification"
  format: "text" | "image" | "audio" | "video" | "link" | "quote"

  appId: ID //
  userId?: ID // 1. 不要存user，这样可以保证批量更新 2. 通知等就没有 userId
  parentId?: ID

  interactions: Record<string, number>
}

export const selectUserProfile = validator<UserSelect>()({
  id: true,
  name: true,
  desc: true,
  avatar: true,
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
})

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
  app: { include: appInclude },
  messages: {
    include: {
      user: true, // 获取每条信息的用户
    },
  },
})
export type ConvForDetailView = ConversationGetPayload<{
  include: typeof includeConvForDetailView
}>
// & { latestMessage: ChatMessage }
