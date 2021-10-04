import { module, skip }       from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render }             from '@ember/test-helpers';
import { hbs }                from 'ember-cli-htmlbars';

module('Integration | Component | layout/container', function(hooks) {
  setupRenderingTest(hooks);

  skip('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<Layout::Container />`);

    assert.equal(this.element.textContent.trim(), '');

    // Template block usage:
    await render(hbs`
      <Layout::Container>
        template block text
      </Layout::Container>
    `);

    assert.equal(this.element.textContent.trim(), 'template block text');
  });
});
