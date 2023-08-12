import { type IPoketto } from '@/ds/poketto'

export const getPokettoUri = (poketto: IPoketto) => `/p/${poketto.id}`
