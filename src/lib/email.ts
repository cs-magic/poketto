/**
 * Copyright (c) CS-Magic, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Mustache from "mustache"
import { Client } from "postmark"
import { SendEmailCommand, SESClient } from "@aws-sdk/client-ses"
import { prisma } from "@/server/db"

import d from "@/lib/datetime"
import { env } from "@/env.mjs"
import { AWS_REGION, emailProvider, siteConfig } from "@/config"

import { promises as fs } from "fs"
import path from "path"

// @ts-ignore
const isAws = emailProvider === "aws"

const postmarkClient = new Client(env.POSTMARK_API_TOKEN)
const sesClient = new SESClient({
  region: AWS_REGION,
  credentials: {
    accessKeyId: env.AWS_AK,
    secretAccessKey: env.AWS_SK,
  },
})

// const t = fs.readFileSync(path.resolve("./public", "email.templates/welcome.html"), { encoding: "utf-8" })

export const emailFrom = siteConfig.welcomeEmailAddress

/**
 *
 * @param identifier 用户id，也就是填的邮箱号
 * @param url 回调地址
 * @param provider
 * @param token
 */
export const sendVerificationRequest = async ({ identifier, url, provider, token }) => {
  const user = await prisma.user.findUnique({
    where: {
      email: identifier,
    },
    select: {
      emailVerified: true,
    },
  })

  let result

  if (isAws) {
    const t = await fs.readFile(path.resolve("./public", "email.templates/welcome.html"), { encoding: "utf-8" })
    result = await sesClient.send(
      new SendEmailCommand({
        Destination: {
          /* required */
          CcAddresses: [
            // 'EMAIL_ADDRESS',
            /* more items */
          ],
          ToAddresses: [
            identifier,
            /* more items */
          ],
        },
        Message: {
          /* required */
          Body: {
            /* required */
            Html: {
              Charset: "UTF-8",
              Data: Mustache.render(t, {
                CompanyName: "CS Magic, Inc.",
                ProductName: siteConfig.name,
                username: identifier,
                action_url: url,
                login_url: siteConfig.loginUrl,
                trial_length: " 7 Days",
                trial_start_date: d(new Date()).toDate().toLocaleDateString(),
                trial_end_date: d(new Date()).add(7, "days").toDate().toLocaleDateString(),
                support_mail: "support@cs-maigc.com",
              }),
            },
            Text: {
              Charset: "UTF-8",
              Data: "TEXT_FORMAT_BODY",
            },
          },
          Subject: {
            Charset: "UTF-8",
            Data: `Welcome to ${siteConfig.name} !`,
          },
        },
        Source: siteConfig.welcomeEmailAddress /* required */,
        ReplyToAddresses: [
          siteConfig.supportEmailAddress,
          /* more items */
        ],
      })
    )
  } else {
    const templateId = user?.emailVerified ? env.POSTMARK_SIGN_IN_TEMPLATE : env.POSTMARK_ACTIVATION_TEMPLATE
    if (!templateId) {
      throw new Error("Missing template id")
    }

    result = await postmarkClient.sendEmailWithTemplate({
      TemplateId: parseInt(templateId),
      To: identifier,
      From: provider.from as string,
      TemplateModel: {
        action_url: url,
        product_name: siteConfig.name,
      },
      Headers: [
        {
          // Set this to prevent Gmail from threading emails.
          // See https://stackoverflow.com/questions/23434110/force-emails-not-to-be-grouped-into-conversations/25435722.
          Name: "X-Entity-Ref-ID",
          Value: `${new Date().getTime()}`,
        },
      ],
    })
  }

  console.log({ result })
  if (result.ErrorCode) {
    throw new Error(result.Message)
  }
}
