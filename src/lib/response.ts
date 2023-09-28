import { Buffer } from 'node:buffer'
import { ServerResponse } from 'node:http'

type Status =
	200
	| 302
	| 404
	| 500

export class Response {
	private _status: Status
	private _headers: Record<string, string>
	private _body: string | Buffer

	constructor(status: Response['_status'] = 200, headers: Response['_headers'] = {}, body: Response['_body'] = '') {
		this._status = status
		this._headers = headers
		this._body = body
	}

	status(status: Status): this {
		this._status = status
		return this
	}

	header(header: string, value: string): this {
		this._headers[header] = value
		return this
	}

	body(body: string | Buffer): this {
		this._body = body
		return this
	}

	serve(socket: ServerResponse) {
		socket.writeHead(this._status, this._headers)
			.end(this._body)
	}

	static redirect(to: string): Response {
		return new Response(
			302,
			{ 'Location': to }
		)
	}
}
