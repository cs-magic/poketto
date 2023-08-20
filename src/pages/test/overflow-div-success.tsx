import _ from "lodash"
import { Button } from "@/components/ui/button"
import Link from "next/link"

/**
 * 测试 div 滚动 ✅
 */
export default function () {
  const k = 13
  return (
    <div>
      <Link href={`#${k}`}>Jump to {k}</Link>

      <div className={"h-[600px] overflow-auto"}>
        {_.range(100).map((item, index) => (
          <div id={index.toString()} key={index} className={"w-full h-[20px]"} style={{ background: `hsl(200, 20%, ${index}%)` }}>
            {index}
          </div>
        ))}
      </div>
    </div>
  )
}
