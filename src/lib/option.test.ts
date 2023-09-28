import { describe, it } from 'node:test'
import * as assert from 'node:assert'
import * as option from './option'

describe('option', () => {
	describe('fold', () => {
		const f = option.fold(
			() => Infinity,
			(x: number) => x + 1,
		)

		it('should call the left function if the data is undefined', () => {
			assert.equal(Infinity, f(undefined))
		})

		it('should call the right function if the data is defined', () => {
			assert.equal(2, f(1))
		})
	})
})
