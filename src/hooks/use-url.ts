import { useRouter } from "next/router"

export const useUrl = () => {
  const router = useRouter()
  const origin = window?.location.origin ? window.location.origin : ""

  // console.log({ router })
  const baseUrl = `${origin}${router.asPath}`
  return { origin, baseUrl }
}
