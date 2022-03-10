import Component from '@glimmer/component';
import { getOwner } from '@ember/application';
import { action } from '@ember/object';
import { tracked } from 'tracked-built-ins';

export default class EmberTableishHeaders extends Component {
  cols = tracked(Set);

  get nonce() {
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
  }

  get gridColumns() {
    // see https://css-tricks.com/preventing-a-grid-blowout for why we need to use minmax
    const strs = [];

    for (const col of this.cols) {
      strs.push(`minmax(0, ${col.width})`);
    }

    return strs.join(' ');
  }

  get msGridColumns() {
    const { columnGap } = this.args.table;

    if (columnGap) {
      const strs = [];

      for (const col of this.cols) {
        strs.push(`minmax(0, ${col.width})`);
      }

      return strs.join(` ${columnGap} `);
    }

    return this.gridColumns;
  }

  get msCellPlacements() {
    const placements = [];
    const colCount = this.cols.size;

    let child = 1;
    let column = 1;
    const childStep = 1;
    const columnStep = this.args.table.columnGap ? 2 : 1;

    while (child <= colCount) {
      placements.push({ child, column });

      child += childStep;
      column += columnStep;
    }

    return placements;
  }

  @action
  addHeader(header) {
    this.cols.add(header);
  }

  @action
  removeHeader(header) {
    this.cols.delete(header);
  }
}
