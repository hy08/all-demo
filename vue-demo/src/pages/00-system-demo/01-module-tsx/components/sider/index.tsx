import { Vue, Component } from 'vue-property-decorator';
import * as tsx from 'vue-tsx-support';
import { Button as AButton } from 'ant-design-vue';
import styles from './index.less';
import { antdPropsConvert } from '@/utils/propsConvert';

const Button = antdPropsConvert(AButton);

@Component
export default class Sider extends Vue {
  _tsx!: tsx.DeclareOnEvents<{ onClick: string }>;

  $scopedSlots!: tsx.InnerScopedSlots<{ default?: void }>;

  render() {
    return (
      <div class={styles.sider}>
        {this.$scopedSlots.default && this.$scopedSlots.default()}
        <div>
          <Button
            type="primary"
            onClick={() => {
              this.$emit('click', '事件触发参数');
            }}
          >
            事件触发
          </Button>
        </div>
      </div>
    );
  }
}
