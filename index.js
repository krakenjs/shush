var fs = require('fs'),
    url = require('url'),
    path = require('path'),
    caller = require('caller'),
    strip = require('strip-json-comments');

function tryParse(file, json) {
    var err;
    try {
        return JSON.parse(json);
    } catch (e) {
        err = new Error(e.message  + ' in ' + file);
        err.__proto__ = e.__proto__;
        throw err;
    }
}

function shush(file) {
    var root, abs, json, callingFilePath;

    callingFilePath = caller();

    /**
     * When this module is required from esm, then caller()
     * returns a path that's prefixed by `file:`.
     * We need to remove it to avoid breakage.
     */
    if (callingFilePath.startsWith("file:")) {
      callingFilePath = url.fileURLToPath(callingFilePath);
    }

    // on some occasions file is passed in with file prefix
    if (file.startsWith("file:")) {
      file = url.fileURLToPath(file);
    }


    root = path.resolve(callingFilePath);
    root = path.dirname(root);

    abs = path.resolve(root, file);
    abs = require.resolve(abs);

    json = fs.readFileSync(abs, 'utf8');
    json = strip(json, false);

    return tryParse(abs, json);
}

module.exports = shush;
