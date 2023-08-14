import pino from 'pino'
import { logflarePinoVercel } from 'pino-logflare'

// create pino-logflare console stream for serverless functions and send function for browser logs
// Browser logs are going to: https://logflare.app/sources/13989
// Vercel log drain was setup to send logs here: https://logflare.app/sources/13830

const { stream, send } = logflarePinoVercel({
	apiKey: 'vVlsKT-3Luqw',
	sourceToken: 'eb2b3767-bc24-4d48-b756-b4a980ec0fd3',
})

// create pino logger
const logger = pino({
	browser: {
		transmit: {
			level: 'info',
			send: send,
		},
	},
	level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
	base: {
		env: process.env.NODE_ENV,
		revision: process.env.VERCEL_GITHUB_COMMIT_SHA,
	},
}, stream)

export default logger
