'use strict';

var ExecBuffer = require('exec-buffer');
var isCwebpReadable = require('is-cwebp-readable');
var replaceExt = require('replace-ext');
var through = require('through2');
var webp = require('cwebp-bin');

module.exports = function (opts) {
	opts = opts || {};

	return through.ctor({objectMode: true}, function (file, enc, cb) {
		if (file.isNull()) {
			cb(null, file);
			return;
		}

		if (file.isStream()) {
			cb(new Error('Streaming is not supported'));
			return;
		}

		if (!isCwebpReadable(file.contents)) {
			cb(null, file);
			return;
		}

		var execBuffer = new ExecBuffer();
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

		execBuffer
			.use(webp, args.concat([execBuffer.src(), '-o', execBuffer.dest()]))
			.run(file.contents, function (err, buf) {
				if (err) {
					err.fileName = file.path;
					cb(err);
					return;
				}

				file.path = replaceExt(file.path, '.webp');
				file.contents = buf;
				cb(null, file);
			});
	});
};
