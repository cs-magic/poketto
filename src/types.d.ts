declare global {
  namespace PrismaJson {
    // 要放在里面
    import { type Message } from "ai/react"

    // you can use typical basic types
    type ModelArgs = {
      prompts: Message[]
    }
  }
}

declare module "*.svg" {
  import type React from "react"
  const SVG: React.VFC<React.SVGProps<SVGSVGElement>>
  export default SVG
}
