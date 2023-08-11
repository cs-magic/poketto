import { capitalize } from 'lodash'

export const getShortName = (s: string, len: number = 2) => {
	return s
		.split(/\s+/)
		.slice(0, len)
		.map((i) => capitalize(i[0]))
		.join('')
}

/**
 * ref: https://robohash.org/
 *
 * @param {string} key
 * @param {number} width
 * @param {number} height
 * @param {number} mode
 * @return {`https://robohash.org/${string}?set=set${number}&size=${number}x${number}`}
 */
export const getRobotAvatar = ({ key, width = 256, height = 256, mode = 3 }: {
	key: string
	width: number
	height: number
	mode: number
}) => {
	return `https://robohash.org/${key}?set=set${mode}&size=${width}x${height}`
}
