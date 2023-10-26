export const getOrigin = () =>
  typeof window === "undefined" ? process.env.HOST ?? "http://localhost" : window.location.origin
export const isDomestic = () => getOrigin().includes(".cn")
export const getServerId = () => Number(isDomestic())
