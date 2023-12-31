import { useTranslation } from "next-i18next"
import * as React from "react"

import { defaultModelQuota, modelTypes } from "@/ds"

import { ChargeContainer } from "@/components/containers"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card"

import { useUser } from "@/hooks/use-user"

const SlowChargeForm = () => {
  const { t } = useTranslation()
  const { user } = useUser()
  const quota = user?.quota ?? defaultModelQuota

  return (
    <div className={"columns-2"}>
      <Card className={"bg-transparent border-none"}>
        <CardHeader className={"p-2"}>
          <CardDescription>当前余额</CardDescription>
        </CardHeader>
        <CardContent className={"p-2 flex flex-col gap-2"}>
          <div className={"flex justify-between gap-4"}>
            Dora
            <span className={"text-xs text-muted-foreground ml-2"}>{user ? user.balance : 0}</span>
          </div>
          <ChargeContainer className={"w-full"} asChild>
            <Button variant={"outline"} className={"w-full"}>
              续航
            </Button>
          </ChargeContainer>
        </CardContent>
      </Card>

      {/*<Separator orientation={"vertical"} />*/}

      <Card className={"bg-transparent border-none"}>
        <CardHeader className={"p-2"}>
          <CardDescription>今日试用剩余</CardDescription>
        </CardHeader>
        <CardContent className={"p-2"}>
          {modelTypes.map((k) => (
            <div key={k} className={"flex justify-between gap-4"}>
              {k}
              <span className={"text-xs text-muted-foreground ml-2"}>{quota[k]}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

export default SlowChargeForm
