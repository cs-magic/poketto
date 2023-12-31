import Mustache from "mustache"

import { useUser } from "@/hooks/use-user"


export const useMustache = () => {
  const { user } = useUser()
  return (s: string, dict?: { [key: string]: string | number | boolean }) => {
    const d = { ...{ userName: user?.name }, ...(dict ?? {}) }
    try {
      return Mustache.render(s.replace(/\n+/g, "\n\n"), d)
    } catch (e) {
      // Error: Unclosed tag at xxxx
      return s
    }
  }
}