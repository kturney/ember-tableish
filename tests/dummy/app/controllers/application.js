import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  items: computed({
    get() {
      const items = [];

      for (let i = 0; i < 100; ++i) {
        items.push({
          kyle: `Kyle ${i}`,
          justin: `Justin ${i}`,
          turney: `Turney ${i}`
        });
      }

      return items;
    }
  })
});
