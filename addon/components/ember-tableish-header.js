import Component from '@ember/component';
import layout from '../templates/components/ember-tableish-header';

export default Component.extend({
  layout,
  classNames: ['ember-tableish-header'],

  width: '1fr',

  init() {
    this._super(...arguments);

    this.headers.addHeader(this);
  },

  willDestroy() {
    this._super(...arguments);

    this.headers.removeHeader(this);
  }
});
