import _ from "lodash"
import { Button } from "@/components/ui/button"
import Link from "next/link"

/**
 * 测试 div 滚动 ✅
 */
export default function () {
  const k = 13
  return (
    <div className={"flex flex-col gap-2 h-[600px] overflow-auto"}>
      <Link href={`#${k}`}>Jump to {k}</Link>
      {_.range(100).map((item, index) => (
        <div id={index.toString()} key={index} className={"w-full h-[20px]"} style={{ background: `hsl(200, 20%, ${index}%)` }}>
          {index}
        </div>
      ))}
    </div>
  )
}
