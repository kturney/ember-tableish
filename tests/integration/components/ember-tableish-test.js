/* eslint-disable qunit/require-expect */
import { module, test } from 'qunit';
import percySnapshot from '@percy/ember';
import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import { hbs } from 'ember-cli-htmlbars';

const heros = [
  { title: 'Superman', name: 'Clark Kent' },
  { title: 'Batman', name: 'Bruce wayne' },
  { title: 'Spider Man', name: 'Peter Parker' },
  { title: 'Green Lantern', name: 'Hal jordan' },
  { title: 'Captain America', name: 'Steve Rogers' },
  { title: 'Wonder Woman', name: 'Diane Lane' },
  { title: 'Martian Manhunter', name: "J'onn J'onzz" },
  { title: 'Iron Man', name: 'Tony Stark' },
  { title: 'Hulk', name: 'Bruce Banner' },
  { title: 'Daredevil', name: 'Matt Murdock' },
];

module('Integration | Component | ember-tableish', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.heros = heros;
  });

  test('it renders columns the same width as headers', async function (assert) {
    await render(hbs`
      <EmberTableish as |table|>
        <table.headers as |headers|>
          <headers.header>Title</headers.header>
          <headers.header>Name</headers.header>
        </table.headers>

        <table.body>
          {{#each this.heros as |hero|}}
            <table.row>
              <div class='ember-tableish-cell'>{{hero.title}}</div>
              <div class='ember-tableish-cell'>{{hero.name}}</div>
            </table.row>
          {{/each}}
        </table.body>
      </EmberTableish>
    `);

    assert.dom('.ember-tableish-header').exists({ count: 2 });
    assert.dom('.ember-tableish-row').exists({ count: heros.length });

    const colWidths = Array.from(
      this.element.querySelectorAll('.ember-tableish-header')
    ).map((element) => element.getBoundingClientRect().width);

    for (let i = 0, il = heros.length; i < il; ++i) {
      const row = `.ember-tableish-row:nth-child(${i + 1})`;

      for (let j = 0, jl = colWidths.length; j < jl; ++j) {
        const cellwidth = this.element
          .querySelector(`${row} .ember-tableish-cell:nth-child(${j + 1})`)
          .getBoundingClientRect().width;

        assert.equal(cellwidth, colWidths[j], `row ${i}, col ${j} width`);
      }
    }

    await percySnapshot(assert);
  });

  test('it handles column width changes', async function (assert) {
    this.width = '100px';

    await render(hbs`
      <EmberTableish as |table|>
        <table.headers as |headers|>
          <headers.header @width={{this.width}}>Title</headers.header>
          <headers.header>Name</headers.header>
        </table.headers>

        <table.body>
          {{#each this.heros as |hero|}}
            <table.row>
              <div class='ember-tableish-cell'>{{hero.title}}</div>
              <div class='ember-tableish-cell'>{{hero.name}}</div>
            </table.row>
          {{/each}}
        </table.body>
      </EmberTableish>
    `);

    const origColwidth = this.element
      .querySelector('.ember-tableish-header')
      .getBoundingClientRect().width;

    for (let i = 0, il = heros.length; i < il; ++i) {
      const row = `.ember-tableish-row:nth-child(${i + 1})`;

      const cellwidth = this.element
        .querySelector(`${row} .ember-tableish-cell:nth-child(1)`)
        .getBoundingClientRect().width;

      assert.equal(
        cellwidth,
        origColwidth,
        `row ${i}, col ${0} original width`
      );
    }

    await percySnapshot('it handles column width changes: original');

    this.set('width', '50px');

    const updatedColwidth = this.element
      .querySelector('.ember-tableish-header')
      .getBoundingClientRect().width;

    assert.ok(
      // eslint-disable-next-line qunit/no-assert-logical-expression
      updatedColwidth >= origColwidth / 2 - 1 ||
        updatedColwidth <= origColwidth / 2 + 1,
      'updated width is about half of the original width'
    );

    for (let i = 0, il = heros.length; i < il; ++i) {
      const row = `.ember-tableish-row:nth-child(${i + 1})`;

      const cellwidth = this.element
        .querySelector(`${row} .ember-tableish-cell:nth-child(1)`)
        .getBoundingClientRect().width;

      assert.equal(
        cellwidth,
        updatedColwidth,
        `row ${i}, col ${0} updated width`
      );
    }

    await percySnapshot('it handles column width changes: updated');
  });

  test('it handles column removal', async function (assert) {
    this.showCol = true;

    await render(hbs`
      <EmberTableish as |table|>
        <table.headers as |headers|>
          <headers.header>Title</headers.header>
          <headers.header>Name</headers.header>

          {{#if this.showCol}}
            <headers.header>Also Name</headers.header>
          {{/if}}
        </table.headers>

        <table.body>
          {{#each this.heros as |hero|}}
            <table.row>
              <div class='ember-tableish-cell'>{{hero.title}}</div>
              <div class='ember-tableish-cell'>{{hero.name}}</div>

              {{#if this.showCol}}
                <div class='ember-tableish-cell'>{{hero.name}}</div>
              {{/if}}
            </table.row>
          {{/each}}
        </table.body>
      </EmberTableish>
    `);

    assert.dom('.ember-tableish-header').exists({ count: 3 });
    assert.dom('.ember-tableish-row').exists({ count: heros.length });

    const origColwidths = Array.from(
      this.element.querySelectorAll('.ember-tableish-header')
    ).map((element) => element.getBoundingClientRect().width);

    for (let i = 0, il = heros.length; i < il; ++i) {
      const row = `.ember-tableish-row:nth-child(${i + 1})`;

      for (let j = 0, jl = origColwidths.length; j < jl; ++j) {
        const cellwidth = this.element
          .querySelector(`${row} .ember-tableish-cell:nth-child(${j + 1})`)
          .getBoundingClientRect().width;

        assert.equal(
          cellwidth,
          origColwidths[j],
          `row ${i}, col ${j} original width`
        );
      }
    }

    await percySnapshot('it handles column removal: original');

    this.set('showCol', false);

    assert.dom('.ember-tableish-header').exists({ count: 2 });

    const updatedColwidths = Array.from(
      this.element.querySelectorAll('.ember-tableish-header')
    ).map((element) => element.getBoundingClientRect().width);

    const updatedTotal = updatedColwidths.reduce((sum, width) => sum + width);
    const origTotal = origColwidths.reduce((sum, width) => sum + width);

    assert.ok(
      // eslint-disable-next-line qunit/no-assert-logical-expression
      updatedTotal >= origTotal - 1 || updatedTotal <= origTotal + 1,
      `updated width total (${updatedTotal}) is about the same as the original total (${origTotal})`
    );

    for (let i = 0, il = heros.length; i < il; ++i) {
      const row = `.ember-tableish-row:nth-child(${i + 1})`;

      for (let j = 0, jl = updatedColwidths.length; j < jl; ++j) {
        const cellwidth = this.element
          .querySelector(`${row} .ember-tableish-cell:nth-child(${j + 1})`)
          .getBoundingClientRect().width;

        assert.equal(
          cellwidth,
          updatedColwidths[j],
          `row ${i}, col ${j} updated width`
        );
      }
    }

    await percySnapshot('it handles column removal: updated');
  });

  test('it handles column addition', async function (assert) {
    this.showCol = false;

    await render(hbs`
      <EmberTableish as |table|>
        <table.headers as |headers|>
          <headers.header>Title</headers.header>
          <headers.header>Name</headers.header>

          {{#if this.showCol}}
            <headers.header>Also Name</headers.header>
          {{/if}}
        </table.headers>

        <table.body>
          {{#each this.heros as |hero|}}
            <table.row>
              <div class='ember-tableish-cell'>{{hero.title}}</div>
              <div class='ember-tableish-cell'>{{hero.name}}</div>

              {{#if this.showCol}}
                <div class='ember-tableish-cell'>{{hero.name}}</div>
              {{/if}}
            </table.row>
          {{/each}}
        </table.body>
      </EmberTableish>
    `);

    assert.dom('.ember-tableish-header').exists({ count: 2 });
    assert.dom('.ember-tableish-row').exists({ count: heros.length });

    const origColwidths = Array.from(
      this.element.querySelectorAll('.ember-tableish-header')
    ).map((element) => element.getBoundingClientRect().width);

    for (let i = 0, il = heros.length; i < il; ++i) {
      const row = `.ember-tableish-row:nth-child(${i + 1})`;

      for (let j = 0, jl = origColwidths.length; j < jl; ++j) {
        const cellwidth = this.element
          .querySelector(`${row} .ember-tableish-cell:nth-child(${j + 1})`)
          .getBoundingClientRect().width;

        assert.equal(
          cellwidth,
          origColwidths[j],
          `row ${i}, col ${j} original width`
        );
      }
    }

    await percySnapshot('it handles column addition: original');

    this.set('showCol', true);

    assert.dom('.ember-tableish-header').exists({ count: 3 });

    const updatedColwidths = Array.from(
      this.element.querySelectorAll('.ember-tableish-header')
    ).map((element) => element.getBoundingClientRect().width);

    const updatedTotal = updatedColwidths.reduce((sum, width) => sum + width);
    const origTotal = origColwidths.reduce((sum, width) => sum + width);

    assert.ok(
      // eslint-disable-next-line qunit/no-assert-logical-expression
      updatedTotal >= origTotal - 1 || updatedTotal <= origTotal + 1,
      `updated width total (${updatedTotal}) is about the same as the original total (${origTotal})`
    );

    for (let i = 0, il = heros.length; i < il; ++i) {
      const row = `.ember-tableish-row:nth-child(${i + 1})`;

      for (let j = 0, jl = updatedColwidths.length; j < jl; ++j) {
        const cellwidth = this.element
          .querySelector(`${row} .ember-tableish-cell:nth-child(${j + 1})`)
          .getBoundingClientRect().width;

        assert.equal(
          cellwidth,
          updatedColwidths[j],
          `row ${i}, col ${j} updated width`
        );
      }
    }

    await percySnapshot('it handles column addition: updated');
  });

  test('columns cannot blowout their width', async function (assert) {
    this.longText = '';
    for (let i = 0; i < 100; ++i) {
      this.longText += i;
    }

    await render(hbs`
      <EmberTableish as |table|>
        <table.headers as |headers|>
          <headers.header>Title</headers.header>
          <headers.header>Name</headers.header>
        </table.headers>

        <table.body>
          {{#each this.heros as |hero|}}
            <table.row>
              <pre class='ember-tableish-cell'>{{this.longText}}</pre>
              <div class='ember-tableish-cell'>{{hero.name}}</div>
            </table.row>
          {{/each}}
        </table.body>
      </EmberTableish>
    `);

    assert.dom('.ember-tableish-header').exists({ count: 2 });
    assert.dom('.ember-tableish-row').exists({ count: heros.length });

    const colWidths = Array.from(
      this.element.querySelectorAll('.ember-tableish-header')
    ).map((element) => element.getBoundingClientRect().width);

    for (let i = 0, il = heros.length; i < il; ++i) {
      const row = `.ember-tableish-row:nth-child(${i + 1})`;

      for (let j = 0, jl = colWidths.length; j < jl; ++j) {
        const cellwidth = this.element
          .querySelector(`${row} .ember-tableish-cell:nth-child(${j + 1})`)
          .getBoundingClientRect().width;

        assert.equal(cellwidth, colWidths[j], `row ${i}, col ${j} width`);
      }
    }

    await percySnapshot(assert);
  });

  test('can set and update columnGap for the table', async function (assert) {
    this.columnGap = '10px';

    await render(hbs`
      <EmberTableish @columnGap={{this.columnGap}} as |table|>
        <table.headers as |headers|>
          <headers.header>Title</headers.header>
          <headers.header>Name</headers.header>
        </table.headers>

        <table.body>
          {{#each this.heros as |hero|}}
            <table.row>
              <div class='ember-tableish-cell'>{{hero.title}}</div>
              <div class='ember-tableish-cell'>{{hero.name}}</div>
            </table.row>
          {{/each}}
        </table.body>
      </EmberTableish>
    `);

    assert.dom('.ember-tableish-header').exists({ count: 2 });
    assert.dom('.ember-tableish-row').exists({ count: heros.length });

    const [firstHeader, secondHeader] = this.element.querySelectorAll(
      '.ember-tableish-header'
    );

    const origGapSize =
      secondHeader.getBoundingClientRect().left -
      firstHeader.getBoundingClientRect().right;

    assert.ok(origGapSize > 0, 'headers have a gap');

    for (let i = 0, il = heros.length; i < il; ++i) {
      const [firstCol, secondCol] = this.element.querySelectorAll(
        `.ember-tableish-row:nth-child(${i + 1}) .ember-tableish-cell`
      );

      assert.equal(
        firstCol.getBoundingClientRect().width,
        firstHeader.getBoundingClientRect().width,
        `row ${i}, col 0 width`
      );

      assert.equal(
        secondCol.getBoundingClientRect().width,
        secondHeader.getBoundingClientRect().width,
        `row ${i}, col 1 width`
      );

      assert.equal(
        secondCol.getBoundingClientRect().left -
          firstCol.getBoundingClientRect().right,
        origGapSize,
        `row ${i} gap`
      );
    }

    await percySnapshot('can set and update columnGap for the table: original');

    this.set('columnGap', '20px');

    const updatedGapSize =
      secondHeader.getBoundingClientRect().left -
      firstHeader.getBoundingClientRect().right;

    assert.ok(
      // eslint-disable-next-line qunit/no-assert-logical-expression
      updatedGapSize >= origGapSize * 2 - 1 ||
        updatedGapSize <= origGapSize * 2 + 1,
      'updated gap size is about double the original gap size'
    );

    for (let i = 0, il = heros.length; i < il; ++i) {
      const [firstCol, secondCol] = this.element.querySelectorAll(
        `.ember-tableish-row:nth-child(${i + 1}) .ember-tableish-cell`
      );

      assert.equal(
        firstCol.getBoundingClientRect().width,
        firstHeader.getBoundingClientRect().width,
        `row ${i}, col 0 width`
      );

      assert.equal(
        secondCol.getBoundingClientRect().width,
        secondHeader.getBoundingClientRect().width,
        `row ${i}, col 1 width`
      );

      assert.equal(
        secondCol.getBoundingClientRect().left -
          firstCol.getBoundingClientRect().right,
        updatedGapSize,
        `row ${i} gap`
      );
    }

    await percySnapshot('can set and update columnGap for the table: updated');
  });
});
