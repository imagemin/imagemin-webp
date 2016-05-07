'use strict';
var fs = require('fs');
var path = require('path');
var bufferEqual = require('buffer-equal');
var isWebP = require('is-webp');
var test = require('ava');
var imageminWebp = require('../');

test('convert an image into a WebP', function (t) {
	t.plan(2);

	var buf = fs.readFileSync(path.join(__dirname, 'fixtures/test.png'));

	imageminWebp()(buf).then(function (data) {
		t.assert(data.length < buf.length, data.length);
		t.assert(isWebP(data));
	});
});

test('skip optimizing unsupported files', function (t) {
	t.plan(1);

	var buf = fs.readFileSync(path.join(__dirname, 'fixtures/test-unsupported.bmp'));

	imageminWebp()(buf).then(function (data) {
		t.assert(bufferEqual(data, buf));
	});
});

test('throw error when an image is corrupt', function (t) {
	t.plan(1);

	var buf = fs.readFileSync(path.join(__dirname, 'fixtures/test-corrupt.webp'));

	imageminWebp()(buf).catch(function (err) {
		t.assert(/BITSTREAM_ERROR/.test(err.message), err.message);
	});
});
