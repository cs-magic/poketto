/**
 * Copyright (c) CS-Magic, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { createTRPCRouter, protectedProcedure } from "@/server/trpc-helpers"

export const billRouter = createTRPCRouter({
  listPayments: protectedProcedure.query(
    ({
      ctx: {
        prisma,
        session: { user },
      },
    }) => prisma.stripePayment.findMany({ where: { userId: user.id } })
  ),
})
