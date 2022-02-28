'use strict';
const url = require('url');
const through2 = require('through2');
const PluginError = require('plugin-error');

function cssAddRev(content, time) {
  const cssRegex = /<link.*href\=\"([^\"]*)\"/gi;
  const matches = content.matchAll(cssRegex);

  for (const match of matches) {
    const urlObj = url.parse(match[1]);
    const qsObj = new URLSearchParams(urlObj.search);
    qsObj.set('v', time);

    let revUrl = '';
    let revStr = '';
    if (urlObj.search) {
      revUrl = match[1].replace(urlObj.search, '?' + qsObj.toString());
      revStr = match[0].replace(match[1], revUrl);
    } else {
      revUrl = match[1] + '?' + qsObj.toString();
      revStr = match[0].replace(match[1], revUrl);
    }

    content = content.replace(match[0], revStr);
  }

  return content;
}

function jsAddRev(content, time) {
  const cssRegex = /<script.*src\=\"([^\"]*)\"/gi;
  const matches = content.matchAll(cssRegex);

  for (const match of matches) {
    const urlObj = url.parse(match[1]);

    const qsObj = new URLSearchParams(urlObj.search);
    qsObj.set('v', time);

    let revUrl = '';
    let revStr = '';
    if (urlObj.search) {
      revUrl = match[1].replace(urlObj.search, '?' + qsObj.toString());
      revStr = match[0].replace(match[1], revUrl);
    } else {
      revUrl = match[1] + '?' + qsObj.toString();
      revStr = match[0].replace(match[1], revUrl);
    }

    content = content.replace(match[0], revStr);
  }

  return content;
}


function plugin() {
	return through2.obj(function(file, enc, cb) {
		if (file.isNull()) {
			cb(null, file);
			return;
		}

		if (file.isStream()) {
			cb(new PluginError('gulp-rev-html', 'Streaming not supported'));
			return;
		}

    const fileInfo = {
      content: file.contents.toString()
    };

    const time = parseInt(new Date().getTime() / 1000);

    fileInfo.content = cssAddRev(fileInfo.content, time);
    fileInfo.content = jsAddRev(fileInfo.content, time);

    file.contents = Buffer.from(fileInfo.content);

    this.push(file);

		cb();
	});
};

module.exports = plugin;
