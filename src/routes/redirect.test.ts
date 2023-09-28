import { describe, it } from 'node:test'
import * as assert from 'node:assert'
import { redirect } from './redirect'
import { Response } from '../lib/response'

describe('redirect', () => {
	const handler = redirect({
		map: new Map([
			['google', 'https://google.com'],
		])
	} as any)

	it('should return a not found response if the url is not found', () => {
		const result = handler('/bing')
		assert.equal(true, result instanceof Response)
		// @ts-ignore
		assert.equal(404, result._status)
		// @ts-ignore
		assert.equal('Not found', result._body)
	})

	it('should return a redirect response if the url is found', () => {
		const result = handler('/google')
		assert.equal(true, result instanceof Response)
		// @ts-ignore
		assert.equal(302, result._status)
		// @ts-ignore
		assert.equal('https://google.com', result._headers.Location)
	})
})
