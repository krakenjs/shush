'use strict';

var test = require('tape'),
    path = require('path'),
    shush = require('../');

test('shush', function (t) {

    function createSanity(file) {
        return function sanity(t) {
            var json = shush(file);
            t.ok(json);
            t.equal(typeof json, 'object');
            t.deepEqual(json.foo, 'bar');
            t.deepEqual(json.baz, 5);
            t.deepEqual(json.bam, true);
            t.end();
        };
    }

    t.test('throws on missing file', function (t) {
        t.throws(function () {
            shush('./fixtures/nonexistent');
        }, Error);
        t.end();
    });

    t.test('Parse error should contain filename', function (t) {
        var err = undefined;

        try {
            shush('./fixtures/invalid');
        } catch (e) {
            err = e;
        } finally {
            console.log(err);
            t.ok(err instanceof SyntaxError);
            t.ok(err.message.match(/fixtures\/invalid/));
            t.ok(err);
            t.end();
        }
    });

    t.test('parses json', createSanity('./fixtures/json'));

    t.test('removes line comments', createSanity('./fixtures/line'));

    t.test('removes block comments', createSanity('./fixtures/block'));

    t.test('removes both line and block comments', createSanity('./fixtures/combo'));

    t.test('resolves absolute file', createSanity(path.resolve('./test/fixtures/combo')))

});
