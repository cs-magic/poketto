import { PrismaClient } from ".prisma/client"

import { defaultModelQuota } from "@/ds"

export const resetUsersQuota = async (db: PrismaClient) => {
  // 每个人都更新quota值
  await db.user.updateMany({
    data: {
      quota: defaultModelQuota,
    },
  })
}
