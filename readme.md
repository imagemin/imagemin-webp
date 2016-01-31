# imagemin-webp [![Build Status](https://travis-ci.org/imagemin/imagemin-webp.svg?branch=master)](https://travis-ci.org/imagemin/imagemin-webp) [![Build status](https://ci.appveyor.com/api/projects/status/erd3nf73djfm4gjp?svg=true)](https://ci.appveyor.com/project/ShinnosukeWatanabe/imagemin-webp)

> webp imagemin plugin


## Install

```
$ npm install --save imagemin-webp
```


## Usage

```js
var Imagemin = require('imagemin');
var imageminWebp = require('imagemin-webp');

new Imagemin()
	.src('images/*.{jpg,png}')
	.dest('build/images')
	.use(imageminWebp({quality: 50}))
	.run();
```

You can also use this plugin with [gulp](http://gulpjs.com):

```js
var gulp = require('gulp');
var imageminWebp = require('imagemin-webp');

gulp.task('default', function () {
	return gulp.src('images/*.{jpg,png}')
		.pipe(imageminWebp({quality: 50})())
		.pipe(gulp.dest('build/images'));
});
```


## API

### imageminWebp(options)

#### options.preset

Type: `string`  
Default: `default`

Preset setting, one of `default`, `photo`, `picture`, `drawing`, `icon` and `text`.

#### options.quality

Type: `number`  
Default: `75`

Set quality factor between `0` and `100`.

#### options.alphaQuality

Type: `number`  
Default: `100`

Set transparency-compression quality between `0` and `100`.

#### options.method

Type: `number`  
Default: `4`

Specify the compression method to use, between `0` (fastest) and `6` (slowest). This parameter controls the trade off between encoding speed and the compressed file size and quality.

#### options.size

Type: `number`  

Set target size in bytes.

#### options.sns

Type: `number`  
Default: `80`

Set the amplitude of spatial noise shaping between `0` and `100`.

#### options.filter

Type: `number`  

Set deblocking filter strength between `0` (off) and `100`.

#### options.autoFilter

Type: `boolean`  
Default: `false`  

Adjust filter strength automatically.

#### options.sharpness

Type: `number`  
Default: `0`

Set filter sharpness between `0` (sharpest) and `7` (least sharp).

#### options.lossless

Type: `boolean`  
Default: `false`

Encode images losslessly.


## License

MIT © [imagemin](https://github.com/imagemin)
