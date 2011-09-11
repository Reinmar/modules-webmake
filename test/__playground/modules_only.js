var modules = {
		"__playground": {
		"lib": {
			"indexed": {
				"index": function (exports, module, require) {
					'use strict';

					exports.name = 'indexed';
				}
			},
			"program": function (exports, module, require) {
				var indirectRequire = require;

				exports.x = require('./x');
				exports.y = require('./y.js');
				exports.indexed = require('./indexed');
				exports.outer = require('../outer');

				exports.included = {
					a: indirectRequire('./included/a'),
					b: indirectRequire('./included/b')
				};

				exports.external = {
					main:  require('test'),
					other: require('test/lib/other.js'),
					noMain: require('no-main/lib/some-module')
				};
			},
			"x": function (exports, module, require) {
				module.exports = {
					name: "x",
					getZ: function () {
						return require("./z");
					}
				};
			},
			"y": function (exports, module, require) {
				exports.name = "y";
				exports.z = require("./z");
				// If we won't add end of line with webmake, script will crash
			},
			"z": function (exports, module, require) {
				exports.name = "z";
				exports.y = require("./y");
			}
		},
		"outer": function (exports, module, require) {
			module.exports.name = 'outer';
		}
	},
	"no-main": {
		"lib": {
			"some-module": function (exports, module, require) {
				exports.name = 'no-main';
			}
		}
	},
	"test": {
		":mainpath:": "lib/chosen-one",
		"lib": {
			"chosen-one": function (exports, module, require) {
				'use strict';

				exports.name = "external-main";
				exports.module = require('./module');
			},
			"module": function (exports, module, require) {
				'use strict';

				exports.name = 'module';
			},
			"other": function (exports, module, require) {
				'use strict';

				exports.name = "external-other";
			}
		}
	}
};
