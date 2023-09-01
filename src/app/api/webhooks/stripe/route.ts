/**
 * Copyright (c) CS-Magic, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { headers } from "next/headers"
import { NextResponse } from "next/server"
import type Stripe from "stripe"

import { prisma } from "@/server/db"

import { paymentEnv } from "@/env.mjs"

import { subscriptionLevel2Unit } from "@/config"

import d from "@/lib/datetime"
import { stripe } from "@/lib/stripe"

/**
 * ref:
 * ❤️ https://makerkit.dev/blog/tutorials/nextjs13
 * NextRequest, ref: https://github.com/BastidaNicolas/nextauth-prisma-stripe/blob/master/src/app/api/webhooks/route.ts
 * ode:stream/consumers, ref: https://github.com/vercel/next.js/issues/49739#issuecomment-1553858264
 * @constructor
 */
export async function POST(req: Request) {
  const body = await req.text()
  const signature = headers().get("Stripe-Signature")!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, paymentEnv.STRIPE_WEBHOOK_SECRET)
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error"
    // On error, log and return the error message.
    if (err! instanceof Error) console.log(err)
    console.log(`❌ Error message: ${errorMessage}`)
    return NextResponse.json(`Webhook Error: ${errorMessage}`, { status: 400 })
  }

  console.debug("event: ", JSON.stringify(event))
  const {
    id,
    type,
    data: { object },
  } = event
  console.log({ event: { id, type } })

  switch (type) {
    case "checkout.session.completed":
      const session = object as Stripe.Checkout.Session
      const { mode, customer } = session
      const userId = session.client_reference_id ?? session?.metadata?.userId

      if (!userId)
        return NextResponse.json(
          "no userId in this webhook, maybe it comes from stripe web directly so won't be handled then",
        )
      const user = await prisma.user.findUnique({ where: { id: userId } })
      if (!user)
        return NextResponse.json(
          "no user of this webhook in database, maybe it's for another server so won't be handled then",
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
      break
    default:
      break
  }

  return NextResponse.json("✅")
}
