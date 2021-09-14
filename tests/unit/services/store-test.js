import { module, skip } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | store', function(hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  skip('it exists', function(assert) {
    let service = this.owner.lookup('service:store');
    assert.ok(service);
  });
});
