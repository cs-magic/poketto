import { CommandType, type ICommandItem, type INavItem } from "@/ds"
import { IconLayoutDashboard } from "@tabler/icons-react"
import { EnvelopeOpenIcon, GearIcon, HomeIcon, LightningBoltIcon, MixIcon, RocketIcon, TargetIcon } from "@radix-ui/react-icons"
import React from "react"
import { type PromptRoleType } from ".prisma/client"
import { type NavKey, URI } from "@/config"
import { Icons } from "@/components/icons"

export const COMMANDS: ICommandItem[] = [
  {
    id: "Ask Poketto",
    icon: <Icons.productLogo />,
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
export const contentStyleBasedOnRole: Record<PromptRoleType, string> = {
  system: "bg-slate-700",
  function: "bg-destructive",
  user: "bg-green-600 text-black",
  assistant: "bg-muted text-primary-foreground/75 dark:bg-sidebar",
}
export const navs: Record<NavKey, INavItem> = {
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
