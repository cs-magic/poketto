import { HttpsProxyAgent } from 'https-proxy-agent'

export const proxyAgent = new HttpsProxyAgent('http://localhost:7890')
