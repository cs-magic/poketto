import React from 'react'
import Image from 'next/image'

import OpenchatIcon from '@/../public/brands/openchat.png'
import MidjourneyIcon from '@/../public/brands/midjourney.png'
import CSCoin from '@/../public/images/cs-coin.svg'


const dimension = 'wh-5'
export const Icons = {
	openchat: () => <Image src={OpenchatIcon} alt={'openchat'} className={dimension}/>,
	midjourney: () => <Image src={MidjourneyIcon} alt={'midjourney'} className={dimension}/>,
	csCoin: () => <CSCoin className={dimension}/>,
}
