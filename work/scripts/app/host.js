/**
 * Created by knowthis on 16/8/22.
 */

'use strict';
define([], function (argument) {
	var urlObj = {
		release: {
			api: '//m.yaoex.com',
			passport: '//passport.yaoex.com',
		}
	};
	var environment = 'release';
	return urlObj[environment];
});
