import { Vue, Component } from 'vue-property-decorator';
import * as tsx from 'vue-tsx-support';
import styles from './index.less';

@Component
export default class Sider extends Vue {
  $scopedSlots!: tsx.InnerScopedSlots<{ default?: void }>;

  render() {
    return <div class={styles.sider}>{this.$scopedSlots.default && this.$scopedSlots.default()}</div>;
  }
}
