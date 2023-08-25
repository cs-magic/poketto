// import { IconCalendarFilled, IconEye, IconStackPush } from "@tabler/icons-react"
import type { ElementType } from "react"

import type { SortOrder } from "@/ds"

export const Order2icon: { [key in SortOrder]: ElementType } = {
  mostViewed: () => null, // IconEye,
  mostUsed: () => null, // IconStackPush,
  // mostSaved: IconDownload,
  // mostShared: IconTrendingUp,
  new: () => null, // IconCalendarFilled,

  // recommend: IconStackPush,
  // top: IconThumbUp,
  // mostViewed: IconEye,
  // "most-saved": IconDownload,
  // trending: IconTrendingUp,
  // follow: IconTelescope,
}
