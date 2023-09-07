import { Client } from "postmark"

import { prisma } from "@/server/db"

import { authEnv } from "@/env.mjs"

import { siteConfig } from "@/config"

export const postmarkClient = new Client(authEnv.POSTMARK_API_TOKEN)

export const sendViaPostmark = async ({ identifier, url, provider, token, locale, origin }) => {
  const user = await prisma.user.findUnique({
    where: {
      email: identifier,
    },
    select: {
      emailVerified: true,
    },
  })

  const templateId = user?.emailVerified ? authEnv.POSTMARK_SIGN_IN_TEMPLATE : authEnv.POSTMARK_ACTIVATION_TEMPLATE
  if (!templateId) {
    throw new Error("Missing template id")
  }

  return postmarkClient.sendEmailWithTemplate({
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
