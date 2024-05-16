import { sendSms } from "@/server/sms"
import { createTRPCRouter, publicProcedure } from "@/server/trpc-helpers"

import { sendSmsSchema } from "@/schema/sms"

export const authRouter = createTRPCRouter({
  sendSms: publicProcedure.input(sendSmsSchema).mutation(({ ctx, input }) => sendSms(input.phone)),
})
