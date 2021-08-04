<script>
  export default {
    name: 'ComA',
    methods: {},
    render() {
      console.log('coma插槽', this.$slots, this.$scopedSlots);
      return (
        <div class="a-container">
          <button
            onClick={() => {
              this.$emit('customEvent');
            }}
          >
            事件测试
          </button>
          {this.$scopedSlots.default && this.$scopedSlots.default({ name: 'com a slot' })}
        </div>
      );
    },
  };
</script>
<style lang="less" scoped src="./index.less" />
