import React from "react"
import { env } from "@/env.mjs"
import Head from "next/head"

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
const StripePricingTable = () => {
  return (
    <>
      <Head>
        <script async src="https://js.stripe.com/v3/pricing-table.js"></script>
      </Head>

      <stripe-pricing-table
        pricing-table-id={env.NEXT_PUBLIC_STRIPE_PRICING_TABLE_ID}
        publishable-key={env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}
      ></stripe-pricing-table>
    </>
  )
}

export default StripePricingTable
