import {
	type AppWithRelation,
	type FlowgptPromptFull,
	type IAppComment,
	type IFlowGPTComment,
	type IFlowgptConversation,
	type IFlowgptPromptBasic,
	type IPokettoConversation,
} from '@/ds'
import d from '@/lib/datetime'
import { nanoid } from 'nanoid'
import dayjs from 'dayjs'
import { PlatformType, PromptRoleType } from '.prisma/client'

import { DEFAULT_APP_VERSION } from '@/config'

export const flowgpt2poketto_conversation = (f: IFlowgptConversation): IPokettoConversation => ({
	createdAt: d(f.createdAt).toDate(), messages: f.messages.map((m) => ({
		...m,
		type: 'user',
		format: 'text',
		appId: f.id,
		uid: undefined,
		parentId: undefined,
		interactions: {},
		id: nanoid(),
		createdAt: new Date(),
		role: m.role as 'system' | 'user' | 'assistant' | 'function',
	})),
})
export const flowgpt2pokettoApp = (p: IFlowgptPromptBasic | FlowgptPromptFull): AppWithRelation => {
	
	return {
		comments: [], // todo: add comments
		id: p.id,
		name: p.title,
		avatar: p.thumbnailURL,
		categoryId: p.categoryId,
		language: p.language,
		desc: p.description,
		updatedAt: dayjs(p.updatedAt).toDate(),
		createdAt: dayjs(p.createdAt).toDate(),
		platform: PlatformType.FlowGPT,
		version: DEFAULT_APP_VERSION,
		creatorId: p.userId,
		creator: {
			id: p.User.id, name: p.User.name, image: p.User.image, desc: null, email: null, balance: 0, emailVerified: null,
		},
		tags: p.Tag.map((t) => ({
			id: t.name, name: t.name, createdAt: null, updatedAt: null, creatorId: null,
		})),
		state: {
			id: p.id, createdAt: null, updatedAt: null, appId: p.id, views: p.views, calls: p.uses, forks: 0, tips: p.tip, stars: p.saves, shares: p.shares,
		},
		actions: [],
		model: {
			id: p.id, createdAt: null, updatedAt: null, appId: p.id, type: p.model, isOpenSource: true, temperature: p.temperature, initPrompts: [{
				id: nanoid(), appModelId: p.id, role: PromptRoleType.system, content: p.initPrompt,
			}],
		},
	}
	
}
export const flowgpt2poketto_comment = (comment: IFlowGPTComment): IAppComment => ({
	...comment, ratedStars: 0, content: comment.body, user: {
		...comment.user, image: comment.user.image, id: comment.userId, name: comment.user.name, desc: null, balance: 0, emailVerified: null, email: null,
	},
})
