import { prisma } from "@/server/db"

import { defaultModelQuota } from "@/ds"

import d from "@/lib/datetime"

export const resetQuotaDaily = async () => {
  // 每个人都更新quota值
  await prisma.user.updateMany({
    data: {
      quota: defaultModelQuota,
    },
  })
  console.log(d(new Date()).format("hh:mm:ss"), "updated quota")
}

void resetQuotaDaily()
