import { PrismaClient } from '@prisma/client'
import { MongoClient } from 'mongodb'
import { env } from '@/env.mjs'

const globalForDB = globalThis as unknown as {
	prisma: PrismaClient | undefined;
	mongo: MongoClient | undefined;
}

export const prisma =
	globalForDB.prisma ??
	new PrismaClient({
		log:
			env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
	})
		.$extends({
			result: {
				user: {
					// todo: for-production-use index design
					impact: {
						needs: {
							name: true,
							followedBy: true, // needs: findMany({include: {followedBy: true}})
						},
						compute(user) {
							return user.followedBy.length * 100 + (user.name ?? '').length
						},
					},
				},
			},
		})


export const mongo = globalForDB.mongo ?? new MongoClient(env.DB_MONGO_URI, {
	// connectTimeoutMS: 20000,
})

if (env.NODE_ENV !== 'production') {
	globalForDB.prisma = prisma
	globalForDB.mongo = mongo
}
