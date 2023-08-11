import { useViewportSize } from '@mantine/hooks'
import { MAX_MOBILE_WIDTH } from '@/config/external/const'

export const useMobile = () => {
	const { width } = useViewportSize()
	return width <= MAX_MOBILE_WIDTH
}
