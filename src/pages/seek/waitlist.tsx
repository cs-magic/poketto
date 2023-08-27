/**
 * Copyright (c) CS-Magic, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { RootLayout } from "@/layouts/root.layout"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"


const issueTypes = ["bug-report", "puzzle", "feature-request", "business"] as const
type IssueType = (typeof issueTypes)[number]
const appPlatforms = ["web", "desktop", "mobile", "mini-program"] as const
type AppPlatform = (typeof appPlatforms)[number]

const formSchema = z.object({
  email: z.string().email(),
  wechat: z.string().min(1).optional(),
  issueType: z.enum(issueTypes).default("bug-report"),
  appPlatform: z.enum(appPlatforms).default("web"),
  title: z.string().min(1),
  detail: z.string().min(1),
})

const FeedbackForm = () => {
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>This is your public display name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
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