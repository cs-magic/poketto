import { z } from 'zod'
import { type IFlowgptPromptBasic, type FlowgptPromptFull, GET_PROMPTS_BATCH_SIZE } from '@/ds/flowgpt'
import { createTRPCRouter, publicProcedure } from '@/server/api/helpers'
import partialSearch from './partial-search.agg.json'
import { type IPokettoBasic, type IPokettoComment } from '@/ds/poketto'
import { flowgpt2poketto } from '@/lib/transform'
import { SortOrder } from '@/ds/system'
import _ from 'lodash'

export const idInput = z.object({
	id: z.string().optional(),
})

const singleFetch = async <T>(props: { path: string, j: object }) => {
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


export const flowgptRouter = createTRPCRouter({
	
	searchPrompts: publicProcedure
		.input(z.object({
				query: z.string(),
				language: z.string().default('zh'),
				threshold: z.number().default(.8),
				hideNsfw: z.boolean().default(true),
			}),
		)
		.query<IPokettoBasic[]>(async (opts) => {
			partialSearch[0]!.$search!.phrase.query = opts.input.query // <-- mongodb partial search
			let result
			result = await opts.ctx.mongo.db('flowgpt').collection('basic').aggregate<IFlowgptPromptBasic>(partialSearch).toArray()
			// result = await singleFetch<FlowgptPromptBasic[]>({ path: 'prompt.searchPrompts', { json: opts.input } })
			return result.map(flowgpt2poketto)
		}),
	
	listPrompts: publicProcedure
		.input(
			z.object({
				cursor: z.number().nullish(),
				sort: z.nativeEnum(SortOrder).optional(),
				q: z.string().optional(),
				categoryId: z.string().optional(),
				subCategoryId: z.string().optional(),
				language: z.string().default('zh'),
				skip: z.number().default(0),
				tag: z.string().optional(),
			}),
		)
		.query<{ data: IPokettoBasic[], nextCursor: number | undefined }>(async (opts) => {
			// 所有空的要填 ["undefined"]
			const emptyFields = Object.entries(opts.input)
				.filter(([field, val]) => !val)
				.map(([field, val]) => field)
			const meta = _.zipObject(emptyFields, emptyFields.map(() => ['undefined']))
			console.log({ query: opts.input, meta })
			const j = {
				json: opts.input,
				meta: { values: meta },
			}
			const data = await singleFetch<IFlowgptPromptBasic[]>({ path: 'prompt.getPrompts', j })
			const nextCursor = data.length < GET_PROMPTS_BATCH_SIZE ? undefined : opts.input.skip + GET_PROMPTS_BATCH_SIZE
			return { data: data.map(flowgpt2poketto), nextCursor }
		}),
	
	getPrompt: publicProcedure
		.input(idInput)
		.query<FlowgptPromptFull | undefined>(async (opts) => {
			const { id } = opts.input
			if (!id) return
			
			const j = { json: id }
			const data = await singleFetch<FlowgptPromptFull>({ path: 'prompt.getById', j })
			return data
		}),
	
	listComments: publicProcedure
		.input(idInput)
		.query<IPokettoComment[]>(async (opts) => {
			const { id } = opts.input
			if (!id) return []
			
			const j = {
				json: {
					type: 'prompt',
					id,
				},
			}
			const data = await singleFetch<IPokettoComment[]>({ path: 'comment.getComments', j })
			return data
		}),
	
	// getSimilarPrompts: procedure
	// .input(idInput)
	// .query<IFlowgptPrompt[]>(async (opts) => {
	// 	return
	// }),
})

