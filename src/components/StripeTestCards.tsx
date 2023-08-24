/**
 * Copyright (c) CS-Magic, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
export default function StripeTestCards(): JSX.Element {
  return (
    <div className="test-card-notice">
      Use any of the{" "}
      <a href="https://stripe.com/docs/testing#cards" target="_blank" rel="noopener noreferrer">
        Stripe test cards
      </a>{" "}
      for this demo, e.g.{" "}
      <div className="card-number">
        4242<span />4242<span />4242<span />4242
      </div>
      .
    </div>
  )
}
