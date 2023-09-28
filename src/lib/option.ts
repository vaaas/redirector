import { Unary } from './data';

export type Option<X> = X | undefined

export const fold = <A, B>(bad: Unary<undefined, B>, good: Unary<A, B>) => (x: Option<A>): B => x === undefined ? bad(x as undefined) : good(x)
