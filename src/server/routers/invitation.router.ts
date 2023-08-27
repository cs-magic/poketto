/**
 * Copyright (c) CS-Magic, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { createTRPCRouter, protectedProcedure } from "@/server/trpc.helpers"

export const invitationRouter = createTRPCRouter({
  list: protectedProcedure.query(
    async ({
      ctx: {
        prisma,
        session: { user },
      },
    }) => prisma.invitationRelation.findMany({ where: { fromId: user.id } })
  ),
})