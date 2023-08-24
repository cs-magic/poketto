/**
 * Copyright (c) CS-Magic, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useRouter } from "next/router"

export const useUrl = () => {
  const router = useRouter()
  const origin = window?.location.origin ? window.location.origin : ""

  // console.log({ router })
  const baseUrl = `${origin}${router.asPath}`
  return { origin, baseUrl }
}
