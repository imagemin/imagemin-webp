# imagemin-webp [![Build Status](http://img.shields.io/travis/imagemin/imagemin-webp.svg?style=flat)](https://travis-ci.org/imagemin/imagemin-webp) [![Build status](https://ci.appveyor.com/api/projects/status/erd3nf73djfm4gjp)](https://ci.appveyor.com/project/ShinnosukeWatanabe/imagemin-webp)

> webp imagemin plugin


## Install

```sh
$ npm install --save imagemin-webp
```


## Usage

```js
var Imagemin = require('imagemin');
var webp = require('imagemin-webp');

var imagemin = new Imagemin()
	.src('images/*.{jpg,png}')
	.dest('build/images')
	.use(webp());

imagemin.run(function (err, files) {
	if (err) {
		throw err;
	}

	console.log('Files optimized successfully!');
});
```

You can also use this plugin with [gulp](http://gulpjs.com):

```js
var gulp = require('gulp');
var webp = require('imagemin-webp');

gulp.task('default', function () {
	return gulp.src('images/*.{jpg,png}')
		.pipe(webp())
		.pipe(gulp.dest('build/images'));
});
```


## Options

### preset

Type: `String`  
Default: `default`

Preset setting, one of `default`, `photo`, `picture`, `drawing`, `icon` and `text`.

### quality

Type: `Number`  
Default: `75`

Set quality factor between `0` and `100`.

### alphaQuality

Type: `Number`  
Default: `100`

Set transparency-compression quality between `0` and `100`.

### method

Type: `Number`  
Default: `4`

Specify the compression method to use, between `0` (fastest) and `6` (slowest). This parameter controls the trade off between encoding speed and the compressed file size and quality.

### size

Type: `Number`  

Set target size in bytes.

### sns

Type: `Number`  
Default: `80`

Set the amplitude of spatial noise shaping between `0` and `100`.

### filter

Type: `Number`  

Set deblocking filter strength between `0` (off) and `100`.

### autoFilter

Type: `Boolean`  
Default: `false`  

Adjust filter strength automatically.

### sharpness

Type: `Number`  
Default: `0`

Set filter sharpness between `0` (sharpest) and `7` (least sharp).

### lossless

Type: `Boolean`  
Default: `false`

Encode images losslessly.


## License

MIT © [imagemin](https://github.com/imagemin)
