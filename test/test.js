'use strict';

var bufferEqual = require('buffer-equal');
var isWebP = require('is-webp');
var path = require('path');
var read = require('vinyl-file').read;
var test = require('ava');
var webp = require('../');

test('optimize a PNG', function (t) {
	t.plan(3);

	read(path.join(__dirname, 'fixtures/test.png'), function (err, file) {
		t.assert(!err);

		var stream = webp();
		var size = file.contents.length;

		stream.on('data', function (data) {
			t.assert(data.contents.length < size);
			t.assert(isWebP(data.contents));
		});

		stream.end(file);
	});
});

test('skip optimizing unsupported files', function (t) {
	t.plan(2);

	read(path.join(__dirname, 'fixtures/test-unsupported.bmp'), function (err, file) {
		t.assert(!err);

		var stream = webp();
		var contents = file.contents;

		stream.on('data', function (data) {
			t.assert(bufferEqual(data.contents, contents));
		});

		stream.end(file);
	});
});

test('throw error when an image is corrupt', function (t) {
	t.plan(3);

	read(path.join(__dirname, 'fixtures/test-corrupt.jpg'), function (err, file) {
		t.assert(!err);

		var stream = webp();

		stream.on('error', function (err) {
			t.assert(err);
			t.assert(/Corrupt JPEG data/.test(err.message));
		});

		stream.end(file);
	});
});
