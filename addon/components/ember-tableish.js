import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { guidFor } from '@ember/object/internals';

export default class EmberTableish extends Component {
  @tracked tableId;

  get columnGap() {
    return this.args.columnGap || null;
  }

  constructor() {
    super(...arguments);
    this.tableId = guidFor(this);
  }
}
