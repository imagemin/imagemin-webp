'use strict';

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
