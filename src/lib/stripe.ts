/**
 * Copyright (c) CS-Magic, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import "server-only"
import Stripe from "stripe"

import { paymentEnv } from "@/env.mjs"

export const stripe = new Stripe(paymentEnv.STRIPE_API_KEY, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: "2023-08-16",
  appInfo: {
    name: "poketto.ai",
    url: "https://poketto.ai",
    version: "0.1.0",
  },
})

export interface IClientReferenceId {
  userId: string
  origin: string
}

export const encodeClientReferenceId = (v: IClientReferenceId) => JSON.stringify(v)
export const decodeClientReferenceId = (v: string) => JSON.parse(v) as IClientReferenceId
