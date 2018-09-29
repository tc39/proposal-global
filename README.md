# [global](https://www.npmjs.com/package/globalthis)
ECMAScript Proposal, specs, and reference implementation for `globalThis`

Spec drafted by [@ljharb](https://github.com/ljharb).

This proposal is currently [stage 3](https://github.com/tc39/ecma262) of the [process](https://tc39.github.io/process-document/).

## Rationale
It is difficult to write portable ECMAScript code which accesses the global object. On the web, it is accessible as `window` or `self` or `this` or `frames`; on node.js, it is `global` or `this`; among those, only `this` is available in a shell like V8's `d8` or JavaScriptCore's `jsc`. In a standalone function call in sloppy mode, `this` works too, but it's `undefined` in modules or in strict mode within a function. In such contexts, the global object can still be accessed by `Function('return this')()`, but that form is inaccessible with some CSP settings, such as within Chrome Apps. Below is some code from the wild to get the global object, passed in as the single argument to an IIFE, which works for most cases but won't actually work in `d8` when in a module or in strict mode inside a function (which could be fixed using the `Function` trick):
```js
function foo() {
	// If we're in a browser, the global namespace is named 'window'. If we're
	// in node, it's named 'global'. If we're in a shell, 'this' might work.
	(typeof window !== "undefined"
		? window
		: (typeof process === 'object' &&
		   typeof require === 'function' &&
		   typeof global === 'object')
			? global
			: this);
}
```

In addition, the `es6-shim` had to switch from `Function('return this')()` due to [CSP concerns](https://github.com/paulmillr/es6-shim/issues/301), such that the current [check](https://github.com/paulmillr/es6-shim/commit/2367e0953edd01ae9a5628e1f47cf14b0377a7d6) to handle browsers, node, web workers, and frames is:
```js
var getGlobal = function () {
	// the only reliable means to get the global object is
	// `Function('return this')()`
	// However, this causes CSP violations in Chrome apps.
	if (typeof self !== 'undefined') { return self; }
	if (typeof window !== 'undefined') { return window; }
	if (typeof global !== 'undefined') { return global; }
	throw new Error('unable to locate global object');
};
```

## HTML and the `WindowProxy`

In HTML 5, the global object is separated into the `Window` and the `WindowProxy`. New attributes are set on the `Window`, but top-level this has the identity of the `WindowProxy`. The `WindowProxy` forwards all object operations to the underlying `Window`, but as the page changes, the global object maintains the same identity while the underlying `Window` is swapped out.

ES6/ES2015 does not account for the `Window`/`WindowProxy` structure, and simply refers to ”the global object” directly. This specification does the same. If the ECMAScript specification is changed for top-level this to account for `WindowProxy`, then the change should also apply to the definition of this proposal.

## SES interaction

For Secure ECMAScript, it is important that all references to the global object be spoof-able and capable of being locked down, so that each context gets its own shadow global context. Additionally, references to the global object should not be reachable from other ECMAScript intrinsic objects, which SES would like to simply recursively freeze. In this proposal, `global` is a writable and configurable property of the global object, so it should meet SES requirements.

## Naming
~~There is desire to reify one of the existing global property names, particularly `global` or `window`, instead of `System.global`. Further research will be done to determine if either of these two options will or will not break existing code doing runtime environment detection.~~ ~~Further research has determined that using `global` will not break existing code.~~ Attempts were made to ship under the name `global`, but it turns out that this does, in fact, break some existing websites. We are currently exploring identifier naming alternatives.

## Spec
You can view the spec in [markdown format](spec.md) or rendered as [HTML](http://tc39.github.io/proposal-global/).

## Thanks
Originally inspired by https://twitter.com/littledan/status/627284720284372992 / http://littledan.github.io/global.html
