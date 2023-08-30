/**
 * Copyright (c) CS-Magic, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { type Metadata } from "next"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import Link from "next/link"

import { RootLayout } from "@/layouts/root.layout"

import { Icons } from "@/components/icons"
import { buttonVariants } from "@/components/ui/button"
import { UserAuthForm } from "@/components/user-auth-form"

import { useUrl } from "@/hooks/use-url"

import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
}

export default function LoginPage() {
  const { t } = useTranslation()

  return (
    <RootLayout>
      <div className="container relative flex h-full w-full overflow-auto flex-col items-center justify-center">
        <Link href="/" className={cn(buttonVariants({ variant: "ghost" }), "absolute left-4 top-4 md:left-8 md:top-8")}>
          <>
            <Icons.ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </>
        </Link>
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <Icons.Product className="mx-auto h-6 w-6" />
            <h1 className="text-2xl font-semibold tracking-tight">{t("auth:WelcomeBack")}</h1>
            <p className="text-sm text-muted-foreground">{t("auth:LoginViaEmail")}</p>
          </div>

          <UserAuthForm />

          {/* <p className="px-8 text-center text-sm text-muted-foreground"> */}
          {/*  <Link href="/register" className="hover:text-brand underline underline-offset-4"> */}
          {/*    Don&apos;t have an account? Sign Up */}
          {/*  </Link> */}
          {/* </p> */}

          {/* todo: 条款和隐私政策 */}
          {/* <p className="px-8 text-center text-sm text-muted-foreground"> */}
          {/*  By clicking continue, you agree to our{" "} */}
          {/*  <Link href="/terms" className="hover:text-brand underline underline-offset-4"> */}
          {/*    Terms of Service */}
          {/*  </Link>{" "} */}
          {/*  and{" "} */}
          {/*  <Link href="/privacy" className="hover:text-brand underline underline-offset-4"> */}
          {/*    Privacy Policy */}
          {/*  </Link> */}
          {/*  . */}
          {/* </p> */}
        </div>
      </div>
    </RootLayout>
  )
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "auth"])),
    },
  }
}
