import { Unary } from './data';

export function pipe<A, B>(
	a: A,
	b: Unary<A, B>,
): B
export function pipe<A, B, C>(
	a: A,
	b: Unary<A, B>,
	c: Unary<B, C>,
): C
export function pipe<A, B, C, D>(
	a: A,
	b: Unary<A, B>,
	c: Unary<B, C>,
	d: Unary<C, D>,
): D
export function pipe<A, B, C, D, E>(
	a: A,
	b: Unary<A, B>,
	c: Unary<B, C>,
	d: Unary<C, D>,
	e: Unary<D, E>,
): E
export function pipe(x: any, ...fs: Unary<any, any>[]): any {
	return fs.reduce((x, f) => f(x), x)
}
