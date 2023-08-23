import { env } from "@/env.mjs"
import "server-only"

import Stripe from "stripe"

const key = env.STRIPE_API_KEY
console.log({ key })

export const stripe = new Stripe(key, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: "2023-08-16",
  appInfo: {
    name: "poketto.ai",
    url: "https://poketto.ai",
  },
})
