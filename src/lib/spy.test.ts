import { describe, it } from 'node:test'
import * as assert from 'node:assert'
import { spy } from './spy'

describe('spy', () => {
	const basic = (a: number, b: number) => a + b

	it('should return whatever the wrapped function returns', () => {
		assert.equal(spy(basic)(1, 2), basic(1, 2))
	})

	it('should push calls to a stack', () => {
		const spied = spy(basic)
		spied(1, 2)
		spied(3, 4)
		spied(5, 6)
		assert.equal(3, spied.calls.length)
		assert.deepEqual([
			[1, 2],
			[3, 4],
			[5, 6]
		], spied.calls)
	})
})
