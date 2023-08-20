import _ from "lodash"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { api } from "@/lib/api"

/**
 * 测试 div 滚动 ✅
 */
export default function () {
  const k = 2
  const userId = "irElP"
  const appId = "7mz-8"
  const { data: conv } = api.conv.get.useQuery({ conversation: { userId, appId } })
  const { data: messages = [] } = api.message.list.useQuery({ conversationId: conv?.id }, { enabled: !!conv })

  return (
    <div className={"flex flex-col gap-2 h-[600px] overflow-auto"}>
      <Link href={`#${k}`}>Jump to {k}</Link>

      <div className={"flex w-full h-full"}>
        <div className={"w-[200px] h-full"}>sidebar</div>

        <div className={"grow h-full flex flex-col gap-4"}>
          {messages.map((item, index) => (
            <div id={index.toString()} key={index} className={"w-full h-fit p-[100px]"} style={{ background: `hsl(200, 20%, ${index}%)` }}>
              {item.content}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
