import type { Metadata } from "next"
import Link from "next/link"

const metadata: Metadata = {
  title: "Home | Next.js + TypeScript Example",
}

export default function IndexPage(): JSX.Element {
  return (
    <ul className="card-list">
      <li>
        <Link href="/donate-with-checkout" className="card checkout-style-background">
          <h2 className="bottom">Donate with Checkout</h2>
          <img alt="/checkout-one-time-payments" src="/checkout-one-time-payments.svg" />
        </Link>
      </li>
      <li>
        <Link href="/donate-with-elements" className="card elements-style-background">
          <h2 className="bottom">Donate with Elements</h2>
          <img alt="elements-card-payment" src="/elements-card-payment.svg" />
        </Link>
      </li>
    </ul>
  )
}