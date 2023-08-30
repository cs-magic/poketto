/**
 * Copyright (c) CS-Magic, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { IssueType, issueTypes } from "@/ds"

import { RootLayout } from "@/layouts/root.layout"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

const formSchema = z.object({
  contact: z.string().min(1).optional(),
  issueType: z.enum(issueTypes).default("bug-report"),
  // appPlatform: z.enum(appPlatforms).default("web"),
  title: z.string().min(1),
  detail: z.string().min(1),
})

const FeedbackForm = () => {
  const { t } = useTranslation()

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }
  const [issueType, setIssueType] = useState<IssueType>("puzzle-in-use")

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-4 w-full md:w-[480px] mx-auto">
        <FormField
          control={form.control}
          name="contact"
          render={({ field }) => (
            <FormItem>
              <FormLabel>联系方式</FormLabel>
              <FormControl>
                <Input placeholder="微信/手机号/邮箱" {...field} />
              </FormControl>
              <FormDescription>我们会同步以您留的联系方式通知反馈</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="issueType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>类型</FormLabel>
              <FormControl>
                <Select value={issueType} onValueChange={(v) => setIssueType(v as IssueType)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {issueTypes.map((cl) => (
                      <SelectItem value={cl} key={cl}>
                        {t(`feedback:${cl}.title`)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription>{t(`feedback:${issueType}.desc`)}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>标题</FormLabel>
              <FormControl>
                <Input placeholder="一句话描述您的问题" {...field} />
              </FormControl>
              <FormDescription>我们不是标题党，但标题真地很重要！</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="detail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>详情</FormLabel>
              <FormControl>
                <Textarea placeholder="对您问题的补充" {...field} />
              </FormControl>
              <FormDescription>一份具体的说明往往会有意想不到的效果哦</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">提交</Button>
      </form>
    </Form>
  )
}

export default function SeekPlatformWaitlistPage() {
  return (
    <RootLayout>
      {/*From Poketto Official: 很快就会上线，请再耐心等等吧！*/}
      <FeedbackForm />
    </RootLayout>
  )
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "feedback"])),
    },
  }
}
