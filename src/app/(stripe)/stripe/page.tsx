/**
 * Copyright (c) CS-Magic, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Home | Next.js + TypeScript Example",
}

export default function IndexPage(): JSX.Element {
  return (
    <ul className="card-list">
      <li>
        <Link href="/donate-with-checkout" className="card checkout-style-background">
          <h2 className="bottom">Donate with Checkout</h2>
          <img alt={"/checkout-one-time-payments"} src="/checkout-one-time-payments.svg" />
        </Link>
      </li>
      <li>
        <Link href="/donate-with-elements" className="card elements-style-background">
          <h2 className="bottom">Donate with Elements</h2>
          <img alt={"elements-card-payment"} src="/elements-card-payment.svg" />
        </Link>
      </li>
    </ul>
  )
}
