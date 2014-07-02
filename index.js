var gpath = require('gedi-paths');

/**
  # gedi-patch

  Given changes calculated between two JS objects (using
  [xdiff](https://github.com/dominictarr/xdiff)), update a gedi model.

  ## Example Usage

  <<< examples/update.js

**/
module.exports = function(model, basePath) {

  function remapRoot(part) {
    return part === 'root' ? '' : part;
  }

  return function(diff) {
    var keyPath;

    // if we haven't been passed an array as diff, then passthrough
    if (! Array.isArray(diff)) {
      return diff;
    }

    // create the keypath
    keyPath = gpath.create(diff[1].map(remapRoot));
    // console.log('>> ' + diff[0] + ': ' + keyPath);

    switch (diff[0]) {
      case 'set': {
        model.set(keyPath, diff[2]);

        return;
      }

      case 'del': {
        model.remove(keyPath);
        break;
      }

      default: {
        console.log('!! unhandled action: ' + diff[0]);
      }
    }

    return diff;
  };
};
