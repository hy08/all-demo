import { Vue, Component } from 'vue-property-decorator';
import styles from './index.less';

@Component
export default class Layout extends Vue {
  hasSider = false;

  mounted() {
    console.log('this.$slots', this.$slots);
    console.log('this.$scopedSlots', this.$scopedSlots);
    if (this.$slots.sider) {
      this.hasSider = true;
    }
  }
  render() {
    return (
      <div class={[styles.layout, this.hasSider ? styles['has-sider'] : '']}>
        <slot name="header"></slot>
        <slot name="sider"></slot>
        <slot></slot>
      </div>
    );
  }
}
