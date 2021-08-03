<script>
export default {
  name: 'ComA',
  methods: {
    handleClick() {
      alert('原生dom事件触发');
      this.$emit('click', '组件自定义事件触发了');
    },
  },
  render() {
    return (
      <div class="a-container">
        <header style={{ color: 'red', textAlign: 'center', fontSize: '20px' }}>vue组件render</header>
        <button onClick={this.handleClick}>测试事件</button>
      </div>
    );
  },
};
</script>
<style lang="less" scoped src="./index.less" />
