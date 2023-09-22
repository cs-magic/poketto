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
