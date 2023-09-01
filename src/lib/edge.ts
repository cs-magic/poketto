import { customAlphabet } from "nanoid/non-secure"

export const getOrigin = () => (typeof window === "undefined" ? process.env.HOST! : window.location.origin)
export const isDomestic = () => getOrigin().includes(".cn")
/**
 * ai/nanoid
 */
export const nanoid = customAlphabet("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_", 5) // 这个要和prisma的位数对齐
