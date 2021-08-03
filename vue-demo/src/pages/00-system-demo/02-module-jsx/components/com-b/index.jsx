import styles from './index.less';
export default {
  name: 'ComB',
  props: {
    prop1: {
      type: String,
    },
  },
  methods: {
    handleClick() {
      this.$emit('click', '组件自定义事件触发了');
    },
  },
  render() {
    console.log('插槽', this, this.$scopedSlots);
    return (
      <div class={styles.container}>
        <header>jsx组件</header>
        <button onClick={this.handleClick}>测试事件</button>
        {this.$scopedSlots.scopeA && this.$scopedSlots.scopeA({ name: 'scopeA params value: test' })}
      </div>
    );
  },
};
