import { useAppStore } from '@/store'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { DotsVerticalIcon } from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button'

export const ControlTool = () => {
	const { chatDetailVisible, toggleChatDetail, chatListVisible, toggleChatList, toggleSidebar, sidebarVisible } = useAppStore()
	
	return (
		<Popover>
			<PopoverTrigger>
				<DotsVerticalIcon/>
			</PopoverTrigger>
			<PopoverContent className={'flex flex-col gap-2'}>
				<Button className={'justify-start pl-4'}
				        variant={'ghost'}
				        onClick={toggleSidebar}>{(sidebarVisible ? 'Hide' : 'Show') + ' Sidebar'}</Button>
				<Button className={'justify-start pl-4'}
				        variant={'ghost'}
				        onClick={toggleChatList}>{(chatListVisible ? 'Hide' : 'Show') + ' Chat List'}</Button>
				<Button className={'justify-start pl-4'}
				        variant={'ghost'}
				        onClick={toggleChatDetail}>{(chatDetailVisible ? 'Hide' : 'Show') + ' Chat Detail'}</Button>
				<Button className={'justify-start pl-4'} variant={'ghost'}>Share (todo)</Button>
			</PopoverContent>
		</Popover>
	)
}
