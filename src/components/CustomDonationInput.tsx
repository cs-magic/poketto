/**
 * Copyright (c) CS-Magic, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { formatAmountForDisplay } from "@/utils/stripe-helpers"

export default function CustomDonationInput({
  name,
  min,
  max,
  currency,
  step,
  onChange,
  value,
  className,
}: {
  name: string
  min: number
  max: number
  currency: string
  step: number
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  value: number
  className?: string
}): JSX.Element {
  return (
    <label>
      Custom donation amount ({formatAmountForDisplay(min, currency)}-{formatAmountForDisplay(max, currency)}):
      <input type="range" name={name} min={min} max={max} step={step} onChange={onChange} value={value} className={className} />
    </label>
  )
}
