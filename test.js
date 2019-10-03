import fs from 'fs';
import path from 'path';
import isWebP from 'is-webp';
import pify from 'pify';
import test from 'ava';
import imageminWebp from '.';

const fsP = pify(fs);

test('convert an image into a WebP', async t => {
	const buf = await fsP.readFile(path.join(__dirname, 'fixtures/test.png'));
	const data = await imageminWebp()(buf);

	t.true(data.length < buf.length);
	t.true(isWebP(data));
});

test('skip optimizing unsupported files', async t => {
	const buf = await fsP.readFile(path.join(__dirname, 'fixtures/test-unsupported.bmp'));
	const data = await imageminWebp()(buf);

	t.deepEqual(data, buf);
});

test('throw error when an image is corrupt', async t => {
	const buf = await fsP.readFile(path.join(__dirname, 'fixtures/test-corrupt.webp'));
	await t.throws(imageminWebp()(buf), /BITSTREAM_ERROR/);
});
