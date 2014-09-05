# imagemin-webp [![Build Status](https://travis-ci.org/imagemin/imagemin-webp.svg?branch=master)](https://travis-ci.org/imagemin/imagemin-webp)

> webp image-min plugin


## Install

```sh
$ npm install --save imagemin-webp
```


## Usage

```js
var Imagemin = require('image-min');
var webp = require('imagemin-webp');

var imagemin = new Imagemin()
	.src('foo.png')
	.dest('foo-optimized.webp')
	.use(webp());

imagemin.optimize();
```


## License

MIT © [imagemin](https://github.com/imagemin)
