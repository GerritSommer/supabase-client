import { module, test }       from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click }      from '@ember/test-helpers';
import { hbs }                from 'ember-cli-htmlbars';

module('Integration | Component | controls/dropdown', function(hooks) {
  setupRenderingTest(hooks);

  test('The dropdown yields the trigger and toggles on click', async function(assert) {
    assert.expect(3);

    await render(hbs`
      <Controls::Dropdown>

        <:trigger as |toggleDropdown|>
          <button
            type="button"
            id="trigger-button"
            {{on "click" toggleDropdown}}
          >
            Trigger
          </button>
        </:trigger>

        <:menu>
        </:menu>

      </Controls::Dropdown>
    `);

    assert.dom('#trigger-button').exists();

    await click('#trigger-button');

    assert.dom('[data-test-controls-dropdown-menu]').exists();

    await click('#trigger-button');

    assert.dom('[data-test-controls-dropdown-menu]').doesNotExist();
  });


  test('The dropdown yields the menu-items and has a working dropdown link and button', async function(assert) {
    assert.expect(5);

    this.externalAction = function() {
      assert.ok(true, 'The external action has been called')
    };

    await render(hbs`
      <Controls::Dropdown>

        <:trigger as |toggleDropdown|>
          <button
            type="button"
            id="trigger-button"
            {{on "click" toggleDropdown}}
          >
            Trigger
          </button>
        </:trigger>

        <:menu as |closeDropdown|>
          <Controls::Dropdown::Link
            @route="application"
            id="dropdown-link"
            {{on "click" closeDropdown}}
          >
            Dropdown link
          </Controls::Dropdown::Link>

          <Controls::Dropdown::Button
            id="dropdown-button"
            {{on "click" this.externalAction}}
            {{on "click" closeDropdown}}
          >
            Dropdown button
          </Controls::Dropdown::Button>
        </:menu>

      </Controls::Dropdown>
    `);

    await click('#trigger-button');

    assert.dom('#dropdown-link').exists();
    assert.dom('#dropdown-link').hasProperty('href', `${window.location.origin}/`)
    assert.dom('#dropdown-button').exists();

    await click('#dropdown-button');

    assert.dom('[data-test-controls-dropdown-menu]').doesNotExist();
  });


  test('The dropdown closes on a click outside the dropdown element', async function(assert) {
    assert.expect(3);

    await render(hbs`
      <Controls::Dropdown>

        <:trigger as |toggleDropdown|>
          <button
            type="button"
            id="trigger-button"
            {{on "click" toggleDropdown}}
          >
            Trigger
          </button>
        </:trigger>

        <:menu as |closeDropdown|>

          <Controls::Dropdown::Button
            id="dropdown-button"
          >
            Dropdown button
          </Controls::Dropdown::Button>

        </:menu>

      </Controls::Dropdown>

      <div id="outside-element">
        Unrelated element
      </div>
    `);

    await click('#trigger-button');

    assert.dom('#dropdown-button').exists();

    await click('#dropdown-button');

    assert
      .dom('[data-test-controls-dropdown-menu]')
      .exists('The dropdown menu should not close, when a click event is triggered from inside the drodpown element');

    await click('#outside-element');

    assert.dom('[data-test-controls-dropdown-menu]').doesNotExist();
  });

});
