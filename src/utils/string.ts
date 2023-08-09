import { capitalize } from 'lodash'

export const getShortName = (s: string, len: number = 2) => {
	return s
		.split(/\s+/)
		.slice(0, len)
		.map((i) => capitalize(i[0]))
		.join('')
}
