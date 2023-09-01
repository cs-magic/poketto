/**
 * Copyright (c) CS-Magic, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { headers } from "next/headers"
import type Stripe from "stripe"

import { prisma } from "@/server/db"

import { paymentEnv } from "@/env.mjs"

import { subscriptionLevel2Unit } from "@/config"

import d from "@/lib/datetime"
import { stripe } from "@/lib/stripe"

export async function POST(req: Request) {
  const body = await req.text()
  const signature = headers().get("Stripe-Signature") as string

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, paymentEnv.STRIPE_WEBHOOK_SECRET)
  } catch (error) {
    console.log({ error })
    const { message } = error as { message: string }
    return new Response(`Webhook Error: ${message}`, { status: 400 })
  }

  console.log("event: ", JSON.stringify(event, null, 2))
  const session = event.data.object as Stripe.Checkout.Session

  if (event.type === "checkout.session.completed") {
    const { mode, customer } = session
    const userId = session.client_reference_id ?? session?.metadata?.userId

    if (!userId)
      return new Response(
        "no userId in this webhook, maybe it comes from stripe web directly so won't be handled then",
        { status: 200 },
      )
    const user = await prisma.user.findUniqueOrThrow({ where: { id: userId } })
    if (!user)
      return new Response(
        "no user of this webhook in database, maybe it's for another server so won't be handled then",
        { status: 200 },
      )

    const stripeCustomerId = customer as string

    const lineItems = await stripe.checkout.sessions.listLineItems(session.id)
    for (const item of lineItems.data) {
      const productId = item.price?.product as string // get the product ID
      const productInfo = await prisma.stripeProduct.findUniqueOrThrow({ where: { id: productId } })
      const { quantity } = item // get the quantity
      const count = quantity ?? 1

      console.log({ customer, mode, userId, productId, quantity })

      if (mode === "payment") {
        await prisma.user.update({
          where: { id: userId },
          include: {
            stripePayments: true,
          },
          data: {
            balance: {
              increment: subscriptionLevel2Unit[productInfo.level ?? "basic"] * count * 100,
            },
            stripeCustomerId,
            stripePayments: {
              create: {
                id: session.id,
                product: {
                  connect: {
                    id: productId,
                  },
                },
                count,
              },
            },
          },
        })
      }

      if (mode === "subscription") {
        await prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            balance: {
              increment: subscriptionLevel2Unit[productInfo.level ?? "basic"] * count * 100,
            },
            stripeSubscriptionEnd: d(new Date()).add(30, "days").toDate(),
            stripeCustomerId,
            stripePayments: {
              create: {
                id: session.id,
                product: {
                  connect: {
                    id: productId,
                  },
                },
                count,
              },
            },
          },
        })
      }
    }
  }

  return new Response(null, { status: 200 })
}
