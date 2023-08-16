import _ from "lodash"
import logger from "@/lib/logger"

const data = [
  { a: 1, k: false },
  { a: 2, k: true },
  { a: 0, k: true },
]

const data_ = _(data)
  .sortBy((g) => {
    console.log(g)
    return [-g.k, g.a]
  })
  .value()

logger.info({ data, data_ })
