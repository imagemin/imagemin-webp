'use strict';

var bufferEqual = require('buffer-equal');
var File = require('vinyl');
var fs = require('fs');
var isWebP = require('is-webp');
var path = require('path');
var read = require('vinyl-file').read;
var test = require('ava');
var webp = require('../');

test('convert an image into a WebP', function (t) {
	t.plan(3);

	read(path.join(__dirname, 'fixtures/test.png'), function (err, file) {
		t.assert(!err, err);

		var stream = webp()();
		var size = file.contents.length;

		stream.on('data', function (data) {
			t.assert(data.contents.length < size);
			t.assert(isWebP(data.contents));
			t.assert(path.extname(data.path) === '.webp');
		});

		stream.end(file);
	});
});

test('keep file path undefined when a file doesn\'t have it', function (t) {
	t.plan(2);

	fs.readFile(path.join(__dirname, 'fixtures/test.png'), function (err, buf) {
		t.assert(!err, err);

		var stream = webp()();
		var file = new File({content: buf});

		stream.on('data', function (data) {
			t.assert(data.path === undefined);
		});

		stream.end(file);
	});
});

test('skip optimizing unsupported files', function (t) {
	t.plan(2);

	read(path.join(__dirname, 'fixtures/test-unsupported.bmp'), function (err, file) {
		t.assert(!err, err);

		var stream = webp()();
		var contents = file.contents;

		stream.on('data', function (data) {
			t.assert(bufferEqual(data.contents, contents));
		});

		stream.end(file);
	});
});

test('throw error when an image is corrupt', function (t) {
	t.plan(3);

	read(path.join(__dirname, 'fixtures/test-corrupt.webp'), function (err, file) {
		t.assert(!err, err);

		var stream = webp()();

		stream.on('error', function (err) {
			t.assert(err);
			t.assert(/BITSTREAM_ERROR/.test(err.message), err.message);
		});

		stream.end(file);
	});
});
