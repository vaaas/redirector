import { Unary } from './data'

export type Result<X> = X | Error

export const map = <A, B>(f: Unary<A, B>) => (x: Result<A>): Result<B> => x instanceof Error ? x : f(x)

export const bind = <A, B>(f: Unary<A, Result<B>>) => (x: Result<A>): Result<B> => x instanceof Error ? x : f(x)

export const fold = <A, B>(bad: Unary<Error, B>, good: Unary<A, B>) => (x: Result<A>): B => x instanceof Error ? bad(x) : good(x)
