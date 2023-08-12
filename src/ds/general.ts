export type ID = string | number

export type IUser = {
	id: ID
	name: string
	avatar: string // note: 可以用 robohash 生成
}

export type Text = {
	id: ID
	title: string // i18n support
}

