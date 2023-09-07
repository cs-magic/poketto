/**
 * Copyright (c) CS-Magic, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Awaitable } from "next-auth"
import { SendVerificationRequestParams } from "next-auth/providers"

import { emailProvider } from "@/config"

import { sendViaAWS } from "@/lib/email/providers/aws"
import { sendViaPostmark } from "@/lib/email/providers/postmark"

export interface ISendVerificationRequest extends SendVerificationRequestParams {
  locale: string
  origin: string
}

export const sendVerificationRequest = async (params: ISendVerificationRequest): Promise<void> => {
  console.log("sendVerificationRequest: ", params)

  const send = emailProvider === "aws" ? sendViaAWS : sendViaPostmark
  try {
    const result = await send(params)
    console.log({ result })
  } catch (error) {
    console.error(error)
    throw new Error("failed to send verification request")
  }
}
