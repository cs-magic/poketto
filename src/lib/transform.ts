import { type FlowgptPromptFull, type IFlowgptPromptBasic } from '@/ds/flowgpt'
import { type IPoketto } from '@/ds/poketto'
import dayjs from 'dayjs'

export const flowgpt2poketto = (prompt: IFlowgptPromptBasic | FlowgptPromptFull): IPoketto => {
	
	return {
		id: prompt.id,
		conversation: 'Conversation' in prompt ? prompt.Conversation : undefined,
		basic: {
			version: '1.0.0',
			language: prompt.language,
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
			
			stars: prompt.saves,
			forks: 0,
			shares: prompt.shares,
			comments: prompt.comments,
			ratedStars: 0,
			tips: prompt.tip,
			
			// usage
			users: prompt.uses,
			tokens: 0,
			triggers: 0,
			// todo: more interactions
			upvotes: prompt.upvotes,
		},
	}
}
