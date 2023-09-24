import * as http from 'node:http'
import { Unary } from './data'
import { Response } from './Response'

const remove_query = (x: string) => {
	const i = x.indexOf('?')
	if (i === -1) return x
	else return x.slice(0, i)
}

export const web_server_factory = (port: number, host: string, handler: Unary<string, Response>): http.Server => {
	const server = http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
		const url = remove_query(req.url!)
		handler(url).serve(res)
	})
	server.listen(port, host)
	return server
}
