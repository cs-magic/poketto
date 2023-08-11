import { z } from 'zod'
import { GET_PROMPTS_BATCH_SIZE, type IFlowgptBasicPrompt, type IFlowgptComment, type IFlowgptFullPrompt, SortOrder } from '@/ds/flowgpt'
import { createTRPCRouter, publicProcedure } from '@/server/api/helpers'
import { sleep } from '@/lib/datetime'

export const idInput = z.object({
	id: z.string(),
})

const singleFetch = async <T>(props: { path: string, j: object }) => {
	// await sleep(3000)
	
	const input = encodeURI(JSON.stringify({ '0': props.j }))
	const url = `https://flowgpt.com/api/trpc/${props.path}?batch=1&input=${input}`
	console.log(`[API] fetching: ${url}, params: `, props.j)
	const response = await fetch(url)
	const result = await response.json()
	return result[0].result.data.json as T
}


export const flowgptRouter = createTRPCRouter({
	
	searchPrompts: publicProcedure
		.input(z.object({
				query: z.string().optional(),
				language: z.string().default('zh'),
				threshold: z.number().default(.8),
				hideNsfw: z.boolean().default(true),
			}),
		)
		.query<IFlowgptBasicPrompt[]>(async (opts) => {
			
			const result = await opts.ctx.mongo.db('flowgpt').collection('basic').aggregate<IFlowgptBasicPrompt>([
				{
					'$search': {
						index: 'partial-match-tutorial',
						phrase: {
							path: ['title', 'description', 'initPrompt'],
							query: opts.input.query,
							slop: 20,
						},
						highlight: {
							path: ['title', 'description', 'initPrompt'],
						},
					},
				},
				
				{
					'$limit': 5,
				},
				
				{
					'$project': {
						_id: 1,
						thumbnailURL: 1,
						title: 1,
						description: 1,
						initPrompt: 1,
						User: 1,
						highlights: {
							'$meta': 'searchHighlights',
						},
					},
				},
			]).toArray()
			console.log({ result })
			return result
			
			const j = { json: opts.input }
			return await singleFetch<IFlowgptBasicPrompt[]>({ path: 'prompt.searchPrompts', j })
		}),
	
	listPrompts: publicProcedure
		.input(
			z.object({
				cursor: z.number().nullish(),
				sort: z.nativeEnum(SortOrder).optional(),
				q: z.string().optional(),
				language: z.string().default('zh'),
				skip: z.number().default(0),
				tag: z.string().optional(),
			}),
		)
		.query<{ data: IFlowgptBasicPrompt[], nextCursor: number | undefined }>(async (opts) => {
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
			const data = await singleFetch<IFlowgptBasicPrompt[]>({ path: 'prompt.getPrompts', j })
			const nextCursor = data.length < GET_PROMPTS_BATCH_SIZE ? undefined : opts.input.skip + GET_PROMPTS_BATCH_SIZE
			return { data, nextCursor }
		}),
	
	getPrompt: publicProcedure
		.input(idInput)
		.query<IFlowgptFullPrompt>(async (opts) => {
			const j = { json: opts.input.id }
			const data = await singleFetch<IFlowgptFullPrompt>({ path: 'prompt.getById', j })
			return data
		}),
	
	listComments: publicProcedure
		.input(idInput)
		.query<IFlowgptComment[]>(async (opts) => {
			const j = {
				json: {
					type: prompt,
					id: opts.input.id,
				},
			}
			const data = await singleFetch<IFlowgptComment[]>({ path: 'comment.getComments', j })
			return data
		}),
	
	// getSimilarPrompts: procedure
	// .input(idInput)
	// .query<IFlowgptPrompt[]>(async (opts) => {
	// 	return
	// }),
})

