import { Server } from 'node:http'
import { IRouteMapper, RouteMap, route_mapping_factory } from './route-mapping'
import { web_server_factory } from './web-server'
import { IRoutes, routes_factory } from './routes'

export type IAppContainer = {
	map: RouteMap
	routes: IRoutes
	web_server: Server
	route_mapper: IRouteMapper
}

export const app_container_factory = (): IAppContainer => {
	const container = {} as IAppContainer
	container.map = new Map()
	container.route_mapper = route_mapping_factory('./urls.txt', (map) => container.map = map)
	container.routes = routes_factory(container)
	container.web_server = web_server_factory(8000, '0.0.0.0', container.routes.redirect)
	return container
}
