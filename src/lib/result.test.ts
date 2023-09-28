import { describe, it } from 'node:test'
import * as assert from 'node:assert'
import * as result from './result'

const inc = (x: number) => x + 1

describe('result', () => {
	const some_error = new Error('I am an error')

	describe('map', () => {
		it('should do nothing if the data is an error', () => {
			assert.equal(some_error, result.map(inc)(some_error))
		})

		it('should call the function when the data is not an error', () => {
			assert.equal(2, result.map(inc)(1))
		})
	})

	describe('bind', () => {
		const another_error = new Error('I am a different error')
		const errors_out = (x: unknown) => another_error

		it('should do nothing if the data is an error', () => {
			assert.equal(some_error, result.bind(inc)(some_error))
		})

		it('should run normally if the data is not an error', () => {
			assert.equal(another_error, result.bind(errors_out)(1))
		})
	})

	describe('fold', () => {
		const f = result.fold(
			() => 1,
			inc,
		)
		it('should run the left function if the data is an error', () => {
			assert.equal(1, f(some_error))
		})

		it('should run the right function if the data is not an error', () => {
			assert.equal(2, f(1))
		})
	})
})
