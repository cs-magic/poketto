/**
 * Copyright (c) CS-Magic, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import React from "react"

import { useAppStore } from "@/store"

import { CardsLayoutType } from "@/ds"

import { RootLayout } from "@/layouts/root.layout"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SettingsPage() {
  const { cardsLayout, setCardsLayout } = useAppStore()

  // todo: in settings
  return (
    <RootLayout>
      <div className={"w-full max-w-[512px] m-auto p-2 overflow-auto | flex flex-wrap gap-2"}>
        <Card className={"w-full"}>
          <CardHeader>
            <CardTitle>UI</CardTitle>
          </CardHeader>

          <CardContent className={"w-full flex flex-col p-4 gap-2"}>
            <div className={"w-full | flex justify-between items-center gap-4"}>
              <Label className={"whitespace-nowrap"}>卡片布局</Label>
              <Select value={cardsLayout} onValueChange={setCardsLayout} defaultValue={cardsLayout}>
                <SelectTrigger className="w-28">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(CardsLayoutType).map((cl) => (
                    <SelectItem value={cl} key={cl}>
                      {cl}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card className={"w-full"}>
          <CardHeader>
            <CardTitle>Account</CardTitle>
          </CardHeader>

          <CardContent className={"w-full flex flex-col p-4 gap-2"}>
            <div className={"w-full | flex justify-between items-center gap-4"}>
              <Label className={"whitespace-nowrap"}>OpenAI API Key</Label>
              <Input value={""} />
            </div>
          </CardContent>
        </Card>
      </div>
    </RootLayout>
  )
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  }
}
