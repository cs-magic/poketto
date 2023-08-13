import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import calendar from 'dayjs/plugin/calendar'
import updateLocale from 'dayjs/plugin/updateLocale'

dayjs.extend(relativeTime)
dayjs.extend(calendar)
dayjs.extend(updateLocale)


//  ref: https://day.js.org/docs/en/display/calendar-time
dayjs.updateLocale('en', {
	calendar: {
		sameDay: 'h:mm', // The same day ( Today at 2:30 AM )
		lastDay: '[yesterday]', // The day before ( Yesterday at 2:30 AM )
		lastWeek: '[Last] ddd', // Last week ( Last Monday at 2:30 AM )
		sameElse: 'YYYY/MM/DD', // Everything else ( 7/10/2011 )
	},
})

const d = dayjs
export default d


export function sleep(ms: number) {
	return new Promise(resolve => setTimeout(resolve, ms))
}

export const getTimestampMS = () => Date.now()
