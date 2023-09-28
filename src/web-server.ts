import {
	type IncomingMessage,
	type ServerResponse,
	type Server,
	createServer,
} from 'node:http'
import { Unary } from './lib/data'
import { Response } from './lib/response'
import { Config } from './config'

export const remove_query = (x: string) => {
	const i = x.indexOf('?')
	if (i === -1) return x
	else return x.slice(0, i)
}

export const request_listener = (handler: Unary<string, Response>) => (req: IncomingMessage, res: ServerResponse) =>
	handler(remove_query(req.url!)).serve(res)

export const web_server_factory = (config: Config['http'], handler: Unary<string, Response>): Server => {
	const server = createServer(request_listener(handler));
	if ('host' in config) server.listen(config.port, config.host)
	else server.listen(config.pathname)
	return server
}
