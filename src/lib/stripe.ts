/**
 * Copyright (c) CS-Magic, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import "server-only"
import Stripe from "stripe"

import { paymentEnv } from "@/env.mjs"

const key = paymentEnv.STRIPE_API_KEY
console.log({ key })

export const stripe = new Stripe(key, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: "2023-08-16",
  appInfo: {
    name: "poketto.ai",
    url: "https://poketto.ai",
  },
})
