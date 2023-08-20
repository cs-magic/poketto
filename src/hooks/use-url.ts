import { useRouter } from "next/router"

export const useUrl = () => {
  const { asPath } = useRouter()
  const origin = window?.location.origin ? window.location.origin : ""

  const path = asPath
  const url = `${origin}${path}`
  return { origin, url, path }
}
