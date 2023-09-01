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
import { stripe } from "@/server/stripe"

import { paymentEnv } from "@/env.mjs"

import { subscriptionLevel2Unit } from "@/config"

import d from "@/lib/datetime"
import { getOrigin } from "@/lib/router"
import { decodeClientReferenceId } from "@/lib/stripe"

/**
 * ref:
 * ❤️ https://makerkit.dev/blog/tutorials/nextjs13
 * NextRequest, ref: https://github.com/BastidaNicolas/nextauth-prisma-stripe/blob/master/src/app/api/webhooks/route.ts
 * ode:stream/consumers, ref: https://github.com/vercel/next.js/issues/49739#issuecomment-1553858264
 */
export async function POST(req: Request) {
  const body = await req.text() // 直接获取 raw body，值得注意的是，webhook不能有相同的，会导致 signature 不匹配
  const signature = headers().get("Stripe-Signature")!
  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, paymentEnv.STRIPE_WEBHOOK_SECRET)
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error"
    // On error, log and return the error message.
    if (err! instanceof Error) console.log(err)
    console.log(`❌ Error message: ${errorMessage}`)
    return NextResponse.json({ message: `Webhook Error: ${errorMessage}` }, { status: 400 })
  }

  console.debug("event: ", JSON.stringify(event))
  const {
    id,
    type,
    data: { object },
  } = event

  switch (type) {
    case "checkout.session.completed":
      const session = object as Stripe.Checkout.Session
      const { mode, customer } = session
      const { client_reference_id } = session
      if (!client_reference_id)
        return NextResponse.json({
          message: "skip handling since  no client_reference_id in this webhook",
        })
      const { userId, origin } = decodeClientReferenceId(client_reference_id)
      console.log({ client_reference_id: { origin, userId }, event: { id, type } })

      if (origin !== getOrigin()) {
        return NextResponse.json({
          message: "skip handling since origin mismatch",
        })
      }

      const user = await prisma.user.findUnique({ where: { id: userId } })
      if (!user) {
        console.error("既然有origin、userId，不应该没有user！", { origin, userId })
        return NextResponse.json({
          message: "no user of this webhook in database, maybe it's for another server so won't be handled then",
        })
      }

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

  return NextResponse.json({ message: "✅" })
}
