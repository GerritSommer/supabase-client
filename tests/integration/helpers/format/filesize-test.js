import { module, test }       from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render }             from '@ember/test-helpers';
import { hbs }                from 'ember-cli-htmlbars';

module('Integration | Helper | format/filesize', function(hooks) {
  setupRenderingTest(hooks);

  test('It renders bytes', async function(assert) {
    assert.expect(1);
    this.set('inputValue', 500);

    await render(hbs`{{format/filesize this.inputValue}}`);
    console.log(this.element.textContent);
    assert.equal(this.element.textContent, '500 B');
  });

  test('It renders kilobytes', async function(assert) {
    assert.expect(1);
    this.set('inputValue', 1000);

    await render(hbs`{{format/filesize this.inputValue}}`);

    assert.equal(this.element.textContent.trim(), '1 kB');
  });

  test('It trims values', async function(assert) {
    assert.expect(1);
    this.set('inputValue', 1234);

    await render(hbs`{{format/filesize this.inputValue}}`);

    assert.equal(this.element.textContent.trim(), '1.23 kB');
  });


  test('It renders null as 0', async function(assert) {
    assert.expect(1);
    this.set('inputValue', null);

    await render(hbs`{{format/filesize this.inputValue}}`);

    assert.equal(this.element.textContent.trim(), '0');
  });

  test('It renders a string number as 0', async function(assert) {
    assert.expect(1);
    this.set('inputValue', '11');

    await render(hbs`{{format/filesize this.inputValue}}`);

    assert.equal(this.element.textContent.trim(), '0');
  });

  test('It renders a only positiv numbers', async function(assert) {
    assert.expect(1);
    this.set('inputValue', -10);

    await render(hbs`{{format/filesize this.inputValue}}`);

    assert.equal(this.element.textContent.trim(), '0 B');
  });

  test('It renders a "-0" as "0"', async function(assert) {
    assert.expect(1);
    this.set('inputValue', -0);

    await render(hbs`{{format/filesize this.inputValue}}`);

    assert.equal(this.element.textContent.trim(), '0 B');
  });

});
