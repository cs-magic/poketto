import { type IPokettoBasic } from '@/ds/poketto'

export const getPokettoUri = (poketto: IPokettoBasic) => `/p/${poketto.id}`
