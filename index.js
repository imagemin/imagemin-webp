'use strict';

var ExecBuffer = require('exec-buffer');
var imageType = require('image-type');
var path = require('path');
var through = require('through2');
var webp = require('cwebp-bin').path;

/**
 * webp imagemin plugin
 *
 * @param {Object} opts
 * @api public
 */

module.exports = function (opts) {
	opts = opts || {};

	return through.obj(function (file, enc, cb) {
		if (file.isNull()) {
			cb(null, file);
			return;
		}

		if (file.isStream()) {
			cb(new Error('Streaming is not supported'));
			return;
		}

		if (['jpg', 'png', 'tif'].indexOf(imageType(file.contents)) === -1) {
			cb(null, file);
			return;
		}

		var exec = new ExecBuffer();
		var args = ['-quiet', '-mt'];

		if (opts.quality) {
			args.push('-q', opts.quality);
		}

		if (opts.lossless) {
			args.push('-lossless');
		}

		exec
			.use(webp, args.concat([exec.src(), '-o', exec.dest()]))
			.run(file.contents, function (err, buf) {
				if (err) {
					cb(err);
					return;
				}

				if (file.path && typeof file.path === 'string') {
					var name = path.basename(file.path, path.extname(file.path)) + '.webp';
					file.path = path.join(path.dirname(file.path), name);
				}

				file.contents = buf;
				cb(null, file);
			});
	});
};
