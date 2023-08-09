import localFont from 'next/font/local'

export interface ILink {
	href: string
	title: string
}


export const uri = {
	images: {
		AiMap: '/images/bg/ai-anatomy-map@0.5x-裁切版.jpg',
		explore: '/images/mj/home-cover.png',
		carousal: {
			explore: '/images/mj/carousel-explore.jpg',
			competition: '/images/mj/carousel-peace.jpg',
		},
	},
	// companyLogoIco: '/icons/logo/m/32_black.ico',
	companyLogoIco: '/icons/logo/m/32_purple_white.ico',
	productLogoIco: '/icons/logo/m/32_purple_white.ico',
	home: '/',
	discover: '/discover',
	plugins: 'plugins',
	me: {
		following: '/me/following',
		history: '/me/history',
		stars: '/me/stars',
		graph: '/me/graph',
	},
	auth: {
		login: '/auth/login',
		register: '/auth/register',
	},
	about: {
		us: '/about/us',
		faq: '/about/faq',
	},
	product: {
		playground: '/',
		space: '/space',
		agent: '/a',
	},
}

export const aboutLinks: ILink[] = [
	{ title: '常见问题', href: uri.about.faq },
	{ title: '关于我们', href: uri.about.us },
]
export const productLinks: ILink[] = [
	{ title: 'LUMOS', href: uri.product.playground },
]

export const carousals = [
	// { src: uri.images.AiMap, /* 色调太白了，不会让人喜欢的 */ title: 'AIGC 魔法能力评测' },
	{ src: uri.images.carousal.explore, title: 'AIGC 入门指引' },
	{ src: uri.images.carousal.competition, title: 'ChatGPT Prompt 对抗赛' },
]

export const beian = {
	domainMatch: /cs-magic.cn/,
	title: '苏ICP备2023015349号',
}

export const mossSlogan = '-.-. ... -....- -- .- --. .. -.-. .-.-.- .- ..'

export const LOGO_SIZE_LG = 36
export const ICON_SIZE_MD = 28
export const ICON_SIZE_SM = 20
export const ICON_SIZE_XS = 16
