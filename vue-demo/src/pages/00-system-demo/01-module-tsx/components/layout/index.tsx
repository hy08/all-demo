import { Vue, Component } from 'vue-property-decorator';
import * as tsx from 'vue-tsx-support';
import styles from './index.less';

@Component
export default class Layout extends Vue {
  $scopedSlots!: tsx.InnerScopedSlots<{ default?: void; header?: void; sider?: void }>;

  hasSider = false;

  mounted() {
    console.log('this.$scopedSlots', this.$scopedSlots);
    if (this.$scopedSlots.sider) {
      this.hasSider = true;
    }
  }
  render() {
    return (
      <div class={[styles.layout, this.hasSider ? styles['has-sider'] : '']}>
        {this.$scopedSlots.header && this.$scopedSlots.header()}
        {this.$scopedSlots.sider && this.$scopedSlots.sider()}
        {this.$scopedSlots.default && this.$scopedSlots.default()}
      </div>
    );
  }
}
