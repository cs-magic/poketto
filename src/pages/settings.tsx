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

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SettingsPage() {
  const { cardsLayout, setCardsLayout } = useAppStore()

  // todo: in settings
  return (
    <Select value={cardsLayout} onValueChange={setCardsLayout}>
      <SelectTrigger className="w-28 hidden md:flex">
        <SelectValue placeholder="卡片布局" />
      </SelectTrigger>
      <SelectContent>
        {Object.values(CardsLayoutType).map((cl) => (
          <SelectItem value={cl} key={cl}>
            {cl}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  }
}
