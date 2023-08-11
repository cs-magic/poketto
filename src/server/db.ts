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


export const mongo = globalForDB.mongo ?? new MongoClient(env.DB_MONGO_URI)

if (env.NODE_ENV !== 'production') {
	globalForDB.prisma = prisma
	globalForDB.mongo = mongo
}
