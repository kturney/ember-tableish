import Component from '@ember/component';
import layout from '../templates/components/ember-tableish-headers';
import { A as emberArray } from '@ember/array';
import { computed } from '@ember/object';

export default Component.extend({
  layout,
  classNames: [ 'ember-tableish-headers' ],

  columnsTemplate: computed('cols.@each.width', {
    get() {
      return this.cols.mapBy('width').join(' ');
    }
  }),

  init() {
    this._super(...arguments);

    this.cols = emberArray();
  }
});
