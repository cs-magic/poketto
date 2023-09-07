/**
 * Copyright (c) CS-Magic, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { NextApiHandler } from "next"
import NextAuth from "next-auth"

import { createAuthOptions } from "@/server/auth"

import { DEFAULT_LOCALE } from "@/config"

const handler: NextApiHandler = async (req, res) => {
  // console.log("auth: [query] ", req.query)
  const locale = (req.query.locale as string | undefined) ?? DEFAULT_LOCALE
  const origin = req.query.origin as string | undefined

  return await NextAuth(req, res, createAuthOptions({ locale, origin }))
}

export default handler
