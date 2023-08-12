import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

const d = dayjs
export default d


export function sleep(ms: number) {
	return new Promise(resolve => setTimeout(resolve, ms))
}
