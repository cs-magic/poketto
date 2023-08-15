import { PromptRoleType } from '.prisma/client'
import { type AppWithRelation } from '@/ds/poketto'
import { App, AppModel, PrommptMessage, User } from '@prisma/client'
import { nanoid } from 'nanoid'


export const POKETTO_PLATFORM = 'Poketto' as const
export const POKETTO_VERSION = '1.0.0' as const
export const POKETTO_APP_ID = 'Your-Sole-Poketto' as const
export const POKETTO_MODEL_ID = "poketto-1.0" as const
export const POKETTO_APP_CREATED_AT = new Date(2023, 8, 13)
export const POKETTO_APP_UPDATED_AT = new Date(2023, 8, 13)
export const POKETTO_APP_AVATAR = '/images/logo/poketto/Your-Sole-Poketto.png'
export const POKETTO_APP_NAME = 'Your Sole Poketto' as const
export const POKETTO_APP_DESC = 'The sole **Poketto** you need, at your service, anytime, anywhere, developed by Poketto Official.' as const
export const POKETTO_CREATOR_ID = 'poketto-official' as const
export const POKETTO_CREATOR_NAME = 'Poketto Official' as const
export const POKETTO_CREATOR_DESC = 'This is Poketto Official !' as const
export const POKETTO_CREATOR_AVATAR = '/images/logo/m/1280.png'
export const POKETTO_CREATOR_EMAIL = 'pr@cs-magic.com'
export const POKETTO_MODEL_NAME = 'poketto-1.0' as const
export const POKETTO_LANGUAGE = 'zh'
export const POKETTO_TAGS = ['poketto', 'companion', 'ChatGPT']
export const POKETTO_SYSTEM_PROMPT = `You are a loyal companion by the name of Poketto, developed by the official Poketto team led by MarkShawn, and my name is {{userName}}.
For each conversation we have, you must summarize that conversation as 1-3 hashtags after giving a reply, with line breaks added to the end of the reply. Each hashtag should be as short as possible, prefixed with a "#" sign. If the tag involves more than one word, replace the space between the words with a "-" sign. Every two tags need to be separated by a space.`
export const POKETTO_WELCOME_MESSAGE = `Hi，{{userName}}！

我是您唯一的 Poketto（您可以叫我小 P，哎呀，是 Poketto 的 P，不是那个 P 哦！）

我有好多好多魔法，以下列举一些哦：

1. 我将是您的最好陪伴，随时随地听候您的差遣！
2. 我将拥有您的全部记忆（当记忆达到 100 条后，可以解锁『邂逅』模式哦！）
3. 我将是您的百科全书，以后不懂的问题，妈妈再也不用担心我会掉头发啦！
4. ……

那么，就请接下来多多关照啦！
`
export const POKETTO_CATEGORY_ID = 0

export const PokettoOfficial: User = {
	id: POKETTO_CREATOR_ID,
	name: POKETTO_CREATOR_NAME,
	desc: POKETTO_CREATOR_DESC,
	email: POKETTO_CREATOR_EMAIL,
	balance: 0,
	image: POKETTO_CREATOR_AVATAR,
	emailVerified: POKETTO_APP_CREATED_AT,
}

export const YourSolePokettoApp: App = {
	id: POKETTO_APP_ID,
	createdAt: POKETTO_APP_CREATED_AT,
	updatedAt: POKETTO_APP_UPDATED_AT,
	creatorId: POKETTO_CREATOR_ID,
	platform: POKETTO_PLATFORM,
	version: POKETTO_VERSION,
	desc: POKETTO_APP_DESC,
	name: POKETTO_APP_NAME,
	language: POKETTO_LANGUAGE,
	categoryId: POKETTO_CATEGORY_ID,
	avatar: POKETTO_APP_AVATAR,
}

export const YourSolePokettoModel: AppModel = {
	id: POKETTO_MODEL_ID,
	appId: POKETTO_APP_ID,
	createdAt: POKETTO_APP_CREATED_AT,
	updatedAt: POKETTO_APP_UPDATED_AT,

	type: POKETTO_MODEL_NAME,
	isOpenSource: false,
	temperature: .7,
}

export const YourSolePokettoModelInitPrompts: PrommptMessage[] = [
	{
		id: nanoid(),
		appModelId: POKETTO_MODEL_ID,
		role: PromptRoleType.system,
		content: POKETTO_SYSTEM_PROMPT,
	}]

export const YourSolePoketto: AppWithRelation = {
	...YourSolePokettoApp,
	model: {
		...YourSolePokettoModel,
		initPrompts: YourSolePokettoModelInitPrompts,
	},
	actions: [],
	creator: PokettoOfficial,
	tags: POKETTO_TAGS.map((t) => ({
		id: t, name: t, creatorId: POKETTO_CREATOR_ID, createdAt: POKETTO_APP_CREATED_AT, updatedAt: POKETTO_APP_UPDATED_AT,
	})),
	state: {
		id: POKETTO_APP_ID,
		createdAt: POKETTO_APP_CREATED_AT,
		updatedAt: POKETTO_APP_UPDATED_AT,
		appId: POKETTO_APP_ID,
		shares: 0,
		tips: 0,
		stars: 0,
		forks: 0,
		calls: 0,
		views: 0,
	},
	comments: [
		{
			id: nanoid(),
			createdAt: POKETTO_APP_CREATED_AT,
			updatedAt: POKETTO_APP_UPDATED_AT,
			userId: POKETTO_CREATOR_ID,
			content: 'This is a dedicated and developing app, hope helped you. Best wishes, Poketto Team.',
			title: 'Your Sole Poketto !',
			rate: 5,
			appId: POKETTO_APP_ID,
		},
	],
}

