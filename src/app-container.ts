import { Server } from 'node:http'
import { IRouteMapper, RouteMap, route_mapping_factory } from './route-mapping'
import { web_server_factory } from './web-server'
import { IRoutes, routes_factory } from './routes'
import { Config, config_factory } from './config'

export type IAppContainer = {
	map: RouteMap
	routes: IRoutes
	web_server: Server
	route_mapper: IRouteMapper
	config: Config
}

export const app_container_factory = (args: string[]): IAppContainer => {
	const container = {} as IAppContainer
	container.config = config_factory(args)
	container.map = new Map()
	container.route_mapper = route_mapping_factory(container.config.urls, (map) => container.map = map)
	container.routes = routes_factory(container)
	container.web_server = web_server_factory(container.config.http, container.routes.redirect)
	return container
}
