// mixins.js
import Vue from 'vue';
import Component from 'vue-class-component';

// You can declare mixins as the same style as components.
@Component
export class Hello extends Vue {
  /**
   *  mixin中的响应式数据
   */
  mixinText = 'Hello mixins';

  obj: { name: string } = { name: 'han' };
}
