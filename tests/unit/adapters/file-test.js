import { module, test }      from 'qunit';
import { setupTest }         from 'ember-qunit';
import { rest, setupWorker } from 'msw';

module('Unit | Adapter | file', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('The url for query requests is generated', function(assert) {
    assert.expect(1);
    const adapter = this.owner.lookup('adapter:file');

    assert.equal(adapter.urlForQuery({ path: 'public' }), 'https://test.supabase.co/storage/v1/object/list/public', 'the url doesn"t match')
  });

  test('a query has all needed parameters', async function(assert) {
    assert.expect(3);
    const store = this.owner.lookup('service:store');
    const body = Object.freeze({
      "limit": 100,
      "offset": 0,
      "sortBy": {
          "column": "name",
          "order": "asc"
      },
      "prefix": ""
    });

    const worker = setupWorker(
      rest.post('https://test.supabase.co/storage/v1/object/list/public', (request, response, ctx)=> {
        assert.deepEqual(request.body, body, 'all parameters present in the request body');
        assert.equal(request.url.origin, 'https://test.supabase.co', 'the correct host is used');
        assert.equal(request.url.pathname, '/storage/v1/object/list/public', 'the path is builded');

        return response(
          ctx.status(200),
          ctx.json([])
        );
      })
    );
    await worker.start();

    await store.query('file', { path: 'public' });
  });

});
