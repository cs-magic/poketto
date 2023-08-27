/**
 * Copyright (c) CS-Magic, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Icons } from "./components/icons"
import type { PlatformType, PromptRoleType } from ".prisma/client"
import {
  BellIcon,
  DashboardIcon,
  EnvelopeOpenIcon,
  GearIcon,
  HandIcon,
  HomeIcon,
  MixIcon,
  RocketIcon,
  TargetIcon,
} from "@radix-ui/react-icons"

import { type NavKey, POKETTO_HOMEPAGE, URI } from "@/config"

import { CommandType, type ICommandItem, type INavItem } from "@/ds"

import { FLOWGPT_HOMEPAGE } from "@/const"

export const COMMANDS: ICommandItem[] = [
  {
    id: "Ask Poketto",
    Icon: Icons.Product,
    category: CommandType.suggestion,
    kbd: "⌘ D",
  },
  {
    id: "Dashboard",
    Icon: DashboardIcon,
    category: CommandType.settings,
    kbd: "⌘ D",
  },
  {
    id: "Explore",
    Icon: GearIcon,
    category: CommandType.settings,
    kbd: "⌘ E",
  },
]
export const contentStyleBasedOnRole: { [key in PromptRoleType]: string } = {
  system: "bg-transparent ", // "bg-slate-700"
  function: "bg-destructive",
  user: "bg-green-600 text-black",
  assistant: "bg-muted text-primary-foreground/75 dark:bg-sidebar",
}
export const navs: { [key in NavKey]: INavItem } = {
  home: {
    title: "首页",
    link: URI.app.home,
    Icon: HomeIcon,
  },
  explore: {
    title: "探索",
    link: URI.app.explore,
    Icon: RocketIcon,
  },
  dashboard: {
    title: "我的空间",
    link: URI.user.dashboard,
    Icon: MixIcon,
  },
  gallery: {
    title: "我的画廊",
    link: URI.user.gallery,
    Icon: TargetIcon,
  },
  waitlist: {
    title: "反馈",
    link: URI.user.seek.waitlist,
    Icon: HandIcon,
  },
  enterprise: {
    title: "poketto enterprise",
    link: URI.user.seek.enterprise,
    Icon: EnvelopeOpenIcon,
  },
  whatsPoketto: {
    title: "什么是 Poketto.AI ?",
    link: URI.app.docs.intro,
  },
  whatsDora: {
    title: "什么是 Dora ?",
    link: URI.app.docs.currency,
  },
  learningCenter: {
    title: "文档/教程",
    link: URI.app.docs.learn,
  },
  charge: {
    title: "账号充值",
    Icon: BellIcon,
  },
}

export const platformMap: { [key in PlatformType]?: { homepage: string } } = {
  Poketto: {
    homepage: POKETTO_HOMEPAGE,
  },
  FlowGPT: {
    homepage: FLOWGPT_HOMEPAGE,
  },
}
