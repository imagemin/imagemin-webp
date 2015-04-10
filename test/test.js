'use strict';

var path = require('path');
var bufferEqual = require('buffer-equal');
var isWebP = require('is-webp');
var read = require('vinyl-file').read;
var test = require('ava');
var imageminWebp = require('../');

test('convert an image into a WebP', function (t) {
	t.plan(3);

	read(path.join(__dirname, 'fixtures/test.png'), function (err, file) {
		t.assert(!err, err);

		var stream = imageminWebp()();
		var size = file.contents.length;

		stream.on('data', function (data) {
			t.assert(data.contents.length < size, data.contents.length);
			t.assert(isWebP(data.contents));
			t.assert(path.extname(data.path) === '.webp', path.extname(data.path));
		});

		stream.end(file);
	});
});

test('skip optimizing unsupported files', function (t) {
	t.plan(2);

	read(path.join(__dirname, 'fixtures/test-unsupported.bmp'), function (err, file) {
		t.assert(!err, err);

		var stream = imageminWebp()();
		var contents = file.contents;

		stream.on('data', function (data) {
			t.assert(bufferEqual(data.contents, contents));
		});

		stream.end(file);
	});
});

test('throw error when an image is corrupt', function (t) {
	t.plan(3);
	var name = path.join(__dirname, 'fixtures/test-corrupt.webp');

	read(name, function (err, file) {
		t.assert(!err, err);

		var stream = imageminWebp()();

		stream.on('error', function (err) {
			t.assert(err);
			t.assert(err.fileName === name, err.fileName);
			t.assert(/BITSTREAM_ERROR/.test(err.message), err.message);
		});

		stream.end(file);
	});
});
