import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Transform | object', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    assert.expect(1);
    let transform = this.owner.lookup('transform:object');

    assert.ok(transform, 'the transform shoud exist');
  });

  test('Values are serialized properly', function(assert) {
    assert.expect(11);
    const transform = this.owner.lookup('transform:object');
    const obj       = Object.freeze({});

    assert.deepEqual(transform.serialize(), obj, 'no arguments result in an empty object');
    assert.deepEqual(transform.serialize(null), obj, 'null is serialized to an empty object');
    assert.deepEqual(transform.serialize(undefined), obj, 'undefined is serialized to an empty object');
    assert.deepEqual(transform.serialize(''), obj, 'an empty string is serialized to an empty object');
    assert.deepEqual(transform.serialize(' '), obj, 'a string with whitespace is serialized to an empty object');
    assert.deepEqual(transform.serialize(true), obj, 'a truthy boolean is serialized to an empty object');
    assert.deepEqual(transform.serialize(false), obj, 'a falsy boolean is serialized to an empty object');
    assert.deepEqual(transform.serialize({}), obj, 'An empty object is serialized to an empty object');
    assert.deepEqual(transform.serialize([]), obj, 'an empty array is serialized to an empty object');
    assert.deepEqual(transform.serialize([ '1', { foo: 'bar' } ]), obj, 'A filled array is serialized to an empty object');
    assert.deepEqual(transform.serialize({ foo: 'bar' }), { foo: 'bar' }, 'An object with own properties is stays unchanged');
  });

  test('Values are deserialized properly', function(assert) {
    assert.expect(11);
    const transform = this.owner.lookup('transform:object');
    const obj       = Object.freeze({});

    assert.deepEqual(transform.deserialize(), obj, 'no arguments result in an empty object');
    assert.deepEqual(transform.deserialize(null), obj, 'null is serialized to an empty object');
    assert.deepEqual(transform.deserialize(undefined), obj, 'undefined is serialized to an empty object');
    assert.deepEqual(transform.deserialize(''), obj, 'an empty string is serialized to an empty object');
    assert.deepEqual(transform.deserialize(' '), obj, 'a string with whitespace is serialized to an empty object');
    assert.deepEqual(transform.deserialize(true), obj, 'a truthy boolean is serialized to an empty object');
    assert.deepEqual(transform.deserialize(false), obj, 'a falsy boolean is serialized to an empty object');
    assert.deepEqual(transform.deserialize({}), obj, 'An empty object is serialized to an empty object');
    assert.deepEqual(transform.deserialize([]), obj, 'an empty array is serialized to an empty object');
    assert.deepEqual(transform.deserialize([ '1', { foo: 'bar' } ]), obj, 'A filled array is serialized to an empty object');
    assert.deepEqual(transform.deserialize({ foo: 'bar' }), { foo: 'bar' }, 'An object with own properties is stays unchanged');
  })

});
