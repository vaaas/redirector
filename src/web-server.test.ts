import { describe, it } from 'node:test'
import { remove_query, request_listener } from './web-server'
import * as assert from 'node:assert'
import { spy } from './lib/spy'

describe('web-server', () => {
	describe('remove_query', () => {
		it('should return a url without its query', () => {
			assert.equal('/test', remove_query('/test?key=value&key2=value2'))
		})

		it('should remove the query even when there are no keys or values', () => {
			assert.equal('/test', remove_query('/test?'))
		})

		it('should do nothing when there is no query', () => {
			assert.equal('/test', remove_query('/test'))
		})
	})

	describe('request_listener', () => {
		it('should call the handler without the query', () => {
			const handler = spy(() => ({ serve: () => undefined }))
			const result = request_listener(handler as any)({ url: '/test?query' } as any, {} as any)
			assert.deepEqual([
				['/test']
			], handler.calls)
		})

		it('should pass the server response to the returned object', () => {
			const response = {
				serve: spy((x: any) => undefined),
			}
			const handler = () => response
			const res = {}
			const result = request_listener(handler as any)({ url: '/' } as any, res as any)
			assert.equal(response.serve.calls[0]![0]!, res)
		})
	})
})
