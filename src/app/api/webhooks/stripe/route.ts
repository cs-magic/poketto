/**
 * Copyright (c) CS-Magic, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { headers } from "next/headers"
import type Stripe from "stripe"

import { env } from "@/env.mjs"

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
    const { mode } = session
    const userId = session.client_reference_id ?? session?.metadata?.userId

    const lineItems = await stripe.checkout.sessions.listLineItems(session.id)
    for (const item of lineItems.data) {
      const productID = item.price?.product as string // get the product ID
      const { quantity } = item // get the quantity

      console.log({ productID, quantity })
    }

    // todo: different modes

    // if (mode === "payment") {
    //   await stripe.paymentIntents.retrieve(session.payment_intent as string, { expand: [""] })
    //   await prisma.user.update({
    //     where: {
    //       id: userId,
    //     },
    //     data: {
    //       stripeCustomerId: subscription.customer as string,
    //       stripePriceId: subscription.items.data[0]!.price.id,
    //       stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
    //     },
    //   })
    // }
    //
    // if (mode === "subscription") {
    //   const subscription = await stripe.subscriptions.retrieve(session.subscription as string)
    //   await prisma.user.update({
    //     where: {
    //       id: userId,
    //     },
    //     data: {
    //       stripeSubscriptionId: subscription.id,
    //       stripeCustomerId: subscription.customer as string,
    //       stripePriceId: subscription.items.data[0]!.price.id,
    //       stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
    //     },
    //   })
    // }
  }

  return new Response(null, { status: 200 })
}