import { Response } from '../Response'
import { IAppContainer } from '../app-container'

export const redirect = (app: IAppContainer) => (url: string): Response => {
	const route = app.map.get(url)
	if (route)
		return Response.redirect(route)
	else
		return new Response(404, { 'Content-Type': 'text/plain' }, 'Not found')
}
