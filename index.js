'use strict';
const execBuffer = require('exec-buffer');
const isCwebpReadable = require('is-cwebp-readable');
const cwebp = require('cwebp-bin');

module.exports = opts => buf => {
	opts = Object.assign({}, opts);

	if (!Buffer.isBuffer(buf)) {
		return Promise.reject(new TypeError('Expected a buffer'));
	}

	if (!isCwebpReadable(buf)) {
		return Promise.resolve(buf);
	}

	const args = [
		'-quiet',
		'-mt'
	];

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

	args.push('-o', execBuffer.output, execBuffer.input);

	return execBuffer({
		input: buf,
		bin: cwebp,
		args
	}).catch(err => {
		err.message = err.stderr || err.message;
		throw err;
	});
};
