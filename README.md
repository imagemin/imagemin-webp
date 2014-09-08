# imagemin-webp [![Build Status](http://img.shields.io/travis/imagemin/imagemin-webp.svg?style=flat)](https://travis-ci.org/imagemin/imagemin-webp) [![Build status](https://ci.appveyor.com/api/projects/status/erd3nf73djfm4gjp)](https://ci.appveyor.com/project/ShinnosukeWatanabe/imagemin-webp)

> webp imagemin plugin


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
