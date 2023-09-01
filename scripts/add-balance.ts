import { prismaClient } from "scripts/lib/db"

import { prisma } from "@/server/db"

export const addBalance = async () => {
  const user = await prisma.user.create({
    data: {
      email: "309715263@qq.com",
      balance: 100,
      stripePayments: {
        create: {
          product: {
            connect: {
              id: "prod_OOeVuH6LpHINCO",
            },
          },
        },
      },
    },
  })
  console.log({ user })
}

void addBalance()
