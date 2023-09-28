import { Response } from '../lib/response'
import { IAppContainer } from '../app-container'
import { pipe } from '../lib/function'
import { fold } from '../lib/option'

export const redirect = (app: IAppContainer) => (url: string): Response => pipe(
	app.map.get(url.slice(1)),
	fold(
		() => new Response(404, { 'Content-Type': 'text/plain' }, 'Not found'),
		(route: string) => Response.redirect(route)
	),
)
