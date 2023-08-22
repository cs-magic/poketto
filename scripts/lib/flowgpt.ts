import { type AppForListView } from "@/ds"
import { type AppState, type AppTag, type User } from "@prisma/client"
import dayjs from "dayjs"
import { PlatformType } from ".prisma/client"
import { DEFAULT_APP_VERSION } from "@/config-const"
import type sampleConversation from "@/data/flowgpt/conversation.json"
import type sampleComment from "@/data/flowgpt/comment.getComments/comment.json"
import type sampleBasicPrompt from "@/data/flowgpt/prompt-basic_2.json"

export type IFlowgptPromptBasic = typeof sampleBasicPrompt
export type IFlowgptUserBasic = typeof sampleBasicPrompt.User
export type IFlowgptConversation = typeof sampleConversation
export type IFlowGPTComment = typeof sampleComment

export interface FlowgptPromptFull // todo: add comments
  extends IFlowgptPromptBasic {
  Conversation: IFlowgptConversation
}

export const transFlowgptUserBasic = (u: IFlowgptUserBasic): User => ({
  id: `${PlatformType.FlowGPT}_${u.id}`,
  name: u.name,
  description: null,
  balance: 0,
  image: u.image,
  platformType: PlatformType.FlowGPT,
  platformId: u.id,
  email: null,
  emailVerified: null,
  // platformArgs: null,
  platformArgs: {
    uri: u.uri,
  },
  followedByCount: 0,
  followingCount: 0,
})
export const transFlowgptPrompt2Model = (p: IFlowgptPromptBasic) => ({
  id: p.id,
  appId: p.id,
  createdAt: dayjs(p.createdAt).toDate(),
  updatedAt: dayjs(p.updatedAt).toDate(),
  isOpenSource: p.visibility,
  temperature: p.temperature,
  type: p.model,
})
export const transFlowgptPrompt2State = (p: IFlowgptPromptBasic): AppState => ({
  id: p.id,
  createdAt: null,
  updatedAt: null,
  appId: p.id,
  views: p.views,
  calls: p.uses,
  forks: 0,
  tips: p.tip,
  stars: p.saves,
  shares: p.shares,
})
export const transFlowgptPrompt2Tags = (p: IFlowgptPromptBasic): AppTag[] =>
  p.Tag.map((t) => ({
    id: t.name,
    name: t.name,
    createdAt: null,
    updatedAt: null,
    creatorId: null,
  }))
export const transformFlowgptPrompt2ForListView = (p: IFlowgptPromptBasic | FlowgptPromptFull): AppForListView => {
  return {
    id: p.id, // todo: we should not use this id, since it's not real
    name: p.title,
    avatar: p.thumbnailURL,
    language: p.language,
    description: p.description,
    updatedAt: dayjs(p.updatedAt).toDate(),
    createdAt: dayjs(p.createdAt).toDate(),
    platformType: PlatformType.FlowGPT,
    version: DEFAULT_APP_VERSION,
    creatorId: p.userId,
    creator: transFlowgptUserBasic(p.User),
    tags: transFlowgptPrompt2Tags(p),
    state: transFlowgptPrompt2State(p),
    modelName: p.model,
    platformId: p.id,
    isOpenSource: p.visibility,
    category: {
      createdAt: new Date(),
      updatedAt: new Date(),
      main: p.categoryId,
      sub: p.subCategoryId,
    },
  }
}
