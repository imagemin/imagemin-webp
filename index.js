'use strict';

var ExecBuffer = require('exec-buffer');
var imageType = require('image-type');
var replaceExt = require('replace-ext');
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

		if (opts.preset) {
			args.push('-preset', opts.preset);
		}

		if (opts.quality) {
			args.push('-q', opts.quality);
		}

		if (opts.alphaQuality) {
			args.push('-alpha_q', opts.alphaQuality);
		}

		if (opts.method) {
			args.push('-m', opts.method);
		}

		if (opts.size) {
			args.push('-size', opts.size);
		}

		if (opts.sns) {
			args.push('-sns', opts.sns);
		}

		if (opts.filter) {
			args.push('-f', opts.filter);
		}

		if (opts.autoFilter) {
			args.push('-af');
		}

		if (opts.sharpness) {
			args.push('-sharpness', opts.sharpness);
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

				file.path = replaceExt(file.path, '.webp');
				file.contents = buf;
				cb(null, file);
			});
	});
};
