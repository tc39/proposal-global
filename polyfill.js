(function (global) {
	if (typeof System !== 'object') {
		global.System = {};
	}
	if (!System.global) {
		System.global = global;
	}
})(typeof this === 'object' ? this : Function('return this')())
