import { clsx } from 'clsx'
import { carousals } from '@/config'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import Image from 'next/image'
import React from 'react'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'


export const HomeCarousel = () => {
	return (
		<Carousel
			className={clsx(
				'w-full md:w-[788px] rounded-2xl',
			)}
			showThumbs={false}
			infiniteLoop
			autoPlay
			interval={3000}
			showStatus={false}
			centerMode={true}
			centerSlidePercentage={92}
			stopOnHover={false}
		>
			{
				carousals.map((item) => (
					<AspectRatio ratio={2} key={item.title}>
						<Image src={item.src} className={'object-cover object-bottom'} alt={item.src} fill sizes={'w-full rounded-2xl'}/>
						<p className="legend">{item.title}</p>
					</AspectRatio>
				))
			}
		</Carousel>
	)
}
