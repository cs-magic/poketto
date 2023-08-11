import { InvitationStatus } from '@/ds/status'

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
