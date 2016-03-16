# Generator

[![Build Status](https://travis-ci.org/mkdoc/mkgen.svg?v=3)](https://travis-ci.org/mkdoc/mkgen)
[![npm version](http://img.shields.io/npm/v/mkgen.svg?v=3)](https://npmjs.org/package/mkgen)
[![Coverage Status](https://coveralls.io/repos/mkdoc/mkgen/badge.svg?branch=master&service=github&v=3)](https://coveralls.io/github/mkdoc/mkgen?branch=master)

> Append or prepend a message to a stream

By default appends a generator message to a stream, use the `message` option to change the message.

## Install

```
npm i mkgen --save
```

For the command line interface install [mkdoc][] globally (`npm i -g mkdoc`).

## Usage

```javascript
var mkgen = require('mkgen');
mkgen(); // read from process.stdin, write to process.stdout
```

## API

### gen

```javascript
gen([opts][, cb])
```

Append or prepend a generator message string.

The message string is parsed as markdown and written to the end of the
stream unless `prepend` is given.

Returns an output stream.

* `opts` Object processing options.
* `cb` Function callback function.

#### Options

* `input` Readable=process.stdin input stream.
* `output` Writable=process.stdout output stream.
* `message` String generator message.
* `prepend` Boolean prepend message to the stream.

## License

MIT

[mkdoc]: https://github.com/mkdoc/mkdoc
[mkparse]: https://github.com/mkdoc/mkparse
[node]: http://nodejs.org
[npm]: http://www.npmjs.org
[commonmark]: http://commonmark.org
[jshint]: http://jshint.com
[jscs]: http://jscs.info
