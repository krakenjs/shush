/** 
  * Pretty much the same as shush.js (simplified). Primary difference is that this is an esm module (see .mjs extension)
  * This allows us to verify this module works when being called via esm.
  */

import test from 'tape';
import path from 'node:path';
import shush from '../index.js';


test('shush loaded from esm', function(t) {

  function createSanity(file) {
    return function sanity(t) {
      var json = shush(file);
      t.ok(json);
      t.equal(typeof json, 'object');
      t.end();
    };
  }

  t.test('parses json', createSanity('./fixtures/json.json'));

  t.test('resolves file when filepath is prefixed with `file:/`', createSanity('file:' + (path.resolve('./test/fixtures/json.json'))));

  t.test('resolves absolute file', createSanity(path.resolve('./test/fixtures/combo.json')))

});
