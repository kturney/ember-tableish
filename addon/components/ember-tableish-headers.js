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

  columnIndicies: computed('cols.length', {
    get() {
      const colCount = this.cols.length;

      const indicies = new Array(colCount);
      for (let i = 0; i < colCount; ++i) {
        indicies[i] = i + 1;
      }

      return indicies;
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
