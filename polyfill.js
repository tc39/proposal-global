'use strict';
(function (global) {
	if (!global.globalThis) {
		if (Object.defineProperty) {
			Object.defineProperty(global, 'globalThis', {
				configurable: true,
				enumerable: false,
				value: global,
				writable: true
			});
		} else {
			global.globalThis = global;
		}
	}
})(typeof this === 'object' ? this : Function('return this')())
