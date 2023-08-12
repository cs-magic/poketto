import { type IFlowgptPromptBasic } from '@/ds/flowgpt'
import { type IPokettoBasic } from '@/ds/poketto'
import dayjs from 'dayjs'

export const flowgpt2poketto = (prompt: IFlowgptPromptBasic): IPokettoBasic => {
	return {
		id: prompt.id,
		basic: {
			version: '1.0.0',
			title: prompt.title,
			desc: prompt.description,
			avatar: prompt.thumbnailURL,
			category: [prompt.categoryId, prompt.subCategoryId],
			industry: [],
			tags: prompt.Tag.map((item) => item.name),
			createdAt: dayjs(prompt.createdAt).toDate().getUTCSeconds(),
			updatedAt: dayjs(prompt.updatedAt).toDate().getUTCSeconds(),
		},
		model: {
			type: prompt.model,
			manufacturer: 'OpenAI',
			functions: [],
			initPrompts: [
				{ role: 'system', content: prompt.initPrompt },
			],
			temperature: prompt.temperature,
		},
		user: {
			id: prompt.User.id,
			name: prompt.User.name,
			avatar: prompt.User.image,
		},
		permissions: {
			visible: prompt.visibility,
			openSource: prompt.accessibility,
		},
		state: {
			views: prompt.views,
			interactions: {
				upvotes: prompt.upvotes,
				// todo: add more
			},
			stars: prompt.saves,
			forks: 0,
			shares: prompt.shares,
			usage: {
				users: prompt.uses,
				tokens: 0,
				triggers: 0,
			},
			comments: prompt.comments,
			ratedStars: 0,
			tips: prompt.tip,
		},
	}
}
