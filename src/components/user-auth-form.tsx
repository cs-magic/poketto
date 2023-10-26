"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { DiscordLogoIcon } from "@radix-ui/react-icons"
import { signIn } from "next-auth/react"
import { useTranslation } from "next-i18next"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useRouter } from "next/router"
import * as React from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { POKETTO_INTERNATIONAL_HOME, POKETTO_MAINLAND_CHINA_HOME } from "@/config"

import { GithubIcon, SpinnerIcon } from "@/components/icons"
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { useLocale } from "@/hooks/use-i18n"
import { useMustache } from "@/hooks/use-mustache"

import { getOrigin } from "@/lib/router"
import { cn } from "@/lib/utils"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const userAuthSchema = z.object({
  email: z.string().email(),
})
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
  const router = useRouter()

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
          callbackUrl: searchParams?.get("from") || "/",
        },
        { locale, origin },
      )

      setIsLoading(false)

      console.log("signInResult: ", { signInResult })
      if (!signInResult?.ok || signInResult.error !== null) return toast.error(t("auth:LoginFailed"))

      toast.success(m(t("auth:MailSent"), { email }))
      void router.push("/")
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
            {isLoading && <SpinnerIcon className="mr-2 h-4 w-4 animate-spin" />}
            {t("auth:SignInWithEmail")}
          </button>
        </div>
      </form>

      {/* 国内的OAuth会超过3.5秒 */}
      {!getOrigin().includes("cn") && (
        <>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">{t("common:OrContinueWith")}</span>
            </div>
          </div>

          <button
            type="button"
            className={cn(buttonVariants({ variant: "outline" }))}
            onClick={() => {
              setIsGitHubLoading(true)
              void signIn("github", { callbackUrl: "/" })
            }}
            disabled={isLoading || isGitHubLoading}
          >
            {isGitHubLoading ? (
              <SpinnerIcon className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <GithubIcon className="mr-2 h-4 w-4" />
            )}{" "}
            Github
          </button>

          <button
            type="button"
            className={cn(buttonVariants({ variant: "outline" }))}
            onClick={() => {
              setIsDiscordLoading(true)
              void signIn("discord", { callbackUrl: "/" })
            }}
            disabled={isLoading || isGitHubLoading}
          >
            {isDiscordLoading ? (
              <SpinnerIcon className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <DiscordLogoIcon className="mr-2 h-4 w-4" />
            )}{" "}
            Discord
          </button>
        </>
      )}

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">{t("common:OrYouCanAlso")}</span>
        </div>
      </div>

      {getOrigin().includes("cn") ? (
        <Link href={`${POKETTO_INTERNATIONAL_HOME}/login`} className={"w-full"}>
          <Button variant={"outline"} className={"w-full"}>
            使用国际版
          </Button>
        </Link>
      ) : (
        <Link href={`${POKETTO_MAINLAND_CHINA_HOME}/login`} className={"w-full"}>
          <Button variant={"outline"} className={"w-full"}>
            Jump to Mainland China version
          </Button>
        </Link>
      )}
    </div>
  )
}
