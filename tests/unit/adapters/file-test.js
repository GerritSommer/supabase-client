import { module, test } from 'qunit';
import { setupTest }    from 'ember-qunit';
import Pretender        from 'pretender';

module('Unit | Adapter | file', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('The url for query requests is generated', function(assert) {
    assert.expect(1);
    const adapter = this.owner.lookup('adapter:file');

    assert.equal(adapter.urlForQuery({ path: 'public' }), 'https://test.supabase.co/storage/v1/object/list/public', 'the url doesn"t match')
  });

  test('a query has all needed parameters', async function(assert) {
    assert.expect(2);
    const server = new Pretender();
    const store  = this.owner.lookup('service:store');
    const body   = Object.freeze({
      "limit": 100,
      "offset": 0,
      "sortBy": {
          "column": "name",
          "order": "asc"
      },
      "prefix": ""
    });

    server.post('https://test.supabase.co/storage/v1/object/list/public', (request) => {
      const requestBody = JSON.parse(request.requestBody);

      assert.deepEqual(requestBody, body, 'all parameters present in the request body');
      assert.equal(request.url, 'https://test.supabase.co/storage/v1/object/list/public', 'the correct host is used');

      return [200, {"Content-Type": "application/json"}, JSON.stringify([])]

    });

    await store.query('file', { path: 'public' });
  });

});
