import { Response } from '../Response'
import { IAppContainer } from '../app-container'
import { pipe } from '../function'
import { fold } from '../option'

export const redirect = (app: IAppContainer) => (url: string): Response => pipe(
	app.map.get(url),
	fold(
		() => new Response(404, { 'Content-Type': 'text/plain' }, 'Not found'),
		(route: string) => Response.redirect(route)
	),
)
