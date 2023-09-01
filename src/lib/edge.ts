import { customAlphabet } from "nanoid/non-secure"

export const getOrigin = () => (typeof window === "undefined" ? process.env.HOST! : window.location.origin)
export const isDomestic = () => getOrigin().includes(".cn")
/**
 * ai/nanoid
 */
export const nanoid = customAlphabet("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_", 5) // 这个要和prisma的位数对齐

export const createHttpAgent = async () => {
  if (!isDomestic()) return undefined
  const { HttpsProxyAgent } = await import("https-proxy-agent")
  return new HttpsProxyAgent("http://localhost:7890")
}
