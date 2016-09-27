'use strict';
(function (global) {
	if (!global.global) {
		if (Object.defineProperty) {
			Object.defineProperty(global, 'global', {
				configurable: true,
				enumerable: false,
				value: global,
				writable: false
			});
		} else {
			global.global = global;
		}
	}
})(typeof this === 'object' ? this : Function('return this')())
