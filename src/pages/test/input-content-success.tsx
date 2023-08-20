import _ from "lodash"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { api } from "@/lib/api"
import { ConversationInput } from "@/components/conv/input"

/**
 * 测试 div 滚动 ✅
 */
export default function () {
  const userId = "irElP"
  const appId = "7mz-8"
  const { data: conv } = api.conv.get.useQuery({ conversation: { userId, appId } })

  return <div className={"flex flex-col gap-2 h-screen overflow-auto"}>{conv && <ConversationInput cid={conv.id} />}</div>
}
