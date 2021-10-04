import { module, skip }       from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render }             from '@ember/test-helpers';
import { hbs }                from 'ember-cli-htmlbars';

module('Integration | Component | layout/footer/link', function(hooks) {
  setupRenderingTest(hooks);

  skip('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<Layout::Footer::Link />`);

    assert.equal(this.element.textContent.trim(), '');

    // Template block usage:
    await render(hbs`
      <Layout::Footer::Link>
        template block text
      </Layout::Footer::Link>
    `);

    assert.equal(this.element.textContent.trim(), 'template block text');
  });
});
