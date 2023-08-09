export const app = {
	name: 'LUMOS',
	desc: '每个人都是魔法师',
	icon: '/favicon.ico',
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

export enum InvitationStatus {
	pending = 'pending',
	consumed = 'consumed',
	expired = 'expired',
}


export const DEFAULT_USER_ID = 'mark'
export const user = {
	id: DEFAULT_USER_ID,
	workspace: `${DEFAULT_USER_ID}'s workspace`,
	name: '南川',
	email: 'mark@cs-magic.com',
	avatar: `https://robohash.org/${DEFAULT_USER_ID}?set=set2&size=180x180`,
	desc: '曾经沧海难为水，除却巫山不是云。',
	
	balance: {
		current: 100000,
	},
	
	invitation: {
		from: null,
		to: [
			{ id: 'test1', status: InvitationStatus.pending },
			{ id: 'test1', status: InvitationStatus.consumed },
			{ id: 'test1', status: InvitationStatus.expired },
		],
	},
	
	social: {
		following: 8,
		followers: 9,
		impact: 1934,
	},
}
