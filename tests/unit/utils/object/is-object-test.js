import isObject from 'supabase-client/utils/object/is-object';
import { module, test } from 'qunit';

module('Unit | Utility | object/is-object', function() {

  // TODO: Replace this with your real tests.
  test('it works', function(assert) {
    assert.expect(11);

    assert.ok(isObject({}), 'an empty object should be truthy');
    assert.ok(isObject({ prop: 'value' }), 'a populated object should be truthy');
    assert.notOk(isObject(function() {}), 'a function should be falsy');
    assert.notOk(isObject(123), 'a number should be falsy');
    assert.notOk(isObject('stringy-string'), 'a string should be falsy');
    assert.notOk(isObject([]), 'an array should be falsy');
    assert.notOk(isObject(false), 'a falsy boolean should be falsy');
    assert.notOk(isObject(true), 'a truthy boolean should be falsy');
    assert.notOk(isObject(new Map), 'a Map should be falsy');
    assert.notOk(isObject(null), 'Null should be falsy');
    assert.notOk(isObject(undefined), 'undefined should be falsy');
  });
});
