import Controller from '@ember/controller';

export default class ApplicationController extends Controller {
  get items() {
    const items = [];

    for (let i = 0; i < 100; ++i) {
      items.push({
        kyle: `Kyle ${i}`,
        justin: `Justin ${i}`,
        turney: `Turney ${i}`,
      });
    }

    return items;
  }
}
