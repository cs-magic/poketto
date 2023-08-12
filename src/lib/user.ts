import { type IUser } from '@/ds/general'

/**
 * todo: distinguish platform
 * @param {IUser} user
 */
export const getUserUri = (user: IUser) => `https://flowgpt.com/user/${user.id}`
