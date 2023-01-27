import fs from 'node:fs/promises';
import isWebP from 'is-webp';
import test from 'ava';
import imageminWebp from './index.js';

test('convert an image into a WebP', async t => {
	const buffer = await fs.readFile(new URL('fixtures/test.png', import.meta.url));
	const data = await imageminWebp()(buffer);

	t.true(data.length < buffer.length);
	t.true(isWebP(data));
});

test('skip optimizing unsupported files', async t => {
	const buffer = await fs.readFile(new URL('fixtures/test-unsupported.bmp', import.meta.url));
	const data = await imageminWebp()(buffer);

	t.deepEqual(data, buffer);
});

test('throw error when an image is corrupt', async t => {
	const buffer = await fs.readFile(new URL('fixtures/test-corrupt.webp', import.meta.url));
	await t.throwsAsync(() => imageminWebp()(buffer), {message: /BITSTREAM_ERROR/});
});
