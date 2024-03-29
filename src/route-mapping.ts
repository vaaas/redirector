import { readFileSync, watch as watchFile } from 'node:fs'
import { Result, bind, fold } from './lib/result'
import { pipe } from './lib/function'

export type RouteMap = Map<string, string>

const read_file = (pathname: string): Result<string> => {
	try {
		return readFileSync(pathname, 'utf-8')
	} catch (e) {
		return e as Error
	}
}

const is_route_map_entries = (x: unknown): x is Array<[string, string]> =>
	Array.isArray(x)
	&& x.every(x =>
		Array.isArray(x)
		&& x.length === 2
		&& x.every(x => typeof x === 'string')
	)

const parse_file = (contents: string): Result<RouteMap> => {
	const split = contents.trim().split('\n').map(x => x.split('\t'))
	if (!is_route_map_entries(split))
		return new Error('could not parse file')
	else
		return new Map(split)
}

export type IRouteMapper = {
	stop: () => void
}

export const route_mapping_factory = (
	pathname: string,
	on_update: (map: RouteMap) => void,
	read: typeof read_file = read_file,
	watch: typeof watchFile = watchFile,
): IRouteMapper => {
	const do_business = () => pipe(
		pathname,
		read,
		bind(parse_file),
		fold(
			error => console.error(error),
			on_update,
		),
	)

	const watcher = watch(pathname, (event) => {
		if (event === 'change') {
			console.log('URLs file changed')
			do_business()
		}
	})

	do_business()

	return {
		stop() {
			watcher.close()
		}
	}
}
