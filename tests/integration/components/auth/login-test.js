import { module, test }        from 'qunit';
import { find, fillIn, click } from '@ember/test-helpers';
import { setupRenderingTest }  from 'ember-qunit';
import { render }              from '@ember/test-helpers';
import Service                 from '@ember/service';
import { hbs }                 from 'ember-cli-htmlbars';
import Pretender               from 'pretender';

module('Integration | Component | auth/login', function(hooks) {
  let server;

  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    server = new Pretender();
  });

  hooks.afterEach(function() {
    server && server.shutdown();
  });

  test('The session authenticate method gets called with the users data', async function(assert) {
    assert.expect(6);

    class SessionServiceStub extends Service {
      authenticate(authenticatorName, email, password) {
        console.log('a');
        assert.equal(authenticatorName, 'authenticator:v1/password', 'sessions authenticate metod is called with the authenticator name');
        assert.equal(email, 'email@domain.com', 'sessions authenticate metod is called with the email');
        assert.equal(password, 'my-password', 'sessions authenticate metod is called with the password');
      }
    }

    this.owner.register('service:session', SessionServiceStub);

    await render(hbs`
      <Auth::Login />
    `);

    const $emailInput    = find('input[type="email"]');
    const $passwordInput = find('input[type="password"]');
    const $submitButton  = find('button[type="submit"]');

    assert.ok($emailInput, 'There is an email input');
    assert.ok($passwordInput, 'There is a password input');
    assert.ok($submitButton, 'There is a submit button');

    await fillIn($emailInput, 'email@domain.com');
    await fillIn($passwordInput, 'my-password');
    await click($submitButton);
  });
});
