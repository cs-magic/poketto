import { env } from "@/env.mjs"
import "server-only"

import Stripe from "stripe"

export const stripe = new Stripe(env.STRIPE_API_KEY as string, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: "2023-08-16",
  appInfo: {
    name: "poketto.ai",
    url: "https://poketto.ai",
  },
})
