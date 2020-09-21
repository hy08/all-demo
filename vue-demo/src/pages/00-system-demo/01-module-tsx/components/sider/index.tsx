import { Vue, Component } from 'vue-property-decorator';
import styles from './index.less';

@Component
export default class Sider extends Vue {
  render() {
    return (
      <div class={styles.sider}>
        <slot></slot>
      </div>
    );
  }
}
