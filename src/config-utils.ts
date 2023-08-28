/**
 * Copyright (c) CS-Magic, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Icons } from "./components/icons"
import type { PlatformType, PromptRoleType } from ".prisma/client"
import { BellIcon, DashboardIcon, GearIcon, HandIcon, HomeIcon, MixIcon, RocketIcon, TargetIcon } from "@radix-ui/react-icons"

import { POKETTO_HOMEPAGE, URI } from "@/config"

import { CommandType, type ICommandItem, type IMenuItem, MenuKey } from "@/ds"

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
export const menuItems: IMenuItem[] = [
  { field: "homepage", link: URI.app.home, Icon: HomeIcon },
  { field: "explore", link: URI.app.explore, Icon: RocketIcon },
  { field: "mySpace", link: URI.user.mySpace, Icon: MixIcon },
  { field: "myGallery", link: URI.user.myGallery, Icon: TargetIcon },
  { field: "feedback", link: URI.user.seek.feedback, Icon: HandIcon },
  { field: "whatsPoketto", link: URI.app.docs.intro },
  { field: "whatsDora", link: URI.app.docs.currency },
  { field: "learningCenter", link: URI.app.docs.learn },
  { field: "charge", Icon: BellIcon, link: URI.user.charge },
  { field: "settings", Icon: GearIcon, link: URI.user.settings },
]
export const menuGroups: Record<string, MenuKey[]> = {
  question: ["whatsPoketto", "whatsDora", "learningCenter"],
  mobileFooters: ["homepage", "explore", "mySpace", "settings"],
}
export const sidebarSections: Record<string, MenuKey[]> = {
  section1: ["homepage", "explore"],
  section2: ["mySpace", "myGallery"],
  section3: ["charge", "feedback"],
}

export const platformMap: { [key in PlatformType]?: { homepage: string } } = {
  Poketto: {
    homepage: POKETTO_HOMEPAGE,
  },
  FlowGPT: {
    homepage: FLOWGPT_HOMEPAGE,
  },
}
