import Component from '@glimmer/component';

export default class EmberTableishHeader extends Component {
  get width() {
    return this.args.width || '1fr';
  }

  constructor() {
    super(...arguments);
    this.args.headers.addHeader(this);
  }

  willDestroy() {
    super.willDestroy(...arguments);
    this.args.headers.removeHeader(this);
  }
}
