import { A as emberArray } from '@ember/array';
import { computed } from '@ember/object';
import Component from '@ember/component';
import layout from '../templates/components/ember-tableish-headers';
import { getOwner } from '@ember/application';

export default Component.extend({
  layout,
  classNames: ['ember-tableish-headers'],

  nonce: computed({
    get() {
      const config = getOwner(this).resolveRegistration('config:environment');

      const configNonce = config['ember-tableish-csp-nonce'];
      if (configNonce) {
        return configNonce;
      }

      const metaNonce = document.querySelector(
        'meta[name="ember-tableish-csp-nonce"]'
      );

      if (metaNonce) {
        return metaNonce.content;
      }

      return null;
    },

    set(k, v) {
      return v;
    }
  }),

  gridColumns: computed('cols.@each.width', {
    get() {
      // see https://css-tricks.com/preventing-a-grid-blowout for why we need to use minmax
      return this.cols.map(c => `minmax(0, ${c.width})`).join(' ');
    }
  }),

  msGridColumns: computed('gridColumns', 'table.columnGap', {
    get() {
      const { columnGap } = this.table;

      if (columnGap) {
        return this.cols
          .map(c => `minmax(0, ${c.width})`)
          .join(` ${columnGap} `);
      }

      return this.gridColumns;
    }
  }),

  msCellPlacements: computed('cols.length', 'table.columnGap', {
    get() {
      const placements = [];
      const colCount = this.cols.length;

      let child = 1;
      let column = 1;
      const childStep = 1;
      const columnStep = this.table.columnGap ? 2 : 1;

      while (child <= colCount) {
        placements.push({ child, column });

        child += childStep;
        column += columnStep;
      }

      return placements;
    }
  }),

  init() {
    this._super(...arguments);

    this.cols = emberArray();
  },

  addHeader(header) {
    this.cols.pushObject(header);
  },

  removeHeader(header) {
    this.cols.removeObject(header);
  }
});
