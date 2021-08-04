import Vue from 'vue';
import { Input } from 'ant-design-vue';
import ComA from '../com-a/index.vue';
import styles from './index.less';
Vue.directive('my-bold', {
  inserted: function(el) {
    el.style.fontWeight = 900;
  },
});
export default {
  name: 'ComB',
  props: {
    prop1: {
      type: String,
    },
  },
  data() {
    return {
      list: [1, 2, 3],
      newTodoText: '',
      newTodoText1: '',
    };
  },
  methods: {
    handleClick() {
      console.log('触发事件');
    },
    handleCustomEvent() {
      console.log('触发自定义事件');
    },
    handleNativeEvent() {
      console.log('触发原生事件');
    },
  },
  render() {
    console.log('comb插槽', this.$slots, this.$scopedSlots);
    console.log('ref', this.$refs);
    const props = { props: { firstName: '前端', lastName: '开发' } };
    return (
      <div class={styles.container}>
        <header>jsx组件comB</header>
        <div
          // normal attributes or prefix with on props.
          id="foo"
          domPropsInnerHTML="<div style='color:blue'>bar</div>"
          class={{ foo: true, bar: false }}
          style={{ color: 'red', fontSize: '14px' }}
          key="key"
          ref="ref"
          // assign the `ref` is used on elements/components with v-for
          refInFor
        ></div>
        {true ? <div>true</div> : <div>false</div>}
        {true && <div>true</div>}
        {[1, 2, { item: 3 }].map((item) => (
          <span style="color:red">{item}</span>
        ))}
        <ComA
          nativeOnClick={this.handleNativeEvent}
          onCustomEvent={this.handleCustomEvent}
          title="attr"
          scopedSlots={{
            test: (param) => {
              return <div>{param.name}</div>;
            },
          }}
          on={{
            '~keyup': this.handleClick,
          }}
          {...props}
        >
          <div slot="content">content</div>
          <div>default</div>
        </ComA>
        <input vModel={this.newTodoText} />
        <Input vModel_trim={this.newTodoText1} />
        <div ref="t" class="test" v-show={true} v-my-bold>
          test
        </div>
        {this.$scopedSlots.scopeA && this.$scopedSlots.scopeA({ name: 'scopeA params value: test' })}
      </div>
    );
  },
};
