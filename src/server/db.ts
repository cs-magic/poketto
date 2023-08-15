import { PrismaClient } from '@prisma/client'
import { MongoClient } from 'mongodb'
import { env } from '@/env.mjs'

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
	return c
}

export type ExtendedPrismaClient = ReturnType<typeof getExtendedClient>


const globalForDB = globalThis as unknown as {
	prisma: ExtendedPrismaClient | undefined; mongo: MongoClient | undefined;
}
export const prisma = globalForDB.prisma ?? getExtendedClient()
export const mongo = globalForDB.mongo ?? new MongoClient(env.DB_MONGO_URI, {})

if (env.NODE_ENV !== 'production') {
	globalForDB.prisma = prisma
	globalForDB.mongo = mongo
}
