import Component from '@ember/component';
import layout from '../templates/components/ember-tableish-headers';
import { cancel, once } from '@ember/runloop';

export default Component.extend({
  layout,
  classNames: ['ember-tableish-headers'],

  init() {
    this._super(...arguments);

    this.cols = [];
    this.scheduledStyleUpdate = null;
  },

  willDestroy() {
    this._super(...arguments);

    cancel(this.scheduledStyleUpdate);
  },

  addHeader(header) {
    this.cols.push(header);

    this.scheduledStyleUpdate = once(this, this.updateStyles);
  },

  removeHeader(header) {
    this.cols = this.cols.filter(c => c !== header);

    this.scheduledStyleUpdate = once(this, this.updateStyles);
  },

  updateStyles() {
    if (this.isDestroyed || this.isDestroying) {
      return;
    }

    const styles = this.element.querySelector('style').sheet;
    const { cols } = this;
    const { cssRules } = styles;

    const tableId = this.table.elementId;
    // see https://css-tricks.com/preventing-a-grid-blowout for why we need to use minmax
    const columnsTemplate = this.cols
      .map(c => `minmax(0, ${c.width})`)
      .join(' ');

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
