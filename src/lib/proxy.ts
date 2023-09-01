import { isDomestic } from "@/lib/router"

export const createHttpAgent = async () => {
  if (!isDomestic()) return undefined
  const { HttpsProxyAgent } = await import("https-proxy-agent")
  return new HttpsProxyAgent("http://localhost:7890")
}