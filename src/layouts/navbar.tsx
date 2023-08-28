/**
 * Copyright (c) CS-Magic, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useHotkeys } from "@mantine/hooks"
import { GearIcon, LapTimerIcon, MagnifyingGlassIcon, MoonIcon, QuestionMarkCircledIcon, SunIcon } from "@radix-ui/react-icons"
import groupBy from "lodash/groupBy"
import { useTranslation } from "next-i18next"
import { useTheme } from "next-themes"
import Link from "next/link"
import { useRouter } from "next/router"
import React, { Fragment } from "react"
import { TbLanguage } from "react-icons/tb"

import { useAppStore } from "@/store"

import { ICON_DIMENSION_SM } from "@/config"
import { COMMANDS, menuGroups, menuItems } from "@/config-utils"

import { IconContainer } from "@/components/containers"
import { Icons } from "@/components/icons"
import { SidebarNavItem } from "@/components/link"
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

export function ThemeSwitcher() {
  const { theme, setTheme, themes } = useTheme()
  const mounted = useMount()

  if (!mounted || !theme) {
    return <Skeleton className="h-8 w-8" />
  }

  const nextTheme = themes[(themes.indexOf(theme) + 1) % themes.length]!
  return (
    <div onClick={() => setTheme(nextTheme)} className="hover:bg-accent">
      {theme === "light" && <SunIcon className={ICON_DIMENSION_SM} />}
      {theme === "dark" && <MoonIcon className={ICON_DIMENSION_SM} />}
      {theme === "system" && <LapTimerIcon className={ICON_DIMENSION_SM} />}
    </div>
  )
}

export const LocaleSwitcher = () => {
  const router = useRouter()
  const { i18n } = useTranslation()
  const languages = ["zh-CN", "en"]
  const curLanguage = i18n.language
  const nextLanguage = languages[(languages.findIndex((l) => l === curLanguage) + 1) % languages.length]
  // console.log({ curLanguage, nextLanguage })

  return (
    <TbLanguage
      className={"wh-5"}
      onClick={() => {
        void router.push(router.pathname, router.asPath, { locale: nextLanguage })
        // i18n.changeLanguage(nextLanguage)
      }}
    />
  )
}

/**
 * 晚点再开启公司模式，目前就一个业务，没有必要
 */
export function LogoWithName({ withCompany }: { withCompany?: false }) {
  const { t } = useTranslation()

  const productLogo = (
    <Link className="p-btn-horizontal w-fit shrink-0" href="/">
      <Icons.Product />
      <span className="hidden md:flex whitespace-nowrap text-lg tracking-widest">{t(`product.name`)}</span>
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

export default function Navbar() {
  return (
    <div className="flex items-center border-b px-4 py-2">
      <LogoWithName />

      <div className="grow" />
      <CommandDemo />

      <div className="hidden items-center md:flex mx-2">
        <IconContainer>
          <LocaleSwitcher />
        </IconContainer>

        <IconContainer>
          <ThemeSwitcher />
        </IconContainer>

        <Popover>
          <PopoverTrigger>
            <IconContainer>
              <QuestionMarkCircledIcon />
            </IconContainer>
          </PopoverTrigger>

          <PopoverContent>
            <section className="flex flex-col gap-2">
              {menuItems
                .filter((k) => menuGroups.question!.includes(k.field))
                .map((item) => (
                  <SidebarNavItem key={item.field} {...item} />
                ))}
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
        <MagnifyingGlassIcon className="absolute left-2 wh-5" />
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
                .map((Item) => (
                  <CommandItem key={Item.id} className="flex items-center gap-2">
                    <Item.Icon />
                    <span>{Item.title ?? Item.id}</span>
                  </CommandItem>
                ))}
            </div>
          </CommandGroup>

          {Object.entries(groupBy(COMMANDS, "category")).map(([cat, items]) => (
            <Fragment key={cat}>
              <CommandSeparator />
              <CommandGroup heading={cat} key={cat}>
                {items.map((Item) => (
                  <CommandItem
                    key={Item.id}
                    className="flex items-center gap-2"
                    onSelect={() => {
                      // ref: https://github.com/pacocoursey/cmdk#nested-items
                      console.log("selected ", Item)
                      push(Item.id)
                    }}
                  >
                    <Item.Icon />
                    <span>{Item.title ?? Item.id}</span>
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
