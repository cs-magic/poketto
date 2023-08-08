import { Code, createStyles, Group, Navbar, rem, ScrollArea, TextInput } from '@mantine/core'
import Logo from '../../../public/images/logo/m/1280.svg'
import { UserButton } from '@/components/mantine/user.button'
import { LinksGroup } from '@/components/mantine/links.group'
import {
	IconAdjustments,
	IconCalendarStats,
	IconFileAnalytics,
	IconGauge,
	IconLock,
	IconNotes,
	IconPresentationAnalytics,
	IconSearch,
} from '@tabler/icons-react'
import clsx from 'clsx'
import { app, user } from '@/config/app'

const mockdata = [
	{ label: 'Dashboard', icon: IconGauge },
	{
		label: 'Market news',
		icon: IconNotes,
		initiallyOpened: true,
		links: [
			{ label: 'Overview', link: '/' },
			{ label: 'Forecasts', link: '/' },
			{ label: 'Outlook', link: '/' },
			{ label: 'Real time', link: '/' },
		],
	},
	{
		label: 'Releases',
		icon: IconCalendarStats,
		links: [
			{ label: 'Upcoming releases', link: '/' },
			{ label: 'Previous releases', link: '/' },
			{ label: 'Releases schedule', link: '/' },
		],
	},
	{ label: 'Analytics', icon: IconPresentationAnalytics },
	{ label: 'Contracts', icon: IconFileAnalytics },
	{ label: 'Settings', icon: IconAdjustments },
	{
		label: 'Security',
		icon: IconLock,
		links: [
			{ label: 'Enable 2FA', link: '/' },
			{ label: 'Change password', link: '/' },
			{ label: 'Recovery codes', link: '/' },
		],
	},
]

const useStyles = createStyles((theme) => ({
	
	section: {
		marginLeft: `calc(${theme.spacing.md} * -1)`,
		marginRight: `calc(${theme.spacing.md} * -1)`,
		marginBottom: theme.spacing.md,
		
		'&:not(:last-of-type)': {
			borderBottom: `${rem(1)} solid ${
				theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
			}`,
		},
	},
	
	navbar: {
		paddingTop: 0,
		paddingBottom: 0,
		backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
	},
	
	header: {
		padding: theme.spacing.md,
		paddingTop: 0,
		marginLeft: `calc(${theme.spacing.md} * -1)`,
		marginRight: `calc(${theme.spacing.md} * -1)`,
		color: theme.colorScheme === 'dark' ? theme.white : theme.black,
		borderBottom: `${rem(1)} solid ${
			theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
		}`,
	},
	
	links: {
		marginLeft: `calc(${theme.spacing.md} * -1)`,
		marginRight: `calc(${theme.spacing.md} * -1)`,
	},
	
	linksInner: {
		paddingTop: 0, // theme.spacing.xl,
		paddingBottom: theme.spacing.xl,
	},
	
	footer: {
		marginLeft: `calc(${theme.spacing.md} * -1)`,
		marginRight: `calc(${theme.spacing.md} * -1)`,
		borderTop: `${rem(1)} solid ${
			theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
		}`,
	},
	
	searchCode: {
		fontWeight: 700,
		fontSize: rem(10),
		backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
		border: `${rem(1)} solid ${
			theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[2]
		}`,
	},
}))


export default function Sidebar() {
	
	const { classes } = useStyles()
	const links = mockdata.map((item) => <LinksGroup {...item} key={item.label}/>)
	
	
	return (
		<Navbar width={{ sm: 300 }} p="md" className={clsx(
			classes.navbar,
			'h-full',
		)}>
			<Navbar.Section className={classes.header}>
				<Group position="apart">
					<div className={'inline-flex items-end gap-2'}>
						<Logo height={28}/>
						<h1 className={'font-bold text-xl'}>{app.name}</h1>
					</div>
					<Code sx={{ fontWeight: 700 }}>Beta(0.3.1)</Code>
				</Group>
			</Navbar.Section>
			
			<div className={'mt-4 mb-0'}>
				<TextInput
					placeholder="Search"
					size="xs"
					icon={<IconSearch size="0.8rem" stroke={1.5}/>}
					rightSectionWidth={70}
					rightSection={<Code className={classes.searchCode}>Ctrl + K</Code>}
					styles={{ rightSection: { pointerEvents: 'none' } }}
					mb="sm"
				/>
			</div>
			
			<Navbar.Section grow className={classes.links} component={ScrollArea}>
				<div className={classes.linksInner}>{links}</div>
			</Navbar.Section>
			
			<Navbar.Section className={classes.footer}>
				<UserButton
					image={`https://robohash.org/${user.id}?set=set2&size=128x128`}
					name={user.id}
					email={user.email}
				/>
			</Navbar.Section>
		</Navbar>
	)
}
