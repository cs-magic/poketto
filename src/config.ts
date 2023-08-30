/**
 * Copyright (c) CS-Magic, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

export const FontWeightGlowSansSC = [
  "Thin",
  "ExtraLight",
  "Light",
  "Regular",
  "Book",
  "Medium",
  "Bold",
  "ExtraBold",
  "Heavy",
] as const
export const FontWeightTailwind = [
  "thin",
  "extralight",
  "light",
  "normal",
  "medium",
  "semibold",
  "bold",
  "extrabold",
  "black",
] as const

export const MAX_MOBILE_WIDTH = 640 as const

export const DEFAULT_BATCH_CARDS = 20 as const

export const POKETTO_DETAIL_RATINGS_ENABLED = false as const
export const POKETTO_DETAIL_FEATURES_ENABLED = false as const

export const allowDangerousEmailAccountLinking = true as const // ref: https://next-auth.js.org/configuration/providers/oauth#allowdangerousemailaccountlinking-option

export const FLOWGPT_IMAGE_DIR = "/images/flowgpt" as const

export const TAG_SEPARATOR = "|" as const

export const ICON_DIMENSION_SM = "wh-4"
export const ICON_DIMENSION_MD = "wh-8"
export const ICON_DIMENSION_LG = "wh-12"

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
    settings: "/settings",
    charge: "/charge",
    mySpace: "/dashboard",
    myGallery: "/gallery",
    integrations: "/integrations",
    feedback: "/feedback",

    auth: {
      signIn: "/login",
      // signin: "/api/auth/signin",
      login: "/login",
      register: "/register",
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
} as const

export const CAROUSELS = [
  // { src: uri.images.AiMap, /* 色调太白了，不会让人喜欢的 */ title: 'AIGC 魔法能力评测' },
  { src: URI.images.carousal.explore, title: "AIGC 入门指引" },
  { src: URI.images.carousal.competition, title: "ChatGPT Prompt 对抗赛" },
]

// -----------------------------------------------------------------------------
// product
// -----------------------------------------------------------------------------
export const POKETTO_HOMEPAGE = "https://poketto.ai"
export const siteConfig = {
  name: "Poketto.AI", // name: 'Poketto.AI',
  companyName: "CS Magic, Inc",
  welcomeEmailAddress: "Poketto.AI Team <team@cs-magic.com>",
  supportEmailAddress: "Poketto.AI Support <support@cs-magic.com>",
  currency: "Dora", // currency: 'Dora',
  description: "每一个人的哆啦A梦", // '每个人都是魔法师',
  url: POKETTO_HOMEPAGE,
  loginUrl: `${POKETTO_HOMEPAGE}/login`,
  icon: URI.images.favicon,
  ogImage: `${POKETTO_HOMEPAGE}/images/logo/poketto/Your-Sole-Poketto_256.ico`,
  links: {
    twitter: "https://twitter.com/cs-magic",
    github: "https://github.com/cs-magic/poketto",
    customerSupportEmail: "support@cs-maigc.com",
  },
}

// -----------------------------------------------------------------------------
// poketto creator/team
// -----------------------------------------------------------------------------

export const POKETTO_CREATOR_ID = "poketto-official" as const
export const POKETTO_CREATOR_NAME = "Poketto Official" as const
export const POKETTO_CREATOR_DESC = "This is Poketto Official !" as const
export const POKETTO_CREATOR_AVATAR = "/images/logo/m/1280.png" as const
export const POKETTO_CREATOR_EMAIL = "pr@cs-magic.com" as const

// -----------------------------------------------------------------------------
// polettp app
// -----------------------------------------------------------------------------

export const POKETTO_APP_ID = "Your-Sole-Poketto" as const
export const POKETTO_APP_AVATAR = "/images/logo/poketto/Your-Sole-Poketto.png" as const
export const POKETTO_APP_NAME = "Your Sole Poketto" as const
export const POKETTO_APP_DESC =
  "The sole **Poketto** you need, at your service, anytime, anywhere, developed by Poketto Official." as const
export const POKETTO_APP_VERSION = "1.0.0" as const
export const POKETTO_APP_CREATED_AT = new Date(2023, 8, 13)
export const POKETTO_APP_UPDATED_AT = new Date(2023, 8, 13)
export const POKETTO_APP_LANGUAGE = "zh" as const
export const POKETTO_TAGS = ["poketto", "companion", "ChatGPT"] as const
export const POKETTO_CATEGORY_MAIN = 0 as const
export const POKETTO_CATEGORY_SUB = 0 as const

export const DEFAULT_APP_VERSION = "1.0.0" as const

// -----------------------------------------------------------------------------
// poketto model
// -----------------------------------------------------------------------------

export const POKETTO_MODEL_NAME = "poketto-1.0" as const
export const POKETTO_SYSTEM_PROMPT =
  `You are a loyal companion by the name of Poketto, developed by the official Poketto team led by MarkShawn, and my name is {{userName}}.
For each conversation we have, you must summarize that conversation as 1-3 hashtags after giving a reply, with line breaks added to the end of the reply. Each hashtag should be as short as possible, prefixed with a "#" sign. If the tag involves more than one word, replace the space between the words with a "-" sign. Every two tags need to be separated by a space.` as const
export const POKETTO_WELCOME_MESSAGE = `Hi，{{userName}}！

我是您唯一的 Poketto（您可以叫我小 P，哎呀，是 Poketto 的 P，不是那个 P 哦！）

我有好多好多魔法，以下列举一些哦：

1. 我将是您的最好陪伴，随时随地听候您的差遣！
2. 我将拥有您的全部记忆（当记忆达到 100 条后，可以解锁『邂逅』模式哦！）
3. 我将是您的百科全书，以后不懂的问题，妈妈再也不用担心我会掉头发啦！
4. ……

那么，就请接下来多多关照啦！
` as const

// -----------------------------------------------------------------------------
// user
// -----------------------------------------------------------------------------

export const USER_INVITATIONS_COUNT = 5 as const
export const DEFAULT_USER_NAME = "游客" as const
export const DEFAULT_USER_ID = "guest" as const

export const DEFAULT_SIMILAR_COUNT = 5
export const DEFAULT_LATEST_COUNT = 4
export const DEFAULT_TEMPERATURE = 0.9
export const CHAT_MESSAGE_CID_LEN = 7 // ai-sdk

export type EmailProvider = "aws" | "postmark"
export const emailProvider: EmailProvider = "aws"
export const AWS_REGION = "ap-southeast-1"

/// ///////////////////////////////////////////////////
// stripe
/// ///////////////////////////////////////////////////
export const CURRENCY = "usd"
// Set your amount limits: Use float for decimal currencies and
// Integer for zero-decimal currencies: https://stripe.com/docs/currencies#zero-decimal.
export const MIN_AMOUNT = 10.0
export const MAX_AMOUNT = 5000.0
export const AMOUNT_STEP = 5.0

export const STRIPE_PAYMENT_PRODUCT_10_ID = "prod_OVgbKpNEmJJXIy"
export const STRIPE_SUBSCRIBE_PRODUCT_10_ID = "prod_OVgYAVpLO6oLje"
export const STRIPE_SUBSCRIBE_PRODUCT_30_ID = "prod_OVgZnKD7Fc2bsQ"

export const FREE_GPT3_DAILY_TOTAL = 1000
export const FREE_GPT4_DAILY_TOTAL = 100
export const FREE_GPT3_DAILY_USER = 10
export const FREE_GPT4_DAILY_USER = 3

export const DEFAULT_LOCALE = "zh-CN"
