import { getRobotAvatar } from "@/lib/string"
import { type App, type AppModel, type PrommptMessage, type User } from "@prisma/client"
import { nanoid } from "nanoid"
import { PlatformType, PromptRoleType } from ".prisma/client"
import { type AppWithRelation } from "@/ds"

// -----------------------------------------------------------------------------
// font
// -----------------------------------------------------------------------------

export const FontWeightGlowSansSC = ["Thin", "ExtraLight", "Light", "Regular", "Book", "Medium", "Bold", "ExtraBold", "Heavy"]
export const FontWeightTailwind = ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"]

// -----------------------------------------------------------------------------
// device
// -----------------------------------------------------------------------------

export const DEVICE_TYPES = [
  "the-iphone",
  "iphone-x",
  "iphone-14-pro",
  "ipad-pro",
  "surface-pro-2017",
  "macbook-pro",
  "imac",
  "imac-pro",
] as const
export type DEVICE_TYPE = (typeof DEVICE_TYPES)[number]

export interface IDevice {
  w: number
  h: number
  r?: number
}

export const DEVICES: Record<DEVICE_TYPE, IDevice> = {
  "the-iphone": { w: 320, h: 610 },
  "iphone-x": { w: 428, h: 868 },
  "iphone-14-pro": { w: 428, h: 868, r: 68 },

  "ipad-pro": { w: 560, h: 778 },
  "surface-pro-2017": { w: 561, h: 394, r: 10 },

  "macbook-pro": { w: 740, h: 434 },
  imac: { w: 640, h: 540 },
  "imac-pro": { w: 624, h: 484, r: 18 },
}

export const MAX_MOBILE_WIDTH = 640

// -----------------------------------------------------------------------------
// system
// -----------------------------------------------------------------------------

export const POKETTO_DETAIL_RATINGS_ENABLED = false
export const POKETTO_DETAIL_FEATURES_ENABLED = false

export const URI = {
  app: {
    home: "/",
    explore: "/explore",
    pocketApp: "/p",
    docs: {
      intro: "/docs/whats-poketto",
      currency: "/docs/whats-dora",
      learn: "/docs/learn",
      support: "/docs/support",
    },
  },
  user: {
    dashboard: "/user/dashboard",
    gallery: "/user/gallery",
    integrations: "/user/integrations",

    auth: {
      signin: "/api/auth/signin",
      login: "/auth/login",
      register: "/auth/register",
    },

    seek: {
      waitlist: "/seek/waitlist",
      enterprise: "/seek/enterprise",
    },
  },
  images: {
    favicon: "/favicon.ico",
    AiMap: "/images/bg/ai-anatomy-map@0.5x-裁切版.jpg",
    explore: "/images/mj/home-cover.png",
    carousal: {
      explore: "/images/mj/carousel-explore.jpg",
      competition: "/images/mj/carousel-peace.jpg",
    },
  },
}

export const CAROUSELS = [
  // { src: uri.images.AiMap, /* 色调太白了，不会让人喜欢的 */ title: 'AIGC 魔法能力评测' },
  { src: URI.images.carousal.explore, title: "AIGC 入门指引" },
  { src: URI.images.carousal.competition, title: "ChatGPT Prompt 对抗赛" },
]

// -----------------------------------------------------------------------------
// business
// -----------------------------------------------------------------------------

export const USER_INVITATIONS_COUNT = 5
export const DEFAULT_APP_VERSION = "1.0.0"
export const DEFAULT_USER_NAME = "游客"
export const DEFAULT_USER_ID = "guest"
export const DEFAULT_USER_AVATAR = getRobotAvatar(DEFAULT_USER_ID)
export const product = {
  name: "口袋 A I", // name: 'Poketto.AI',
  currency: "甜甜圈", // currency: 'Dora',
  desc: "每一个人的哆啦A梦", // '每个人都是魔法师',
  icon: URI.images.favicon,
}

