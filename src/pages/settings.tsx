import { signOut } from "next-auth/react"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useRouter } from "next/router"
import React from "react"
import { toast } from "sonner"

import { useAppStore } from "@/store"

import { URI } from "@/config"

import { CardsLayoutType } from "@/ds"

import { IconContainer } from "@/components/containers"
import { LocaleSwitcher, ThemeSwitcher } from "@/components/layouts/navbar"
import { RootLayout } from "@/components/layouts/root.layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { useUser } from "@/hooks/use-user"

import { api } from "@/lib/api"

export default function SettingsPage() {
  const { cardsLayout, setCardsLayout } = useAppStore()
  const { t } = useTranslation()
  const { user } = useUser()

  const router = useRouter()
  const logout = () => {
    void signOut()
    void router.push(URI.user.auth.logIn)
  }

  const { mutateAsync: delUser } = api.user.del.useMutation({
    onSuccess: () => {
      toast.success("成功删除账号")
      void logout()
    },
  })

  // todo: in settings
  return (
    <RootLayout>
      <div className={"w-full max-w-[512px] m-auto overflow-auto | flex flex-wrap p-4 gap-4"}>
        {/* general config */}
        <Card className={"w-full"}>
          <CardHeader>
            <CardTitle>{t("settings:general")}</CardTitle>
          </CardHeader>
          <CardContent className={"w-full flex flex-col p-4 gap-2"}>
            <div className={"w-full | flex justify-between items-center gap-4"}>
              <Label className={"whitespace-nowrap"}>{t("settings:language")}</Label>
              <IconContainer>
                <LocaleSwitcher />
              </IconContainer>
            </div>

            <div className={"w-full | flex justify-between items-center gap-4"}>
              <Label className={"whitespace-nowrap"}>{t("settings:theme")}</Label>
              <IconContainer>
                <ThemeSwitcher />
              </IconContainer>
            </div>

            <div className={"w-full | flex justify-between items-center gap-4"}>
              <Label className={"whitespace-nowrap"}>{t("settings:cardsLayout")}</Label>
              <Select value={cardsLayout} onValueChange={setCardsLayout} defaultValue={cardsLayout}>
                <SelectTrigger className="w-28">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(CardsLayoutType).map((cl) => (
                    <SelectItem value={cl} key={cl}>
                      {t(`settings:${cl}`)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Poketto Config */}
        {/*<Card className={"w-full"}>*/}
        {/*  <CardHeader>*/}
        {/*    <CardTitle>Poketto {t("common:general.config")}</CardTitle>*/}
        {/*  </CardHeader>*/}

        {/*  <CardContent className={"w-full flex flex-col p-4 gap-2"}>*/}
        {/*    <div className={"w-full | flex justify-between items-center gap-4"}>*/}
        {/*      <Label className={"whitespace-nowrap"}>{t("common:general.model")}</Label>*/}
        {/*      <Select value={cardsLayout} onValueChange={setCardsLayout} defaultValue={cardsLayout}>*/}
        {/*        <SelectTrigger className="w-28">*/}
        {/*          <SelectValue />*/}
        {/*        </SelectTrigger>*/}
        {/*        <SelectContent>*/}
        {/*          {Object.values(CardsLayoutType).map((cl) => (*/}
        {/*            <SelectItem value={cl} key={cl}>*/}
        {/*              {t(`settings:${cl}`)}*/}
        {/*            </SelectItem>*/}
        {/*          ))}*/}
        {/*        </SelectContent>*/}
        {/*      </Select>*/}
        {/*    </div>*/}
        {/*  </CardContent>*/}
        {/*</Card>*/}

        {/* account config */}
        <Card className={"w-full"}>
          <CardHeader>
            <CardTitle>{t("settings:account")}</CardTitle>
          </CardHeader>

          <CardContent className={"w-full flex flex-col p-4 gap-2"}>
            <div className={"w-full | flex justify-between items-center gap-4"}>
              <Label className={"whitespace-nowrap"}>OpenAI API Key</Label>
              <Input placeholder={"todo"} disabled />
            </div>

            {user && (
              <Button variant="destructive" onClick={logout} className={"w-full"}>
                {t("common:LogOut")}
              </Button>
            )}
            {user && (
              <Button variant="destructive" onClick={() => delUser()} className={"w-full"}>
                注销账号
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </RootLayout>
  )
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "settings"])),
    },
  }
}
