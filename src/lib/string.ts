/**
 * Copyright (c) CS-Magic, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import hash from "js-sha1"
import { capitalize } from "lodash"

import { FLOWGPT_IMAGE_DIR } from "@/config"

import { type IMAGE_SIZE } from "@/ds"

import { FLOWGPT_HOMEPAGE } from "@/const"

export const getShortName = (s: string, len: number = 2) =>
  s
    .split(/\s+/)
    .slice(0, len)
    .map((i) => capitalize(i[0]))
    .join("")

/**
 * ref: https://robohash.org/
 */
export const getRobotAvatar = (
  key: string,
  {
    width = 256,
    height = 256,
    mode = 4,
  }: {
    width?: number
    height?: number
    mode?: number
  } = {}
) => `https://robohash.org/${key}?set=set${mode}&size=${width}x${height}`

export const getConversationsLink = (userId: string) => `/c/${userId}`
export const getConversationLink = (userId: string, appId: string) => `/c/${userId}/${appId}`
export const getAppLink = (appId: string) => `/p/${appId}`

// export const getFlowgptUserLink = (userId: string) => `${FLOWGPT_URL}/user/${userId}`
export const getFlowgptUserLink = (userId: string) => `${FLOWGPT_HOMEPAGE}/@${userId}`
export const getUserLink = (userId: string) => `/u/${userId}`

export const getWelcomeSystemNotification = (userName: string, appName?: string) =>
  `Welcome ${userName}${appName ? `to join the ${appName}` : ""} !`

export const getLocalFlowgptImageUri = (uri: string, size: IMAGE_SIZE = "xs"): string => {
  let result: string
  if (uri.startsWith("/") || size === "raw") {
    result = uri
  } else if (uri.startsWith("http")) {
    result = `${FLOWGPT_IMAGE_DIR}/thumbs/${size}/${hash(uri)}.jpg`
  } else {
    result = getRobotAvatar(uri, size === "xs" ? { width: 64, height: 64 } : { width: 256, height: 256 })
  }
  // console.log({ uri, size, result })
  return result
}
