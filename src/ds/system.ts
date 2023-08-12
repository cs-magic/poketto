import { FlowGPTSortOrder } from '@/ds/flowgpt'

export enum InvitationStatus {
	pending = 'pending',
	consumed = 'consumed',
	expired = 'expired',
}

export const SortOrder = { ...FlowGPTSortOrder }
export type SortOrder = FlowGPTSortOrder
