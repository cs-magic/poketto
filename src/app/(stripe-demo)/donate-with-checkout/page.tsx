import type { Metadata } from "next";

import CheckoutForm from "@cs-magic/react/stripe/components/CheckoutForm";

const metadata: Metadata = {
  title: "Donate with Checkout | Next.js + TypeScript Example",
};

export default function DonatePage(): JSX.Element {
  return (
    <div className="page-container">
      <h1>Donate with Checkout</h1>
      <p>Donate to our project 💖</p>
      <CheckoutForm />
    </div>
  );
}
