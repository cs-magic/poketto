export const uri = {
	app: {
		home: '/',
		explore: '/explore',
		pocketApp: '/p',
		docs: {
			intro: '/docs/intro',
			learn: '/docs/learn',
			support: '/docs/support',
		},
	},
	user: {
		dashboard: '/u/dashboard',
		gallery: '/u/gallery',
		integrations: '/u/integrations',
		
		auth: {
			login: '/auth/login',
			register: '/auth/register',
		},
		
		seek: {
			waitlist: '/seek/waitlist',
			enterprise: '/seek/enterprise',
		},
	},
	images: {
		favicon: '/favicon.ico',
		AiMap: '/images/bg/ai-anatomy-map@0.5x-裁切版.jpg',
		explore: '/images/mj/home-cover.png',
		carousal: {
			explore: '/images/mj/carousel-explore.jpg',
			competition: '/images/mj/carousel-peace.jpg',
		},
	},
}

export const carousals = [
	// { src: uri.images.AiMap, /* 色调太白了，不会让人喜欢的 */ title: 'AIGC 魔法能力评测' },
	{ src: uri.images.carousal.explore, title: 'AIGC 入门指引' },
	{ src: uri.images.carousal.competition, title: 'ChatGPT Prompt 对抗赛' },
]

export const app = {
	name: 'LUMOS',
	desc: '每个人都是魔法师',
	icon: uri.images.favicon,
}
