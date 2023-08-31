/**
 * Copyright (c) CS-Magic, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Icons } from "./components/icons"
import type { PromptRoleType } from ".prisma/client"
import { Prisma } from ".prisma/client"
import { StripeSubscriptionLevel } from "@prisma/client"
import { BellIcon, GearIcon, HandIcon, HomeIcon, MixIcon, RocketIcon, TargetIcon } from "@radix-ui/react-icons"

import { URI } from "@/config"

import { CommandType, type ICommandItem, type IMenuItem, MenuKey } from "@/ds"

import StripeProductUncheckedCreateInput = Prisma.StripeProductUncheckedCreateInput

export const COMMANDS: ICommandItem[] = [
  {
    id: "Ask Poketto",
    Icon: Icons.Product,
    category: CommandType.suggestion,
    kbd: "⌘ P",
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
  { field: "account", link: URI.user.mySpace, Icon: MixIcon },
  { field: "myGallery", link: URI.user.myGallery, Icon: TargetIcon },
  { field: "feedback", link: URI.user.feedback, Icon: HandIcon },
  { field: "whatsPoketto", link: URI.app.docs.intro },
  { field: "whatsDora", link: URI.app.docs.currency },
  { field: "learningCenter", link: URI.app.docs.learn },
  { field: "charge", Icon: BellIcon, link: URI.user.charge },
  { field: "settings", Icon: GearIcon, link: URI.user.settings },
]
export const menuGroups: Record<string, MenuKey[]> = {
  question: ["whatsPoketto", "whatsDora", "learningCenter"],
  mobileFooters: ["homepage", "explore", "account", "settings"],
}
export const sidebarSections: Record<string, MenuKey[]> = {
  section1: ["homepage", "explore"],
  section2: ["account", "settings"],
}

// products list, ref: https://dashboard.stripe.com/products?active=true
export const paymentProducts: StripeProductUncheckedCreateInput[] = [
  { id: "prod_OVgbKpNEmJJXIy", price: 10, currency: "USD", mode: "payment" },
  { id: "prod_OVgYAVpLO6oLje", price: 9.99, currency: "USD", mode: "subscription", level: "premium", expire: 30 },
  { id: "prod_OVgZnKD7Fc2bsQ", price: 29.99, currency: "USD", mode: "subscription", level: "extreme", expire: 30 },

  { id: "prod_OOeVuH6LpHINCO", price: 9.99, currency: "CNY", mode: "payment" },
  { id: "prod_OOeF8lXiDVIMlS", price: 9.99, currency: "CNY", mode: "subscription", level: "basic", expire: 30 },
  { id: "prod_OOeH04oe1Sm67z", price: 29.99, currency: "CNY", mode: "subscription", level: "premium", expire: 30 },
  { id: "prod_OOeIvw7nucInBz", price: 49.99, currency: "CNY", mode: "subscription", level: "extreme", expire: 30 },
]
export const subscriptionLevel2Unit: Record<StripeSubscriptionLevel, number> = {
  basic: 1,
  premium: 2,
  extreme: 3,
}
