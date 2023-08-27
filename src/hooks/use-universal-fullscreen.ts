import { useFullscreen } from "@mantine/hooks"

import { useAppStore } from "@/store"


export const useUniversalFullscreen = () => {
  const { switchFullscreen, fullscreen: fullscreenStore } = useAppStore()
  const { ref, toggle, fullscreen: fullscreenUse } = useFullscreen()
  const toggleAll = () => {
    const f = document.fullscreenEnabled ? toggle : switchFullscreen
    f()
  }
  const fullscreen = fullscreenStore || fullscreenUse
  return { fullscreen, toggle: toggleAll, ref }
}