import { z } from 'zod'
import { GET_PROMPTS_BATCH_SIZE, type IFlowgptBasicPrompt, type IFlowgptComment, type IFlowgptFullPrompt, SortOrder } from '@/ds/flowgpt'
import { createTRPCRouter, publicProcedure } from '@/server/api/helpers'
// import fetch from 'node-fetch'
import { proxyAgent } from '@/server/proxy'
import { sleep } from '@/lib/datetime'

export const idInput = z.object({
	id: z.string(),
})

const singleFetch = async <T>(props: { path: string, j: object }) => {
	await sleep(3000)
	
	const input = encodeURI(JSON.stringify({ '0': props.j }))
	const url = `https://flowgpt.com/api/trpc/${props.path}?batch=1&input=${input}`
	console.log(`[API] fetching: ${url}`)
	const response = await fetch(url, {
		// agent: proxyAgent,
	})
	const result = await response.json()
	return result[0].result.data.json as T
}


export const flowgptRouter = createTRPCRouter({
	
	// getSimilarPrompts: procedure
	// .input(idInput)
	// .query<IFlowgptPrompt[]>(async (opts) => {
	// 	return
	// }),
	
	listPrompts: publicProcedure
		.input(
			z.object({
				cursor: z.number().nullish(),
				order: z.nativeEnum(SortOrder).optional(),
			}),
		)
		.query<{ data: IFlowgptBasicPrompt[], nextCursor: number | undefined }>(async (opts) => {
			const skip = opts.input.cursor ?? 0
			const sort = opts.input.order ?? SortOrder.recommended
			const j = {
				'json': { sort, skip, 'tag': null, 'q': null, 'language': 'en' },
				'meta': { 'values': { 'tag': ['undefined'], 'q': ['undefined'] } },
			}
			const data = await singleFetch<IFlowgptBasicPrompt[]>({ path: 'prompt.getPrompts', j })
			const nextCursor = data.length < GET_PROMPTS_BATCH_SIZE ? undefined : skip + GET_PROMPTS_BATCH_SIZE
			return { data, nextCursor }
		}),
	
	getPrompt: publicProcedure
		.input(idInput)
		.query<IFlowgptFullPrompt>(async (opts) => {
			const j = {
				'json': opts.input.id,
			}
			const data = await singleFetch<IFlowgptFullPrompt>({ path: 'prompt.getById', j })
			return data
		}),
	
	listComments: publicProcedure
		.input(idInput)
		.query<IFlowgptComment[]>(async (opts) => {
			const j = {
				'json': {
					'type': 'prompt',
					'id': opts.input.id,
				},
			}
			const data = await singleFetch<IFlowgptComment[]>({ path: 'comment.getComments', j })
			return data
		}),
})

