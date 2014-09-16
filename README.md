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

### quality

Type: `Number`  
Default: `100`

Set quality factor between `0` and `100`.

### lossless

Type: `Boolean`  
Default: `false`

Encode images losslessly.


## License

MIT © [imagemin](https://github.com/imagemin)
