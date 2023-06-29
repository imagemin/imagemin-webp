import * as fs from 'fs';
import * as path from 'path';
import { expectType } from 'tsd';
import imageminWebP from '.';

const buffer = fs.readFileSync(path.join(__dirname, 'fixures', 'test.png'));

(async () => {
	expectType<Buffer>(await imageminWebP()(buffer));
	expectType<Buffer>(await imageminWebP({
		preset: 'default',
		quality: 75,
		alphaQuality: 100,
		method: 4,
		sns: 50,
		autoFilter: false,
		sharpness: 0,
		lossless: false,
		nearLossless: 100,
		metadata: 'none'
	})(buffer));
})();
