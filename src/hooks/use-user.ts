/**
 * Copyright (c) CS-Magic, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useSession } from "next-auth/react"

export const useSessionUser = () => {
  const { data } = useSession()
  return data?.user
}

export const useUserId = () => {
  const { data } = useSession()
  return data?.user.id
}