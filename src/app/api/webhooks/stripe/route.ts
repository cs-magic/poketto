/**
 * Copyright (c) CS-Magic, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { headers } from "next/headers"
import type Stripe from "stripe"

import { prisma } from "@/server/db"

import { env } from "@/env.mjs"

import { STRIPE_SUBSCRIBE_PRODUCT_10_ID } from "@/config"

import d from "@/lib/datetime"
import { stripe } from "@/lib/stripe"

export async function POST(req: Request) {
  const body = await req.text()
  const signature = headers().get("Stripe-Signature") as string

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, env.STRIPE_WEBHOOK_SECRET)
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
    const stripeCustomerId = customer as string

    const lineItems = await stripe.checkout.sessions.listLineItems(session.id)
    for (const item of lineItems.data) {
      const productId = item.price?.product as string // get the product ID
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
              increment: count * 1000, // 10 刀 --> 1000 dora
            },
            stripeCustomerId,
            stripePayments: {
              create: {
                id: session.id,
                productId,
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
              increment: (productId === STRIPE_SUBSCRIBE_PRODUCT_10_ID ? 1 : 3) * count * 1000,
            },
            stripeSubscriptionEnd: d(new Date()).add(30, "days").toDate(),
            stripeCustomerId,
            stripePayments: {
              create: {
                id: session.id,
                productId,
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
