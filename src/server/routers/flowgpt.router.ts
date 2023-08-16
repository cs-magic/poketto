import { z } from 'zod'
import { createTRPCRouter, publicProcedure } from '@/server/routers/trpc.helpers'
import partialSearch from '../../data/partial-search.agg.json'
import _ from 'lodash'
import { PlatformType } from '.prisma/client'
import { type AppWithRelation, GET_PROMPTS_BATCH_SIZE, type IAppComment, type IFlowGPTComment, type IFlowgptPromptBasic, SortOrder } from '@/ds'
import { transFlowgptPrompt2app, transFlowgptComments, transformFlowgptPrompt2AppWithRelation } from '@/lib/flowgpt'
import { POKETTO_APP_WITH_RELATION } from '@/config'
import { App } from '@prisma/client'

const idInput = z.object({
	id: z.string().optional(),
	platform: z.nativeEnum(PlatformType),
})


export const singleFetch = async <T>(props: {
	path: string,
	j: object
}) => {
	// await sleep(3000)
	
	const input = encodeURI(JSON.stringify({ '0': props.j }))
	const url = `https://flowgpt.com/api/trpc/${props.path}?batch=1&input=${input}`
	console.log('[API] ', 'fetching: ', url)
	const response = await fetch(url)
	// console.log('[API] ', 'response: ', response)
	const result = await response.json()
	// console.debug('[API] ', 'fetched: ', result)
	return result[0].result.data.json as T
}

export const fetchFlowgptPrompt = async (appId: string): Promise<IFlowgptPromptBasic> => {
	return singleFetch<IFlowgptPromptBasic>({ path: 'prompt.getById', j: { json: appId } })
}

export const flowgptRouter = createTRPCRouter({
	
	searchApps: publicProcedure
		.input(z.object({
			query: z.string(), language: z.string().default('zh'), threshold: z.number().default(.8), hideNsfw: z.boolean().default(true),
		}))
		.query<AppWithRelation[]>(async (opts) => {
			partialSearch[0]!.$search!.phrase.query = opts.input.query // <-- mongodb partial search
			let result
			result = await opts.ctx.mongo.db('flowgpt').collection('basic').aggregate<IFlowgptPromptBasic>(partialSearch).toArray()
			// result = await singleFetch<FlowgptPromptBasic[]>({ path: 'prompt.searchPrompts', { json: opts.input } })
			return result.map(transformFlowgptPrompt2AppWithRelation)
		}),
	
	listPoketto: publicProcedure
		.input(z.object({
			cursor: z.number().nullish(),
			sort: z.nativeEnum(SortOrder).optional(),
			q: z.string().optional(),
			categoryId: z.string().optional(),
			subCategoryId: z.string().optional(),
			language: z.string().default('zh'),
			skip: z.number().default(0),
			tag: z.string().optional(),
		}))
		.query<{
			data: AppWithRelation[],
			nextCursor: number | undefined
		}>(async (opts) => {
			// 所有空的要填 ["undefined"]
			const emptyFields = Object.entries(opts.input)
				.filter(([field, val]) => !val)
				.map(([field, val]) => field)
			const meta = _.zipObject(emptyFields, emptyFields.map(() => ['undefined']))
			// console.log({ query: opts.input, meta })
			const j = {
				json: opts.input, meta: { values: meta },
			}
			const data = await singleFetch<IFlowgptPromptBasic[]>({ path: 'prompt.getPrompts', j })
			const nextCursor = data.length < GET_PROMPTS_BATCH_SIZE ? undefined : opts.input.skip + GET_PROMPTS_BATCH_SIZE
			return { data: data.map(transformFlowgptPrompt2AppWithRelation), nextCursor }
		}),
	
	getPoketto: publicProcedure
		.input(idInput)
		.query<AppWithRelation | undefined>(async (opts) => {
			const { id, platform } = opts.input
			if (!id) return
			if (platform === PlatformType.Poketto) {
				return POKETTO_APP_WITH_RELATION
			}
			
			const j = { json: id }
			const data = await singleFetch<IFlowgptPromptBasic>({ path: 'prompt.getById', j })
			return transformFlowgptPrompt2AppWithRelation(data)
		}),
	
	listComments: publicProcedure
		.input(idInput)
		.query<IAppComment[]>(async (opts) => {
			const { id, platform } = opts.input
			if (!id) return []
			if (platform === PlatformType.Poketto) return [] // todo: own comments
			
			const j = {
				json: {
					type: 'prompt', id,
				},
			}
			const data = await singleFetch<IFlowGPTComment[]>({ path: 'comment.getComments', j })
			return data.map(transFlowgptComments)
		}),
	
	// getSimilarPrompts: procedure
	// .input(idInput)
	// .query<IFlowgptPrompt[]>(async (opts) => {
	// 	return
	// }),
})


