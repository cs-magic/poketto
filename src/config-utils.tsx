/**
 * Copyright (c) CS-Magic, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import type { PlatformType, PromptRoleType } from ".prisma/client"
import { EnvelopeOpenIcon, GearIcon, HomeIcon, LightningBoltIcon, MixIcon, RocketIcon, TargetIcon } from "@radix-ui/react-icons"
import { IconLayoutDashboard } from "@tabler/icons-react"
import React from "react"

import { type NavKey, POKETTO_HOMEPAGE, URI } from "@/config"

import { CommandType, type ICommandItem, type INavItem } from "@/ds"

import { Icons } from "@/components/icons"

import { FLOWGPT_HOMEPAGE } from "@/const"

export const COMMANDS: ICommandItem[] = [
  {
    id: "Ask Poketto",
    icon: <Icons.Product />,
    category: CommandType.suggestion,
    kbd: "⌘ D",
  },
  {
    id: "Dashboard",
    icon: <IconLayoutDashboard />,
    category: CommandType.settings,
    kbd: "⌘ D",
  },
  {
    id: "Explore",
    icon: <GearIcon />,
    category: CommandType.settings,
    kbd: "⌘ E",
  },
]
export const contentStyleBasedOnRole: { [key in PromptRoleType]: string } = {
  system: "bg-slate-700",
  function: "bg-destructive",
  user: "bg-green-600 text-black",
  assistant: "bg-muted text-primary-foreground/75 dark:bg-sidebar",
}
export const navs: { [key in NavKey]: INavItem } = {
  home: {
    title: "home",
    link: URI.app.home,
    Icon: HomeIcon,
  },
  explore: {
    title: "explore",
    link: URI.app.explore,
    Icon: RocketIcon,
  },
  dashboard: {
    title: "dashboard",
    link: URI.user.dashboard,
    Icon: MixIcon,
  },
  gallery: {
    title: "gallery",
    link: URI.user.gallery,
    Icon: TargetIcon,
  },
  waitlist: {
    title: "Join Platform Waitlist",
    link: URI.user.seek.waitlist,
    Icon: LightningBoltIcon,
  },
  enterprise: {
    title: "poketto enterprise",
    link: URI.user.seek.enterprise,
    Icon: EnvelopeOpenIcon,
  },
  whatsPoketto: {
    title: "What's Poketto.AI ?",
    link: URI.app.docs.intro,
  },
  whatsDora: {
    title: "What's Dora ?",
    link: URI.app.docs.currency,
  },
  learningCenter: {
    title: "Learning Center",
    link: URI.app.docs.learn,
  },
  supportCenter: {
    title: "Support Center",
    link: URI.app.docs.support,
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
