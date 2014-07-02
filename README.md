# gedi-patch

Given changes calculated between two JS objects (using
[xdiff](https://github.com/dominictarr/xdiff)), update a gedi model.


[![NPM](https://nodei.co/npm/gedi-patch.png)](https://nodei.co/npm/gedi-patch/)

[![unstable](https://img.shields.io/badge/stability-unstable-yellowgreen.svg)](https://github.com/dominictarr/stability#unstable) [![Build Status](https://img.shields.io/travis/DamonOehlman/gedi-patch.svg?branch=master)](https://travis-ci.org/DamonOehlman/gedi-patch) 

## Example Usage

```js
var x = require('xdiff');
var Gedi = require('gedi');

// create the new Gedi instance with some initial data
var model = new Gedi({
  fred: {
    name: 'Fred Smith',
    age: 52
  },

  ted: {
    name: 'Ted Longsocks',
    age: 23
  }
});

// create our patching function
var patch = require('gedi-patch')(model);

// use xdiff to generate a set of changes and patch each change
x.diff(model.get(), {
  fred: {
    name: 'Fred Smith',
    age: 53
  },

  ted: {
    name: 'Edward Longsocks',
    age: 23
  }
}).forEach(patch);

console.log(model.get('[/ted/name]'));
// --> Edward Longsocks

```

## License(s)

### MIT

Copyright (c) 2014 Damon Oehlman <damon.oehlman@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
