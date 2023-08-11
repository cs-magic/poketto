import { CardsLayoutType, useStore } from '@/store'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import React from 'react'

export const SelectCardsLayout = () => {
	const { cardsLayout, setCardsLayout } = useStore()
	
	// todo: in settings
	return (
		<Select value={cardsLayout} onValueChange={setCardsLayout}>
			<SelectTrigger className={'w-28 hidden md:flex'}>
				<SelectValue placeholder={'卡片布局'}/>
			</SelectTrigger>
			<SelectContent>
				{Object.values(CardsLayoutType).map((cl) => (
					<SelectItem value={cl} key={cl}>{cl}</SelectItem>
				))}
			</SelectContent>
		</Select>
	)
}
