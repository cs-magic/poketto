import { type PropsWithChildren } from 'react'
import { type DEVICE_TYPE, DEVICES } from '@/const'
import { clsx } from 'clsx'

export const DeviceContainerInner = ({ height, width, ratio = 1, children }: PropsWithChildren & {
	height: number
	width: number
	ratio?: number
}) => {
	return (
		<div style={{ height: height * ratio, width: width * ratio }} className={'overflow-hidden shrink-0'}>
			<div className={'origin-top-left'} style={{ transform: `scale(${ratio})` }}>
				{children}
			</div>
		</div>
	)
}


export const DeviceContainer = ({ device = 'iphone-14-pro', ratio = 1, children }: PropsWithChildren & {
	device?: DEVICE_TYPE
	ratio?: number
}) => {
	const { w, h, r = 68 } = DEVICES[device]
	return (
		<DeviceContainerInner width={w} height={h} ratio={ratio}>
			<div className={clsx('device', `device-${device}`)}>
				<div className="device-frame">
					{/* ref: https://codesandbox.io/s/react-phone-mockup-slider-wsdy5?file=/src/App.js:1232-1296 */}
					<div className={'w-full h-full overflow-hidden bg-white'} style={{ borderRadius: r }}>
						{children}
					</div>
				</div>
				<div className="device-stripe "></div>
				<div className="device-header "></div>
				<div className="device-sensors "></div>
				<div className="device-btns "></div>
				<div className="device-power "></div>
			</div>
		</DeviceContainerInner>
	)
}
