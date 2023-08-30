/**
 * Copyright (c) CS-Magic, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses"
import { promises as fs } from "fs"
import Mustache from "mustache"
import path from "path"
import { Client } from "postmark"

import { prisma } from "@/server/db"

import { authEnv } from "@/env.mjs"

import { AWS_REGION, emailProvider, siteConfig } from "@/config"

import d from "@/lib/datetime"

// @ts-ignore
const isAws = emailProvider === "aws"

const postmarkClient = new Client(authEnv.POSTMARK_API_TOKEN)
const sesClient = new SESClient({
  region: AWS_REGION,
  credentials: {
    accessKeyId: authEnv.AWS_AK,
    secretAccessKey: authEnv.AWS_SK,
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
 * @param locale
 * @param origin 用户填的地址
 */
export const sendVerificationRequest = async ({ identifier, url, provider, token, locale, origin }) => {
  // console.log("sendVerificationRequest: ", { identifier, url, provider, token, locale })

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
    const t = await fs.readFile(path.resolve("./public", `email.templates/welcome_${locale}.html`), {
      encoding: "utf-8",
    })
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
                CompanyName: siteConfig.companyName,
                ProductName: siteConfig.name,
                username: identifier,
                action_url: url,
                login_url: `${origin}/login`,
                support_mail: siteConfig.links.customerSupportEmail,

                trial_length: " 7 Days",
                trial_start_date: d(new Date()).toDate().toLocaleDateString(),
                trial_end_date: d(new Date()).add(7, "days").toDate().toLocaleDateString(),
              }),
            },
            Text: {
              Charset: "UTF-8",
              Data: "TEXT_FORMAT_BODY",
            },
          },
          Subject: {
            Charset: "UTF-8",
            Data: (locale === "en" ? `Welcome to` : `欢迎来到`) + ` ${siteConfig.name} !`,
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
    const templateId = user?.emailVerified ? authEnv.POSTMARK_SIGN_IN_TEMPLATE : authEnv.POSTMARK_ACTIVATION_TEMPLATE
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
