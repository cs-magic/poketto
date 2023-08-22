import { env } from "@/env.mjs"
import { Stripe, loadStripe } from "@stripe/stripe-js"

let stripePromise: Promise<Stripe | null>
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(env.STRIPE_PUBLISHABLE_KEY)
  }
  return stripePromise
}

export default getStripe
