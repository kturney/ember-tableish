import Component from '@glimmer/component';
import { registerDestructor } from '@ember/destroyable';

export default class EmberTableishHeader extends Component {
  get width() {
    return this.args.width || '1fr';
  }

  constructor() {
    super(...arguments);
    this.args.headers.addHeader(this);

    registerDestructor(this, () => {
      this.args.headers.removeHeader(this);
    });
  }
}
