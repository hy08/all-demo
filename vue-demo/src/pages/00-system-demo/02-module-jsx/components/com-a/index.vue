<script>
  export default {
    name: 'ComA',
    props: {
      firstName: {
        type: String,
        default: '',
      },
      lastName: {
        type: String,
        default: '',
      },
    },
    methods: {},
    render() {
      console.log('coma插槽', this.$slots, this.$scopedSlots);
      return (
        <div class="a-container">
          <button
            onClick={(event) => {
              this.$emit('customEvent');
              event.stopPropagation();
            }}
          >
            事件名测试
          </button>
          <button
            onClick={(event) => {
              this.$emit('keyup');
              event.stopPropagation();
            }}
          >
            事件修饰符测试
          </button>
          <div>{this.firstName + this.lastName}</div>
          {this.$scopedSlots.default && this.$scopedSlots.default({ name: 'com a slot' })}
          {this.$slots.content}
        </div>
      );
    },
  };
</script>
<style lang="less" scoped src="./index.less" />
