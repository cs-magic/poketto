import { capitalize } from "lodash"
import { FLOWGPT_IMAGE_DIR } from "@/config"
import hash from "js-sha1"

import { type IMAGE_SIZE } from "@/ds"

export const getShortName = (s: string, len: number = 2) => {
  return s
    .split(/\s+/)
    .slice(0, len)
    .map((i) => capitalize(i[0]))
    .join("")
}

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
) => {
  return `https://robohash.org/${key}?set=set${mode}&size=${width}x${height}`
}

export const getConversationsLink = (userId: string) => `/c/${userId}`
export const getConversationLink = (userId: string, appId: string) => `/c/${userId}/${appId}`
export const getAppLink = (appId: string) => `/p/${appId}`

export const getUserLink = (userId: string) => `https://flowgpt.com/user/${userId}`

export const getWelcomeSystemNotification = (userName: string, appName?: string) =>
  `Welcome ${userName}` + (appName ? `to join the ${appName}` : "") + " !"

export const getLocalFlowgptImageUri = (uri: string, size: IMAGE_SIZE = "xs"): string => {
  if (uri.startsWith("/") || size === "raw") return uri
  return `${FLOWGPT_IMAGE_DIR}/thumbs/${size}/${hash(uri)}.jpg`
}
