import {
  type AppWithRelation,
  type FlowgptPromptFull,
  type IAppComment,
  type IFlowGPTComment,
  type IFlowgptConversation,
  type IFlowgptPromptBasic,
  type IPokettoConversation,
} from "@/ds";
import d from "@/lib/datetime";
import { nanoid } from "nanoid";
import dayjs from "dayjs";
import { PlatformType } from ".prisma/client";

import { DEFAULT_APP_VERSION } from "@/config";
import { App, AppModel, AppState, AppTag, User } from "@prisma/client";

export const transFlowgptConversation = (
  f: IFlowgptConversation
): IPokettoConversation => ({
  createdAt: d(f.createdAt).toDate(),
  messages: f.messages.map((m) => ({
    ...m,
    type: "user",
    format: "text",
    appId: f.id,
    uid: undefined,
    parentId: undefined,
    interactions: {},
    id: nanoid(),
    createdAt: new Date(),
    role: m.role as "system" | "user" | "assistant" | "function",
  })),
});

export const transFlowgptPrompt2app = (p: IFlowgptPromptBasic): App => ({
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
});

export const transFlowgptPrompt2creator = (p: IFlowgptPromptBasic): User => ({
  // ...p.User,
  id: p.User.id,
  image: p.User.image,
  name: p.User.name,

  balance: 0,
  desc: null,
  email: null,
  emailVerified: null,
  platformType: PlatformType.FlowGPT,
  platformUserId: p.id,
});

export const transFlowgptPrompt2model = (p: IFlowgptPromptBasic): AppModel => ({
  id: p.id,
  appId: p.id,
  createdAt: dayjs(p.createdAt).toDate(),
  updatedAt: dayjs(p.updatedAt).toDate(),
  isOpenSource: p.visibility,
  temperature: p.temperature,
  type: p.model,
});

export const transFlowgptPrompt2state = (p: IFlowgptPromptBasic): AppState => ({
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
});

export const transFlowgptPrompt2tags = (p: IFlowgptPromptBasic): AppTag[] =>
  p.Tag.map((t) => ({
    id: t.name,
    name: t.name,
    createdAt: null,
    updatedAt: null,
    creatorId: null,
  }));

export const transformFlowgptPrompt2AppWithRelation = (
  p: IFlowgptPromptBasic | FlowgptPromptFull
): AppWithRelation => {
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
    creator: transFlowgptPrompt2creator(p),
    tags: transFlowgptPrompt2tags(p),
    state: transFlowgptPrompt2state(p),
    model: { ...transFlowgptPrompt2model(p), initPrompts: [] },
    actions: [],
    categoryMain: p.categoryId,
    categorySub: p.subCategoryId,
  };
};
export const transFlowgptComments = (
  comment: IFlowGPTComment
): IAppComment => ({
  ...comment,
  ratedStars: 0,
  content: comment.body,
  user: {
    ...comment.user,
    image: comment.user.image,
    id: comment.userId,
    name: comment.user.name,
    desc: null,
    balance: 0,
    emailVerified: null,
    email: null,
    platformType: PlatformType.FlowGPT,
    platformUserId: comment.userId,
  },
});
