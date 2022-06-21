<p>
  <a href="https://www.npmjs.com/package/gulp-rev-html"><img 
  src="https://img.shields.io/npm/v/gulp-rev-html.svg?sanitize=true" alt="Version"
  ></a>
  <a href="https://github.com/guozhenyi/gulp-rev-html"><img 
  src="https://img.shields.io/npm/l/gulp-rev-html.svg?sanitize=true" alt="License"
  ></a>
</p>

# gulp-rev-html

Static asset revisioning by appending timestamp to filenames: <br>
style.css => style.css?v=1646036823<br>
index.js => index.js?v=1646036823

## Install

npm:

```
$ npm install --save-dev gulp-rev-html
```

yarn:

```
$ yarn add --dev gulp-rev-html
```

## Usage

```js
const gulp = require('gulp');
const revHtml = require('gulp-rev-html');

function addTime() {
  return gulp.src('src/**/*.html')
    .pipe(revHtml())
    .pipe(gulp.dest('dist'));
}

exports.default = gulp.series(addTime);
```

## License

MIT
