import Component from '@ember/component';
import layout from '../templates/components/ember-tableish-header';

export default Component.extend({
  layout,

  width: '1fr',

  init() {
    this._super(...arguments);

    this.headers.cols.pushObject(this);
  },

  willDestroy() {
    this._super(...arguments);

    this.headers.cols.removeObject(this);
  }
});
