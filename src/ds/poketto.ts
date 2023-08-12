import { type ChatGPTPromptItem } from '@/ds/chatgpt'
import { type ID, type IUser } from '@/ds/general'
import { type IFlowGPTComment, type IFlowgptConversation } from '@/ds/flowgpt'


export interface IPoketto {
	id: string
	user: IUser
	conversation?: IFlowgptConversation
	comments?: IPokettoComment[]
	basic: {
		version: string // !important: 用户打开的时候默认拉取最新版
		language: string
		title: string
		desc: string
		avatar: string
		// todo: industry 和 category 有啥区别，两者有必要并存吗
		industry: ID[] // 按级分类（父子关系），e.g. [娱乐, 游戏]
		category: ID[] // 按级分类（父子关系），e.g. [生产力, 平面设计]
		tags: string[] // 并列关系，e.g. 法律 | GPT4，用户在创建 tag 的时候，只跟自己的语言有关
		createdAt: number
		updatedAt: number
	}
	permissions: {
		visible: boolean | ID[]
		openSource: boolean // 用户是否可以看到 initPrompts，以及支持 fork
	}
	model: {
		manufacturer: string // ChatGPT | Claude | OpenChat | ...
		type: string // 具体的模型号：gpt-3.5-xxx | gpt-4-xx | ...
		initPrompts: ChatGPTPromptItem[] // 不直接用 systemPrompt 是因为要支持 few-shot
		temperature: number
		functions: IPokettoFunction[] // todo: support plugins
		// ... other args
	}
	state: {
		/**
		 * [before see] view(visible)
		 * --> [see] interactions / star / fork / share
		 * --> [used] comment(rate) / tip(付小费) / share
		 */
		views: number
		stars: number // 收藏（也就可以使用了）
		forks: number // 前提要开源
		shares: number
		
		comments: number
		ratedStars: number // 基于评论平均出来（考虑要不要基于用户声望加权）
		tips: number
		
		// 用户使用相关
		users: number // 统计总用户数
		triggers: number // 统计用户总的交互次数
		tokens: number // 统计所有会话的词量
		// ... 其他统计指标（比如频率……）
	} & Record<string, number> // interactions 统计类似 discord 的表情回复
	
	
}


export interface IPokettoComment
	extends Omit<IFlowGPTComment, 'user'> {
	ratedStars: number
	content: string // !important: support markdown
	user: IUser
}

export interface IPokettoFunction /* extends ChatGPTFunction */
{

}
