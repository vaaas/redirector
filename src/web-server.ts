import * as http from 'node:http'
import { Unary } from './data'
import { Response } from './Response'
import { Config } from './config'

const remove_query = (x: string) => {
	const i = x.indexOf('?')
	if (i === -1) return x
	else return x.slice(0, i)
}

export const web_server_factory = (config: Config['http'], handler: Unary<string, Response>): http.Server => {
	const server = http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
		const url = remove_query(req.url!)
		handler(url).serve(res)
	})
	if ('host' in config)
		server.listen(config.port, config.host)
	else
		server.listen(config.pathname)
	return server
}
