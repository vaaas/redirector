export const spy = <I extends any[], O>(f: (...xs: I) => O): ((...xs: I) => O) & { calls: I[] } => {
	const calls: I[] = []
	function spied(...xs: I): O {
		calls.push(xs)
		return f(...xs)
	}
	spied.calls = calls
	return spied
}
