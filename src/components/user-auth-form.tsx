"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { signIn } from "next-auth/react"
import { useTranslation } from "next-i18next"
import { useSearchParams } from "next/navigation"
import * as React from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import type * as z from "zod"

import { Icons } from "@/components/icons"
import { buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { useLocale } from "@/hooks/use-i18n"
import { useMustache } from "@/hooks/use-mustache"

import { cn } from "@/lib/utils"
import { userAuthSchema } from "@/lib/validations/auth"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

type FormData = z.infer<typeof userAuthSchema>

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const { t } = useTranslation()
  const m = useMustache()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userAuthSchema),
  })
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [isGitHubLoading, setIsGitHubLoading] = React.useState<boolean>(false)
  const [isDiscordLoading, setIsDiscordLoading] = React.useState<boolean>(false)
  const searchParams = useSearchParams()
  const locale = useLocale()
  // console.log("UserAuthForm: ", { locale })

  async function onSubmit(data: FormData) {
    setIsLoading(true)

    const email = data.email.toLowerCase()
    try {
      // const signInResult = false
      const signInResult = await signIn(
        "email",
        {
          email,
          redirect: false,
          callbackUrl: searchParams?.get("from") || "/dashboard",
        },
        { locale }
      )

      setIsLoading(false)

      console.log("signInResult: ", { signInResult })
      if (!signInResult?.ok || signInResult.error !== null) return toast.error(t("auth:LoginFailed"))

      return toast.success(m(t("auth:MailSent"), { email }))
    } catch (error) {
      console.log({ error })
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading || isGitHubLoading}
              {...register("email")}
              // defaultValue={baseEnv.NODE_ENV === "development" ? "mark@cs-magic.com" : undefined}
            />
            {errors?.email && <p className="px-1 text-xs text-red-600">{errors.email.message}</p>}
          </div>
          <button type="submit" className={cn(buttonVariants())} disabled={isLoading}>
            {isLoading && <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />}
            {t("auth:SignInWithEmail")}
          </button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">{t("auth:OrContinueWith")}</span>
        </div>
      </div>

      <button
        type="button"
        className={cn(buttonVariants({ variant: "outline" }))}
        onClick={() => {
          setIsGitHubLoading(true)
          void signIn("github")
        }}
        disabled={isLoading || isGitHubLoading}
      >
        {isGitHubLoading ? (
          <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.GitHub className="mr-2 h-4 w-4" />
        )}{" "}
        Github
      </button>

      <button
        type="button"
        className={cn(buttonVariants({ variant: "outline" }))}
        onClick={() => {
          setIsDiscordLoading(true)
          void signIn("discord")
        }}
        disabled={isLoading || isGitHubLoading}
      >
        {isDiscordLoading ? (
          <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.Discord className="mr-2 h-4 w-4" />
        )}{" "}
        Discord
      </button>
    </div>
  )
}
