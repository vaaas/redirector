import { describe, it } from 'node:test'
import * as assert from 'node:assert'
import { pipe } from './function'

describe('function', () => {
	describe('pipe', () => {
		it('should pass an argument through all the steps and return the result', () => {
			const result = pipe(
				1,
				x => x + 1,
				x => x.toString(),
				parseFloat,
				x => x ** 2
			)
			assert.equal(result, 4)
		})
	})
})
