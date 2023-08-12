export type ID = string

export type User = {
	id: number
	name: string
	avatar: string // note: 可以用 robohash 生成
}

export type Text = {
	id: string
	title: string // i18n support
}

