import { type ChatGPTPromptItem } from '@/ds/chatgpt'
import { type ID, type Text, type User } from '@/ds/general'

export interface PokettoAppFunction /* extends ChatGPTFunction */
{
	
}

export type PokettoAppComment = {
	ratedStars: number
	content: string // !important: support markdown
	user: User
}

export interface PokettoAppBasic {
	id: string
	user: User
	version: string // !important: 用户打开的时候默认拉取最新版
	basic: {
		title: string
		desc: string
		// todo: industry 和 category 有啥区别，两者有必要并存吗
		industry: Text[] // 按级分类（父子关系），e.g. [娱乐, 游戏]
		category: Text[] // 按级分类（父子关系），e.g. [生产力, 平面设计]
		tags: Text[] // 并列关系，e.g. 法律 | GPT4
	}
	permissions: {
		visible: boolean | ID[]
		openSource: boolean // 用户是否可以看到 initPrompts，以及支持 fork
	}
	model: {
		manufacturer: Text // ChatGPT | Claude | OpenChat | ...
		type: string // 具体的模型号：gpt-3.5-xxx | gpt-4-xx | ...
		initPrompts: ChatGPTPromptItem[] // 不直接用 systemPrompt 是因为要支持 few-shot
		temperature: number
		functions: PokettoAppFunction[] // todo: support plugins
		// ... other args
	}
	state: {
		/**
		 * [before see] view(visible)
		 * --> [see] interactions / star / fork / share
		 * --> [used] comment(rate) / tip(付小费) / share
		 */
		views: number
		interactions: Record<string, number> // 统计类似 discord 的表情回复
		stars: number // 收藏（也就可以使用了）
		forks: number // 前提要开源
		shares: number
		usage: {
			users: number // 统计总用户数
			triggers: number // 统计用户总的交互次数
			tokens: number // 统计所有会话的词量
			// ... 其他统计指标（比如频率……）
		}
		comments: number
		ratedStars: number // 基于评论平均出来（考虑要不要基于用户声望加权）
		tips: number
	}
}

export interface PokettoAppFull
	extends PokettoAppBasic {
	comments: PokettoAppComment[]
}
