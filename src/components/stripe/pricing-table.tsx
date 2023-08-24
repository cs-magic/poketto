/**
 * Copyright (c) CS-Magic, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import Head from "next/head"
import React from "react"

import { env } from "@/env.mjs"

import { useSessionUser, useUserId } from "@/hooks/use-user"

declare global {
  namespace JSX {
    interface IntrinsicElements {
      // for stripe, ref: https://stripe.com/docs/payments/checkout/pricing-table#embed
      "stripe-pricing-table": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
    }
  }
}

/**
 * ref:
 *  1. https://www.reddit.com/r/reactjs/comments/x0uetq/comment/jggr4le/?utm_source=share&utm_medium=web2x&context=3
 *  2. https://stripe.com/docs/payments/checkout/pricing-table#embed
 *
 * id: https://dashboard.stripe.com/pricing-tables
 */
function StripePricingTable() {
  const user = useSessionUser()
  if (!user) {
    return <h1> You should login first to view the pricing table</h1>
  }
  return (
    <>
      <Head>
        <script async src="https://js.stripe.com/v3/pricing-table.js" />
      </Head>

      <stripe-pricing-table
        pricing-table-id={env.NEXT_PUBLIC_STRIPE_PRICING_TABLE_ID}
        publishable-key={env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}
        client-reference-id={user.id}
        customer-email={user.email}
      />
    </>
  )
}

export default StripePricingTable
