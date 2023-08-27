/**
 * Copyright (c) CS-Magic, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import Mustache from "mustache"

import { useSessionUser } from "@/hooks/use-user"


export const useMustache = () => {
  const user = useSessionUser()
  return (s: string, dict?: { [key: string]: string | number | boolean }) => {
    const d = { ...{ userName: user?.name }, ...(dict ?? {}) }
    try {
      return Mustache.render(s.replace(/\n+/g, "\n\n"), d)
    } catch (e) {
      // Error: Unclosed tag at xxxx
      return s
    }
  }
}