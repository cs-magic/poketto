/**
 * 这个库主要是因为，clsx 在 webstorm 里 move module 的时候总是会变成  import clsx from 'clsx/clsx' 然后出错！
 */
import { clsx as clsxRaw } from "clsx"

export const clsx = clsxRaw
export default clsx
