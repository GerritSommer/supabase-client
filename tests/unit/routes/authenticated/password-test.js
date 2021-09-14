import { module, skip } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | authenticated/password', function(hooks) {
  setupTest(hooks);

  skip('it exists', function(assert) {
    let route = this.owner.lookup('route:authenticated/password');
    assert.ok(route);
  });
});
