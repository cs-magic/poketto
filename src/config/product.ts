import { uri } from '@/config/uri'


export const product = {
	name: '口袋 A I',
	// name: 'Poketto.AI',
	currency: '甜甜圈',
	// currency: 'Dora',
	desc: '每一个人的哆啦A梦', // '每个人都是魔法师',
	icon: uri.images.favicon,
}


export const carousals = [
	// { src: uri.images.AiMap, /* 色调太白了，不会让人喜欢的 */ title: 'AIGC 魔法能力评测' },
	{ src: uri.images.carousal.explore, title: 'AIGC 入门指引' },
	{ src: uri.images.carousal.competition, title: 'ChatGPT Prompt 对抗赛' },
]
