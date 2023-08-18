import { Prisma, type User } from ".prisma/client"
import { type ChatMessage } from "@prisma/client"
import { type Message } from "ai"
import type sampleBasicPrompt from "@/data/flowgpt/prompt-basic_2.json"
import type sampleComment from "@/data/flowgpt/comment.getComments/comment.json"
import type sampleConversation from "@/data/flowgpt/conversation.json"
import UserGetPayload = Prisma.UserGetPayload
import AppGetPayload = Prisma.AppGetPayload
import ConversationGetPayload = Prisma.ConversationGetPayload

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
export const conversationInclude = {
  app: { include: appInclude },
  messages: {
    include: {
      user: true, // 获取每条信息的用户
    },
  },
}
type IAppInclude = typeof appInclude
type IConversationInclude = typeof conversationInclude
export type AppWithRelation = AppGetPayload<{
  include: IAppInclude
}>
export type ConversationWithRelation = ConversationGetPayload<{
  include: IConversationInclude
}> & { latestMessage: ChatMessage }

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

export interface IPokettoConversation {
  createdAt: Date
  messages: IAppMessage[]
}
