import { type IPokettoBasic } from '@/ds/poketto'
import { getRobotAvatar } from '@/lib/string'
import { getTimestampMS } from '@/lib/datetime'
import Mustache from 'mustache'
import { user } from '@/config/user'
import { createPokettoChannel } from '@/lib/poketto'

// aNB-zlvB30vEIS-yuX-5J: uploaded to flowgpt: https://flowgpt.com/p/your-sole-poketto
export const POKETTO_CHANNEL_ID = 'Your-Sole-Poketto' as const
export const POKETTO_USER_ID = 'your-sole-poketto' as const
export const POKETTO_USER_NAME = 'Your Sole Poketto' as const
export const POKETTO_MODEL_NAME = 'poketto-1.0' as const
export const POKETTO_MANUFACTURE_NAME = 'Poketto Official' as const
export const POKETTO_CHANNEL_TITLE = 'Your Sole Poketto' as const
export const POKETTO_CHANNEL_DESC = 'The sole **Poketto** you need, at your service, anytime, anywhere, developed by Poketto Official.' as const
export const LANGUAGE = 'zh'
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
export const pokettoBasic: IPokettoBasic = {
	id: POKETTO_CHANNEL_ID,
	basic: {
		avatar: getRobotAvatar(POKETTO_CHANNEL_ID),
		title: POKETTO_CHANNEL_TITLE,
		createdAt: getTimestampMS(),
		language: LANGUAGE,
		tags: ['poketto', 'companion', 'ChatGPT'],
		desc: POKETTO_CHANNEL_DESC,
		category: ['Lifestyle'],
		industry: [],
		updatedAt: getTimestampMS(),
		version: '1.0.0',
	},
	state: {
		ratedStars: 0,
		comments: 0,
		forks: 0,
		shares: 0,
		stars: 0,
		tips: 0,
		tokens: 0,
		triggers: 0,
		users: 0,
		views: 0,
	},
	user: {
		id: POKETTO_USER_ID,
		name: POKETTO_USER_NAME,
		avatar: getRobotAvatar(POKETTO_USER_ID),
	},
	comments: [],
	model: {
		type: POKETTO_MODEL_NAME,
		functions: [],
		initPrompts: [
			{
				role: 'system',
				content: Mustache.render(POKETTO_SYSTEM_PROMPT, { userName: user.name }),
			},
		],
		manufacturer: POKETTO_MANUFACTURE_NAME,
	},
	conversation: {
		createdAt: getTimestampMS(),
		messages: [
			{
				role: 'assistant',
				content: Mustache.render(POKETTO_WELCOME_MESSAGE, { userName: user.name }),
			},
		],
	},
	permissions: {
		visible: true,
		openSource: false,
	},
}

