import { describe, it  } from 'node:test'
import * as assert from 'node:assert'
import { config_factory } from './config'

describe('config', () => {
	describe('config_factory', () => {
		it('should return sensible defaults when call without any arguments', () => {
			assert.deepEqual({
				http: {
					port: 8000,
					host: '0.0.0.0',
				},
				urls: './urls.txt'
			}, config_factory([]))
		})

		it('should have a configurable host', () => {
			assert.deepEqual({
				http: {
					port: 8000,
					host: 'test.example.com',
				},
				urls: './urls.txt'
			}, config_factory(['--host', 'test.example.com']))
		})

		it('should have a configurable port', () => {
			assert.deepEqual({
				http: {
					port: 1234,
					host: '0.0.0.0',
				},
				urls: './urls.txt'
			}, config_factory(['--port', '1234']))
		})

		it('should have a configurable urls directory', () => {
			assert.deepEqual({
				http: {
					port: 8000,
					host: '0.0.0.0',
				},
				urls: '/etc/redirector/urls.txt'
			}, config_factory(['--urls', '/etc/redirector/urls.txt']))
		})

		it('should accept a unix domain socket instead of network configuration', () => {
			assert.deepEqual({
				http: {
					pathname: '/tmp/domain.socket'
				},
				urls: './urls.txt'
			}, config_factory(['--fd', '/tmp/domain.socket']))
		})

		it('should ignore random parameters', () => {
			assert.deepEqual({
				http: {
					pathname: '/tmp/domain.socket'
				},
				urls: '/etc/redirector/urls.txt'
			}, config_factory([
				'random',
				'--fd', '/tmp/domain.socket',
				'even more random',
				'completely random',
				'--urls', '/etc/redirector/urls.txt',
			]))
		})
	})
})
