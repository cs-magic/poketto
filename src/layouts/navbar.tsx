/**
 * Copyright (c) CS-Magic, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useHotkeys } from "@mantine/hooks"
import { BellIcon, GearIcon, LightningBoltIcon, QuestionMarkCircledIcon } from "@radix-ui/react-icons"
import { IconBrightnessHalf, IconMoon, IconSearch, IconSun } from "@tabler/icons-react"
import _ from "lodash"
import { useTheme } from "next-themes"
import Link from "next/link"
import type { HTMLProps, PropsWithChildren } from "react"
import React, { Fragment } from "react"

import { useAppStore } from "@/store"

import { ICON_DIMENSION_SM, siteConfig } from "@/config"
import { COMMANDS, navs } from "@/config-utils"

import { ChargeContainer } from "@/components/containers"
import { Icons } from "@/components/icons"
import { SidebarNavItem } from "@/components/link"
import { Button } from "@/components/ui/button"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"

import { useMount } from "@/hooks/use-mount"
import { useUserId } from "@/hooks/use-user"

import clsx from "@/lib/clsx"

export function ThemeSwitcher() {
  const { theme, setTheme, themes } = useTheme()
  const mounted = useMount()

  if (!mounted || !theme) {
    return <Skeleton className="h-8 w-8" />
  }

  const nextTheme = themes[(themes.indexOf(theme) + 1) % themes.length]!
  return (
    <div onClick={() => setTheme(nextTheme)} className="p-2 hover:bg-accent">
      {theme === "light" && <IconSun className={ICON_DIMENSION_SM} />}
      {theme === "dark" && <IconMoon className={ICON_DIMENSION_SM} />}
      {theme === "system" && <IconBrightnessHalf className={ICON_DIMENSION_SM} />}
    </div>
  )
}

/**
 * 晚点再开启公司模式，目前就一个业务，没有必要
 */
export function LogoWithName({ withCompany }: { withCompany?: false }) {
  const productLogo = (
    <Link className="p-btn-horizontal w-fit" href="/">
      <Icons.Product />
      <span className="whitespace-nowrap text-lg tracking-widest">{siteConfig.name}</span>
    </Link>
  )
  return withCompany ? (
    // 学 vercel 的，ref: https://nextjs.org/docs/messages/prerender-error
    <div className="flex items-center gap-2 h-8">
      <Link href="https://cs-magic.com" className="hidden md:flex">
        <IconContainer>
          <Icons.Company className="wh-8" />
        </IconContainer>
      </Link>

      <Separator orientation="vertical" className="rotate-[30deg] mx-2 hidden md:flex" />

      {productLogo}
    </div>
  ) : (
    productLogo
  )
}

export function IconContainer({ children, className, ...props }: PropsWithChildren & HTMLProps<HTMLDivElement>) {
  return (
    <div className={clsx("p-2 hover:bg-accent rounded-lg inline-flex items-center gap-1", className)} {...props}>
      {children}
    </div>
  )
}

export default function Navbar() {
  const userId = useUserId()
  return (
    <div className="flex items-center border-b px-4 py-2">
      <LogoWithName />

      <div className="grow" />
      <CommandDemo />

      <div className="hidden items-center md:flex mx-2">
        <ChargeContainer>
          <IconContainer>
            <LightningBoltIcon />
          </IconContainer>
        </ChargeContainer>

        <ThemeSwitcher />

        <IconContainer>
          <BellIcon />
        </IconContainer>

        <Popover>
          <PopoverTrigger>
            <IconContainer>
              <QuestionMarkCircledIcon />
            </IconContainer>
          </PopoverTrigger>

          <PopoverContent>
            <section className="flex flex-col">
              <SidebarNavItem {...navs.whatsPoketto} />
              <SidebarNavItem {...navs.whatsDora} />
              <SidebarNavItem {...navs.learningCenter} />
              <SidebarNavItem {...navs.supportCenter} />
            </section>
          </PopoverContent>
        </Popover>

        <IconContainer>
          <GearIcon />
        </IconContainer>
      </div>
    </div>
  )
}

function CommandDemo() {
  const [open, setOpen] = React.useState(false)
  const { searchHistory: history, pushSearch: push } = useAppStore()

  const KEY = "K"
  useHotkeys([[`mod+${KEY}`, () => setOpen(!open)]])

  return (
    <>
      <div className="| | relative flex w-[256px] items-center text-sm text-muted-foreground">
        <IconSearch className="absolute left-2 wh-5" />
        <Input className="grow" onFocus={() => setOpen(!open)} />
        <kbd className="pointer-events-none absolute right-2 hidden h-6  shrink-0  select-none items-center gap-1 rounded border bg-muted p-2 font-mono font-medium text-muted-foreground md:inline-flex">
          ⌘ {KEY}
        </kbd>
      </div>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList className="max-h-[600px]">
          <CommandEmpty>No results found.</CommandEmpty>

          <CommandGroup heading="History">
            <div className="flex flex-wrap gap-2">
              {history
                .map((id) => COMMANDS.find((command) => command.id === id)!)
                .map((item) => (
                  <CommandItem key={item.id} className="flex items-center gap-2">
                    {item.icon}
                    <span>{item.title ?? item.id}</span>
                  </CommandItem>
                ))}
            </div>
          </CommandGroup>

          {Object.entries(_.groupBy(COMMANDS, "category")).map(([cat, items]) => (
            <Fragment key={cat}>
              <CommandSeparator />
              <CommandGroup heading={cat} key={cat}>
                {items.map((item) => (
                  <CommandItem
                    key={item.id}
                    className="flex items-center gap-2"
                    onSelect={() => {
                      // ref: https://github.com/pacocoursey/cmdk#nested-items
                      console.log("selected ", item)
                      push(item.id)
                    }}
                  >
                    {item.icon}
                    <span>{item.title ?? item.id}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </Fragment>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  )
}
