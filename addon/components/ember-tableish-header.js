import Component from '@glimmer/component';

export default class EmberTableishHeader extends Component {
  get width() {
    return this.args.width || '1fr';
  }

  willDestroy() {
    super.willDestroy(...arguments);
    this.args.headers.removeHeader(this);
  }

  constructor() {
    super(...arguments);
    this.args.headers.addHeader(this);
  }
}
