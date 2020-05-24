const {promisify} = require('util');
const fs = require('fs');
const path = require('path');
const isWebP = require('is-webp');
const test = require('ava');
const imageminWebp = require('.');

const readFile = promisify(fs.readFile);

test('convert an image into a WebP', async t => {
	const buf = await readFile(path.join(__dirname, 'fixtures/test.png'));
	const data = await imageminWebp()(buf);

	t.true(data.length < buf.length);
	t.true(isWebP(data));
});

test('skip optimizing unsupported files', async t => {
	const buf = await readFile(path.join(__dirname, 'fixtures/test-unsupported.bmp'));
	const data = await imageminWebp()(buf);

	t.deepEqual(data, buf);
});

test('throw error when an image is corrupt', async t => {
	const buf = await readFile(path.join(__dirname, 'fixtures/test-corrupt.webp'));
	await t.throwsAsync(() => imageminWebp()(buf), {message: /BITSTREAM_ERROR/});
});
