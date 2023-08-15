import { PrismaClient } from '@prisma/client'
import { MongoClient } from 'mongodb'
import { env } from '@/env.mjs'
import { PokettoOfficial, YourSolePoketto, YourSolePokettoApp, YourSolePokettoModel, YourSolePokettoModelInitPrompts } from '@/config/poketto'
import log from '@/lib/log'


export const initDB = async (prisma: ExtendedPrismaClient) => {

	if (!(await prisma.appCategory.count())) {
		log.info("initializing categories")
		await prisma.appCategory.createMany({
			data: [
				{ main: "Lifestyle", sub: "Growth", id: 0 }
			]
		})
	}

	if (!(await prisma.user.count())) {
		log.info("initializing default user(i.e. PokketoOfficial)")
		await prisma.user.create({ data: PokettoOfficial })
	}

	if (!(await prisma.app.count())) {
		log.info("initializing default app(i.e. YourPokettoApp)")
		await prisma.app.create({ data: YourSolePokettoApp })
	}

	if (!(await prisma.appModel.count())) {
		log.info("initializing default app(i.e. YourPokettoApp)")
		await prisma.appModel.create({ data: YourSolePokettoModel })
	}


	if (!(await prisma.prommptMessage.count())) {
		log.info("initializing default app(i.e. YourPokettoApp)")
		await prisma.prommptMessage.createMany({ data: YourSolePokettoModelInitPrompts })
	}
	log.info("Succesfully initialized !")
}

function getExtendedClient() {
	const c = new PrismaClient({
		log: env.NODE_ENV === 'development' ? [// 'query',
			'warn', 'error'] : ['error'],
	})
		.$extends({
			result: {
				user: {
					// todo: for-production-use index design
					impact: {
						needs: {
							name: true, // @ts-ignore
							followedBy: true, // 必须加上，否则没有数据
						}, // ref:
						compute: (user) => user.followedBy.length * 100 + (user.name ?? '').length,
					},
				},
			},
		})

	globalForDB.prisma = c

	initDB(c)

	return c
}

export type ExtendedPrismaClient = ReturnType<typeof getExtendedClient>


const globalForDB = globalThis as unknown as {
	prisma: ExtendedPrismaClient | undefined;
	mongo: MongoClient | undefined;
}
export const prisma = globalForDB.prisma ?? getExtendedClient()
export const mongo = globalForDB.mongo ?? new MongoClient(env.DB_MONGO_URI, {})

if (env.NODE_ENV !== 'production') {
	globalForDB.prisma = prisma
	globalForDB.mongo = mongo
}
