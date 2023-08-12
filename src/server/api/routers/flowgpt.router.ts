import { z } from 'zod'
import { GET_PROMPTS_BATCH_SIZE, type FlowgptPromptBasic, type FlowgptComment, type FlowgptPromptFull, FlowGPTSortOrder } from '@/ds/flowgpt'
import { createTRPCRouter, publicProcedure } from '@/server/api/helpers'
import { sleep } from '@/lib/datetime'
import partialSearch from './partial-search.agg.json'

export const idInput = z.object({
	id: z.string(),
})

const singleFetch = async <T>(props: { path: string, j: object }) => {
	// await sleep(3000)
	
	const input = encodeURI(JSON.stringify({ '0': props.j }))
	const url = `https://flowgpt.com/api/trpc/${props.path}?batch=1&input=${input}`
	console.log('[API] ', 'fetching: ', url)
	const response = await fetch(url)
	// console.log('[API] ', 'response: ', response)
	const result = await response.json()
	console.debug('[API] ', 'fetched: ', result)
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
		.query<FlowgptPromptBasic[]>(async (opts) => {
			
			partialSearch[0]!.$search!.phrase.query = opts.input.query // <-- mongodb partial search
			const result = await opts.ctx.mongo.db('flowgpt').collection('basic').aggregate<FlowgptPromptBasic>(partialSearch).toArray()
			// console.log({ result })
			return result
			
			const j = { json: opts.input }
			return await singleFetch<FlowgptPromptBasic[]>({ path: 'prompt.searchPrompts', j })
		}),
	
	listPrompts: publicProcedure
		.input(
			z.object({
				cursor: z.number().nullish(),
				sort: z.nativeEnum(FlowGPTSortOrder).optional(),
				q: z.string().optional(),
				language: z.string().default('zh'),
				skip: z.number().default(0),
				tag: z.string().optional(),
			}),
		)
		.query<{ data: FlowgptPromptBasic[], nextCursor: number | undefined }>(async (opts) => {
			const j = {
				json: opts.input,
				meta: {
					values: {
						tag: ['undefined'],
						categoryId: ['undefined'],
						subCategoryId: ['undefined'],
						sort: ['undefined'],
						q: ['undefined'],
					},
				},
			}
			const data = await singleFetch<FlowgptPromptBasic[]>({ path: 'prompt.getPrompts', j })
			const nextCursor = data.length < GET_PROMPTS_BATCH_SIZE ? undefined : opts.input.skip + GET_PROMPTS_BATCH_SIZE
			return { data, nextCursor }
		}),
	
	getPrompt: publicProcedure
		.input(idInput)
		.query<FlowgptPromptFull>(async (opts) => {
			const j = { json: opts.input.id }
			const data = await singleFetch<FlowgptPromptFull>({ path: 'prompt.getById', j })
			return data
		}),
	
	listComments: publicProcedure
		.input(idInput)
		.query<FlowgptComment[]>(async (opts) => {
			const j = {
				json: {
					type: 'prompt',
					id: opts.input.id,
				},
			}
			const data = await singleFetch<FlowgptComment[]>({ path: 'comment.getComments', j })
			return data
		}),
	
	// getSimilarPrompts: procedure
	// .input(idInput)
	// .query<IFlowgptPrompt[]>(async (opts) => {
	// 	return
	// }),
})

