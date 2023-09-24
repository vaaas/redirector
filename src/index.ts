import { app_container_factory } from './app-container'
import * as process from 'node:process'

function main() {
	app_container_factory(process.argv.slice(2))
}

main()
