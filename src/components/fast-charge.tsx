/**
 * Copyright (c) CS-Magic, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { IssueType } from ".prisma/client"
import { zodResolver } from "@hookform/resolvers/zod"
import { TRPCClientError } from "@trpc/client"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useRouter } from "next/router"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { feedbackFormSchema } from "@/ds"

import { RootLayout } from "@/components/layouts/root.layout"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"

import { useUserId } from "@/hooks/use-user"

import { api } from "@/lib/api"
import { getZodDefaults } from "@/lib/zod"

const fastChargeSchema = z.object({
  coupon: z.string().optional(),
})

const FastChargeForm = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const { mutateAsync: addCoupon, isLoading } = api.bill.addCoupon.useMutation()
  const userId = useUserId()
  const { data: user } = api.user.getProfile.useQuery({ id: userId }, { enabled: !!userId })

  const util = api.useContext()
  const form = useForm<z.infer<typeof fastChargeSchema>>({
    resolver: zodResolver(fastChargeSchema),
  })

  async function onSubmit(values: z.infer<typeof fastChargeSchema>) {
    const { coupon } = values
    if (coupon) {
      try {
        await addCoupon({ coupon })
        await util.user.getProfile.invalidate()
        toast.success("加油成功，祝您旅途愉快！ ：）")
      } catch (e) {
        // 已经在
        console.error(e)
        if (e instanceof TRPCClientError) toast.error(e.message)
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-4 w-full md:w-[480px] mx-auto">
        <FormItem>
          <FormLabel>当前 Dora：</FormLabel>
          <FormControl>
            <span>{user ? user.balance : 0}</span>
          </FormControl>
          <FormMessage />
        </FormItem>

        <FormField
          control={form.control}
          name="coupon"
          render={({ field }) => (
            <FormItem>
              <FormLabel>加油券</FormLabel>
              <FormControl>
                <Input placeholder="cp_xxx" {...field} />
              </FormControl>
              <FormDescription>使用您或他人的加油券，无需支付流程，直接为您账号续航！</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isLoading}>
          提交
        </Button>
      </form>
    </Form>
  )
}

export default FastChargeForm
