export type Config = {
	http: {
		port: number
		host: string
	} | {
		pathname: string
	}

	urls: string
}

export const config_factory = (args: string[]): Config => {
	const config: Config = {
		http: {
			port: 8000,
			host: '0.0.0.0',
		},

		urls: './urls.txt',
	}

	for (let i = 0; i < args.length; i++) {
		const arg = args[i]

		switch (arg) {
			case '--host':
				// @ts-ignore
				delete config.http.pathname
				// @ts-ignore
				config.http.host = args[i+1]!
				i++
				break

			case '--port':
				// @ts-ignore
				delete config.http.pathname
				// @ts-ignore
				config.http.port = parseFloat(args[i+1]!)
				i++
				break

			case '--fd':
				// @ts-ignore
				delete config.http.host
				// @ts-ignore
				delete config.http.port
				// @ts-ignore
				config.http.pathname = args[i+1]
				i++
				break

			case '--urls':
				config.urls = args[i+1]!
				i++
				break

			default:
				break
		}
	}

	return config
}
