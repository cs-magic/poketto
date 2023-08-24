/**
 * Copyright (c) CS-Magic, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useViewportSize } from "@mantine/hooks"
import { MAX_MOBILE_WIDTH } from "@/config"

export const useMobile = () => {
  const { width } = useViewportSize()
  return width <= MAX_MOBILE_WIDTH
}
