'use strict';

var spawn = require('child_process').spawn;
var isCwebpReadable = require('is-cwebp-readable');
var replaceExt = require('replace-ext');
var through = require('through2');
var cwebp = require('cwebp-bin');

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

		var args = ['-quiet', '-mt'];
		var err = '';
		var ret = [];
		var len = 0;

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

		var cp = spawn(cwebp, args.concat(['-o', '-', '--', '-']));

		cp.stderr.setEncoding('utf8');
		cp.stderr.on('data', function (data) {
			err += data;
		});

		cp.stdout.on('data', function (data) {
			ret.push(data);
			len += data.length;
		});

		cp.on('error', function (err) {
			err.fileName = file.path;
			cb(err);
			return;
		});

		cp.on('close', function (code) {
			if (code) {
				err = new Error(err);
				err.fileName = file.path;
				cb(err);
				return;
			}

			file.contents = Buffer.concat(ret, len);
			file.path = replaceExt(file.path, '.webp');

			cb(null, file);
		});

		cp.stdin.on('error', function (stdinErr) {
			if (!err) {
				err = stdinErr;
			}
		});

		cp.stdin.end(file.contents);
	});
};
