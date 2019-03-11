import { A as emberArray } from '@ember/array';
import { cancel, scheduleOnce } from '@ember/runloop';
import { computed, observer } from '@ember/object';
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

  init() {
    this._super(...arguments);

    this.cols = emberArray();
    this.scheduledStyleUpdate = null;
  },

  willDestroy() {
    this._super(...arguments);

    cancel(this.scheduledStyleUpdate);
  },

  addHeader(header) {
    this.cols.pushObject(header);
  },

  removeHeader(header) {
    this.cols.removeObject(header);
  },

  // eslint-disable-next-line ember/no-observers
  _headerObserver: observer('cols.@each.width', function() {
    this.scheduledStyleUpdate = scheduleOnce(
      'actions',
      this,
      this.updateStyles
    );
  }),

  updateStyles() {
    if (this.isDestroyed || this.isDestroying) {
      return;
    }

    const styles = this.element.querySelector('style').sheet;
    const { cols } = this;
    const { cssRules } = styles;

    const tableId = this.table.elementId;
    // see https://css-tricks.com/preventing-a-grid-blowout for why we need to use minmax
    const columnsTemplate = cols.map(c => `minmax(0, ${c.width})`).join(' ');

    const rowSelector = `#${tableId} .ember-tableish-row`;
    const rowStyle = `-ms-grid-columns: ${columnsTemplate}; grid-template-columns: ${columnsTemplate};`;

    if (cssRules.length === 0) {
      styles.insertRule(
        `#${tableId} .ember-tableish-headers, ${rowSelector} { ${rowStyle} }`,
        0
      );
    } else {
      cssRules[0].style.cssText = rowStyle;
    }

    // if Internet Explorer, must explicitly place each col
    let i = 1;
    for (let il = cols.length; i <= il; ++i) {
      const colStyle = `-ms-grid-row: 1; -ms-grid-column: ${i};`;

      if (cssRules.length === i) {
        styles.insertRule(
          `#${tableId} .ember-tableish-header:nth-of-type(${i}), ${rowSelector} >:nth-child(${i}) {${colStyle}}`,
          i
        );
      } else {
        cssRules[i].style.cssText = colStyle;
      }
    }

    // remove rules for any removed columns
    while (styles.cssRules.length > i) {
      styles.deleteRule(styles.cssRules.length - 1);
    }
  }
});