export const POKETTO_PLATFORM = "Poketto" as const
export const POKETTO_VERSION = "1.0.0" as const
export const POKETTO_APP_ID = "Your-Sole-Poketto" as const
export const POKETTO_MODEL_ID = "poketto-1.0" as const
export const POKETTO_APP_CREATED_AT = new Date(2023, 8, 13)
export const POKETTO_APP_UPDATED_AT = new Date(2023, 8, 13)
export const POKETTO_APP_AVATAR = "/images/logo/poketto/Your-Sole-Poketto.png"
export const POKETTO_APP_NAME = "Your Sole Poketto" as const
export const POKETTO_APP_DESC = "The sole **Poketto** you need, at your service, anytime, anywhere, developed by Poketto Official." as const
export const POKETTO_CREATOR_ID = "poketto-official" as const
export const POKETTO_CREATOR_NAME = "Poketto Official" as const
export const POKETTO_CREATOR_DESC = "This is Poketto Official !" as const
export const POKETTO_CREATOR_AVATAR = "/images/logo/m/1280.png"
export const POKETTO_CREATOR_EMAIL = "pr@cs-magic.com"
export const POKETTO_MODEL_NAME = "poketto-1.0" as const
export const POKETTO_LANGUAGE = "zh"
export const POKETTO_TAGS = ["poketto", "companion", "ChatGPT"]
export const POKETTO_SYSTEM_PROMPT = `You are a loyal companion by the name of Poketto, developed by the official Poketto team led by MarkShawn, and my name is {{userName}}.
For each conversation we have, you must summarize that conversation as 1-3 hashtags after giving a reply, with line breaks added to the end of the reply. Each hashtag should be as short as possible, prefixed with a "#" sign. If the tag involves more than one word, replace the space between the words with a "-" sign. Every two tags need to be separated by a space.`
export const POKETTO_WELCOME_MESSAGE = `Hi，{{userName}}！

我是您唯一的 Poketto（您可以叫我小 P，哎呀，是 Poketto 的 P，不是那个 P 哦！）

我有好多好多魔法，以下列举一些哦：

1. 我将是您的最好陪伴，随时随地听候您的差遣！
2. 我将拥有您的全部记忆（当记忆达到 100 条后，可以解锁『邂逅』模式哦！）
3. 我将是您的百科全书，以后不懂的问题，妈妈再也不用担心我会掉头发啦！
4. ……

那么，就请接下来多多关照啦！
`
export const POKETTO_CATEGORY_MAIN = 0
export const POKETTO_CATEGORY_SUB = 0
export const POKETTO_USER: User = {
  id: POKETTO_CREATOR_ID,
  platformType: PlatformType.Poketto,
  platformUserId: POKETTO_CREATOR_ID,

  name: POKETTO_CREATOR_NAME,
  desc: POKETTO_CREATOR_DESC,
  email: POKETTO_CREATOR_EMAIL,
  balance: 0,
  image: POKETTO_CREATOR_AVATAR,
  emailVerified: POKETTO_APP_CREATED_AT,
  platformArgs: {},
}
export const POKETTO_APP: App = {
  id: POKETTO_APP_ID,
  createdAt: POKETTO_APP_CREATED_AT,
  updatedAt: POKETTO_APP_UPDATED_AT,
  creatorId: POKETTO_CREATOR_ID,
  platformType: POKETTO_PLATFORM,
  version: POKETTO_VERSION,
  desc: POKETTO_APP_DESC,
  name: POKETTO_APP_NAME,
  language: POKETTO_LANGUAGE,
  categoryMain: POKETTO_CATEGORY_MAIN,
  categorySub: POKETTO_CATEGORY_SUB,
  avatar: POKETTO_APP_AVATAR,
}
export const POKETTO_APP_MODEL: AppModel = {
  id: POKETTO_MODEL_ID,
  appId: POKETTO_APP_ID,
  createdAt: POKETTO_APP_CREATED_AT,
  updatedAt: POKETTO_APP_UPDATED_AT,
  type: POKETTO_MODEL_NAME,
  isOpenSource: false,
  temperature: 0.7,
}
export const POKETTO_APP_MODEL_INIT_PROMPTS: PrommptMessage[] = [
  {
    id: nanoid(),
    appModelId: POKETTO_MODEL_ID,
    role: PromptRoleType.system,
    content: POKETTO_SYSTEM_PROMPT,
  },
]
export const POKETTO_APP_WITH_RELATION: AppWithRelation = {
  ...POKETTO_APP,
  model: {
    ...POKETTO_APP_MODEL,
    initPrompts: POKETTO_APP_MODEL_INIT_PROMPTS,
  },
  actions: [],
  creator: POKETTO_USER,
  tags: POKETTO_TAGS.map((t) => ({
    id: t,
    name: t,
    creatorId: POKETTO_CREATOR_ID,
    createdAt: POKETTO_APP_CREATED_AT,
    updatedAt: POKETTO_APP_UPDATED_AT,
  })),
  state: {
    id: POKETTO_APP_ID,

    createdAt: POKETTO_APP_CREATED_AT,
    updatedAt: POKETTO_APP_UPDATED_AT,
    appId: POKETTO_APP_ID,
    shares: 0,
    tips: 0,
    stars: 0,
    forks: 0,
    calls: 0,
    views: 0,
  },
  comments: [
    {
      id: nanoid(),
      createdAt: POKETTO_APP_CREATED_AT,
      updatedAt: POKETTO_APP_UPDATED_AT,
      userId: POKETTO_CREATOR_ID,
      content: "This is a dedicated and developing app, hope helped you. Best wishes, Poketto Team.",
      title: "Your Sole Poketto !",
      rate: 5,
      appId: POKETTO_APP_ID,
    },
  ],
}

// -----------------------------------------------------------------------------
// next-auth
// -----------------------------------------------------------------------------

export const allowDangerousEmailAccountLinking = true // ref: https://next-auth.js.org/configuration/providers/oauth#allowdangerousemailaccountlinking-option
export const FLOWGPT_IMAGE_DIR = "/images/flowgpt"
export const TAG_SEPARATOR = "|"
