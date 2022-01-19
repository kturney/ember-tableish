import Component from '@glimmer/component';
export default class EmberTableish extends Component {
  get columnGap() {
    return this.args.columnGap || null;
  }
}
