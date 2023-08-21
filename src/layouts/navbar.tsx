import React, { Fragment, type PropsWithChildren } from "react"
import { useTheme } from "next-themes"
import { IconBrightnessHalf, IconMoon, IconSearch, IconSun } from "@tabler/icons-react"
import { Skeleton } from "@/components/ui/skeleton"
import { useMount } from "@/hooks/use-mount"
import { BellIcon, GearIcon, QuestionMarkCircledIcon } from "@radix-ui/react-icons"
import { Icons } from "@/lib/assets"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { SidebarNavItem } from "@/components/link"
import { Button } from "@/components/ui/button"
import { useAppStore } from "@/store"
import { useHotkeys } from "@mantine/hooks"
import { Input } from "@/components/ui/input"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import _ from "lodash"
import { ICON_DIMENSION_SM, PRODUCT } from "@/config-const"
import { COMMANDS, navs } from "@/config-utils"

export const ThemeSwitcher = () => {
  const { theme, setTheme, themes } = useTheme()
  const mounted = useMount()

  if (!mounted || !theme) return <Skeleton className={"h-8 w-8"} />

  const nextTheme = themes[(themes.indexOf(theme) + 1) % themes.length]!
  return (
    <div onClick={() => setTheme(nextTheme)} className={"p-2 hover:bg-accent"}>
      {theme === "light" && <IconSun className={ICON_DIMENSION_SM} />}
      {theme === "dark" && <IconMoon className={ICON_DIMENSION_SM} />}
      {theme === "system" && <IconBrightnessHalf className={ICON_DIMENSION_SM} />}
    </div>
  )
}

export const LogoWithName = () => {
  const { toggleSidebar } = useAppStore()
  return (
    <Button variant={"ghost"} className={"shrink-0 justify-start gap-2"} onClick={toggleSidebar}>
      {/*<Logo height={24}/>*/}
      <Icons.logo />
      <span className={"whitespace-nowrap text-lg tracking-widest"}>{PRODUCT.name}</span>
    </Button>
  )
}

export const IconContainer = ({ children }: PropsWithChildren) => {
  return <div className={"p-2 hover:bg-accent"}>{children}</div>
}

export default function Navbar() {
  return (
    <div className={"flex items-center border-b px-4 py-2"}>
      <LogoWithName />

      <div className={"grow"} />
      <CommandDemo />

      <div className={"hidden items-center md:flex"}>
        <Popover>
          <PopoverTrigger>
            <IconContainer>
              <QuestionMarkCircledIcon />
            </IconContainer>
          </PopoverTrigger>

          <PopoverContent>
            <section className={"flex flex-col"}>
              <SidebarNavItem {...navs.whatsPoketto} />
              <SidebarNavItem {...navs.whatsDora} />
              <SidebarNavItem {...navs.learningCenter} />
              <SidebarNavItem {...navs.supportCenter} />
            </section>
          </PopoverContent>
        </Popover>

        <ThemeSwitcher />

        <IconContainer>
          <BellIcon />
        </IconContainer>

        <IconContainer>
          <GearIcon />
        </IconContainer>
      </div>
    </div>
  )
}

const CommandDemo = () => {
  const [open, setOpen] = React.useState(false)
  const { searchHistory: history, pushSearch: push } = useAppStore()

  const KEY = "K"
  useHotkeys([[`mod+${KEY}`, () => setOpen(!open)]])

  return (
    <>
      <div className={"| | relative flex w-[256px] items-center text-sm text-muted-foreground"}>
        <IconSearch className={"absolute left-2 wh-5"} />
        <Input className={"grow"} onFocus={() => setOpen(!open)} />
        <kbd className="pointer-events-none absolute right-2 hidden h-6  shrink-0  select-none items-center gap-1 rounded border bg-muted p-2 font-mono font-medium text-muted-foreground md:inline-flex">
          ⌘ {KEY}
        </kbd>
      </div>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList className={"max-h-[600px]"}>
          <CommandEmpty>No results found.</CommandEmpty>

          <CommandGroup heading="History">
            <div className={"flex flex-wrap gap-2"}>
              {history
                .map((id) => COMMANDS.find((command) => command.id === id)!)
                .map((item) => (
                  <CommandItem key={item.id} className={"flex items-center gap-2"}>
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
                    className={"flex items-center gap-2"}
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
