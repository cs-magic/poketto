import {
  type AppWithRelation,
  type FlowgptPromptFull,
  type IAppComment,
  type IFlowGPTComment,
  type IFlowgptConversation,
  type IFlowgptPromptBasic,
  type IFlowgptUserBasic,
  type IPokettoConversation,
} from "@/ds"
import d from "@/lib/datetime"
import { nanoid } from "nanoid"
import dayjs from "dayjs"
import { PlatformType, Prisma } from ".prisma/client"

import { DEFAULT_APP_VERSION, FLOWGPT_IMAGE_DIR } from "@/config"
import { type App, type AppModel, type AppState, type AppTag, type User } from "@prisma/client"

import hash from "js-sha1"
import JsonObject = Prisma.JsonObject

export const transFlowgptConversation = (f: IFlowgptConversation): IPokettoConversation => ({
  createdAt: d(f.createdAt).toDate(),
  messages: f.messages.map((m) => ({
    ...m,
    type: "user",
    format: "text",
    appId: f.id,
    userId: undefined,
    parentId: undefined,
    interactions: {},
    id: nanoid(),
    createdAt: new Date(),
    role: m.role as "system" | "user" | "assistant" | "function",
  })),
})

export const transFlowgptUserBasic = (u: IFlowgptUserBasic): User => ({
  id: `${PlatformType.FlowGPT}_${u.id}`,
  name: u.name,
  desc: null,
  balance: 0,
  image: u.image,
  platformType: PlatformType.FlowGPT,
  platformUserId: u.id,
  email: null,
  emailVerified: null,
  // platformArgs: null,
  platformArgs: {
    uri: u.uri,
  },
})

export const transFlowgptPrompt2App = (p: IFlowgptPromptBasic): App => ({
  platformType: PlatformType.FlowGPT,

  id: p.id,
  name: p.title,
  avatar: p.thumbnailURL,
  language: p.language,
  desc: p.description,
  updatedAt: dayjs(p.updatedAt).toDate(),
  createdAt: dayjs(p.createdAt).toDate(),
  version: DEFAULT_APP_VERSION,
  creatorId: p.userId,
  categoryMain: p.categoryId,
  categorySub: p.subCategoryId,
})

export const transFlowgptPrompt2Model = (p: IFlowgptPromptBasic): AppModel => ({
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

export const transformFlowgptPrompt2AppWithRelation = (p: IFlowgptPromptBasic | FlowgptPromptFull): AppWithRelation => {
  return {
    comments: [], // todo: add comments
    id: p.id,
    name: p.title,
    avatar: p.thumbnailURL,
    language: p.language,
    desc: p.description,
    updatedAt: dayjs(p.updatedAt).toDate(),
    createdAt: dayjs(p.createdAt).toDate(),
    platformType: PlatformType.FlowGPT,
    version: DEFAULT_APP_VERSION,
    creatorId: p.userId,
    creator: transFlowgptUserBasic(p.User),
    tags: transFlowgptPrompt2Tags(p),
    state: transFlowgptPrompt2State(p),
    model: { ...transFlowgptPrompt2Model(p), initPrompts: [] },
    actions: [],
    categoryMain: p.categoryId,
    categorySub: p.subCategoryId,
  }
}
export const transFlowgptComments = (comment: IFlowGPTComment): IAppComment => ({
  ...comment,
  ratedStars: 0,
  content: comment.body,
  user: transFlowgptUserBasic(comment.user),
})

export type IMAGE_SIZE = "xs" | "md" | "raw"
export const getLocalFlowgptImageUri = (uri: string, size: IMAGE_SIZE = "xs") => {
  if (size === "raw") return uri
  return `${FLOWGPT_IMAGE_DIR}/thumbs/${size}/${hash(uri)}.jpg`
}
