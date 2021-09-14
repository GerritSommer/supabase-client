import { module, test } from 'qunit';
import { setupTest }    from 'ember-qunit';
import Pretender        from 'pretender';

module('Unit | Authenticator | v1::password', function(hooks) {
  setupTest(hooks);
  let server;

  hooks.beforeEach(function() {
    server = new Pretender();
  });

  hooks.afterEach(function() {
    server && server.shutdown();
  });

  test('The authenticator sends a password and email', function(assert) {
    assert.expect(6);

    let authenticator = this.owner.lookup('authenticator:v1/password');

    server.post('https://test.supabase.co/auth/v1/token', (request)=> {
      const body           = JSON.parse(request.requestBody);
      const queryParams    = request.queryParams;
      const requestHeaders = request.requestHeaders;

      assert.equal(queryParams.grant_type, 'password', 'the grant_type must be send as a queryParam');
      assert.equal(body.email, 'some@email.com', 'the email must be send in the body');
      assert.equal(body.password, 'some-password', 'the password must be send in the body');
      assert.equal(requestHeaders.apikey, 'test-api-key', 'the apiKey must be included to the headers');
      assert.equal(requestHeaders['Content-Type'], 'application/json', 'the Content-Type must be application/json');
      assert.equal(requestHeaders.apikey, 'test-api-key', 'the apiKey must be included to the headers');

      return [
        200,
        { 'Content-Type': 'application/json' },
        '{ "result": "fine"}'
      ]
    });

    authenticator.authenticate('some@email.com', 'some-password')
  });
});
