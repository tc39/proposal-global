var global = Function('return this;')();

if (typeof System !== 'object') {
	global.System = {};
}
if (!System.global) {
	System.global = global;
}
