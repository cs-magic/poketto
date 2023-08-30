/**
 * Copyright (c) CS-Magic, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useRouter } from "next/router"

import { baseEnv } from "@/env.mjs"

import { POKETTO_APP_ID } from "@/config"

import { useUserId } from "@/hooks/use-user"

import { api } from "@/lib/api"
import { getConversationLink } from "@/lib/string"

export const useUrl = () => {
  const router = useRouter()
  const origin = typeof window !== "undefined" ? window.location.origin : baseEnv.HOST

  // console.log({ router })
  const baseUrl = `${origin}${router.asPath}`
  return { origin, baseUrl }
}

export const usePokettoConversationUrl = () => {
  const userId = useUserId()
  const { data: app } = api.app.get.useQuery(
    { platform: { platformId: POKETTO_APP_ID, platformType: "Poketto" } },
    { enabled: !!userId }
  )
  if (!userId || !app) return null
  return getConversationLink(userId, app.id)
}
