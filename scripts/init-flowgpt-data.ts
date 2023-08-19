import { mongoLocal, prisma } from "@/server/db"
import { PlatformType, PromptRoleType } from ".prisma/client"
import { type IFlowgptPromptBasic } from "./lib/flowgpt"

const init = async () => {
  console.log("initializing flowgpt apps")
  for await (const p of mongoLocal.db("flowgpt").collection("basic").find() as unknown as IFlowgptPromptBasic[]) {
    console.log(`dumping (id=${p.id}, title=${p.title})`)
    await prisma.app.upsert({
      where: { platform: { platformId: p.id, platformType: PlatformType.FlowGPT } },
      include: {
        creator: true,
        category: true,
        state: true,
        tags: true,
      },
      update: {},
      create: {
        platformId: p.id,
        platformType: PlatformType.FlowGPT,
        avatar: p.thumbnailURL,
        desc: p.description,
        language: p.language ?? "en",
        name: p.title,
        isOpenSource: p.visibility,
        state: {
          create: {
            views: p.views,
            calls: p.uses,
            forks: 0,
            tips: p.tip,
            stars: p.saves,
            shares: p.shares,
          },
        },
        modelName: p.model,
        modelArgs: {
          temperature: p.temperature,
          prompts: [
            {
              role: PromptRoleType.system,
              content: p.initPrompt,
            },
          ],
        },
        category: {
          connectOrCreate: {
            where: { id: { main: p.categoryId, sub: p.subCategoryId } },
            create: { main: p.categoryId, sub: p.subCategoryId },
          },
        },

        creator: {
          connectOrCreate: {
            where: { platform: { platformId: p.User.id, platformType: PlatformType.FlowGPT } },
            create: {
              platformId: p.User.id,
              platformType: PlatformType.FlowGPT,
              platformArgs: {
                uri: p.User.uri,
              },
              image: p.User.image,
            },
          },
        },
        tags: {
          connectOrCreate: p.Tag.map((t) => ({
            where: { id: t.name },
            create: { id: t.name, name: t.name },
          })),
        },
      },
    })
  }
  console.log("successfully initialized")
}

void init()
