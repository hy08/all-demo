import { Vue, Component } from 'vue-property-decorator';
import * as tsx from 'vue-tsx-support';
import styles from './index.less';

type Info = {
  message: string;
  source: string;
};
@Component
export default class Content extends Vue {
  $scopedSlots!: tsx.InnerScopedSlots<{ default?: Info }>;

  info: Info = {
    message: '这是Content内部data！',
    source: 'Content',
  };

  render() {
    return <div class={styles.content}>{this.$scopedSlots.default && this.$scopedSlots.default(this.info)}</div>;
  }
}
