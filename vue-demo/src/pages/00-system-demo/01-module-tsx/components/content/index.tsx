import { Vue, Component } from 'vue-property-decorator';
import styles from './index.less';

@Component
export default class Content extends Vue {
  info = {
    message: '这是Content内部data！',
    source: 'Content',
  };
  render() {
    return (
      <div class={styles.content}>
        <slot info="info">Content 组件插槽后备内容：{this.info.message}</slot>
      </div>
    );
  }
}
