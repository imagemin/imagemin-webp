'use strict';

var bufferEqual = require('buffer-equal');
var File = require('vinyl');
var fs = require('fs');
var isWebP = require('is-webp');
var path = require('path');
var test = require('ava');
var webp = require('../');

test('optimize a PNG', function (t) {
	t.plan(3);

	fs.readFile(path.join(__dirname, 'fixtures/test.png'), function (err, buf) {
		t.assert(!err);

		var stream = webp();
		var file = new File({
			contents: buf
		});

		stream.on('data', function (data) {
			t.assert(data.contents.length < buf.length);
			t.assert(isWebP(data.contents));
		});

		stream.end(file);
	});
});

test('skip optimizing unsupported files', function (t) {
	t.plan(2);

	fs.readFile(path.join(__dirname, 'fixtures/test-unsupported.bmp'), function (err, buf) {
		t.assert(!err);

		var stream = webp();
		var file = new File({
			contents: buf
		});

		stream.on('data', function (data) {
			t.assert(bufferEqual(data.contents, buf));
		});

		stream.end(file);
	});
});

test('throw error when an image is corrupt', function (t) {
	t.plan(3);

	fs.readFile(path.join(__dirname, 'fixtures/test-corrupt.jpg'), function (err, buf) {
		t.assert(!err);

		var stream = webp();
		var file = new File({
			contents: buf
		});

		stream.on('error', function (err) {
			t.assert(err);
			t.assert(/Corrupt JPEG data/.test(err.message));
		});

		stream.end(file);
	});
});
