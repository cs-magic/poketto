export const getOrigin = () => (typeof window === "undefined" ? process.env.HOST! : window.location.origin)
export const isDomestic = () => getOrigin().includes(".cn")
