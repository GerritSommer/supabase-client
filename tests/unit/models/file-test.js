import { module,
  test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Model | file', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('All attritbutes and getter are fine', function(assert) {
    assert.expect(4);
    const store          = this.owner.lookup('service:store');
    const newfile        = store.createRecord('file');
    const anotherNewFile = store.createRecord('file');
    const file           = store.createRecord('file', {
      name:           'file-name.jpg',
      updatedAt:      Date.now(),
      createdAt:      Date.now(),
      lastAccessedAt: Date.now(),
      metadata: {
        size:         1234,
        mimetype:     'image/jpeg',
        cacheControl: 'max-age=3600'
      }
    });

    assert.equal(file.url, 'https://test.supabase.co/storage/v1/object/public/public/file-name.jpg', 'the url is generated');
    assert.equal(file.type, 'jpeg jpg', 'the type is generated from the mimetype');
    assert.deepEqual(newfile.metadata, {}, 'metadata has an object as default value');
    assert.notOk(Object.is(newfile.metadata, anotherNewFile.metadata), 'the default object is newly generated on "createRecord"');
  });
});
