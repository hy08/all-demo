<script>
  import comA from '../components/com-a.vue';
  export default {
    name: 'home',
    components: { comA },
    methods: {
      handleClick(msg) {
        console.log(msg);
      },
    },
    render() {
      return (
        <div class="container">
          <comA attr1="attr1" attr2={{ attr2: 'attr2' }} onClick={this.handleClick} />
        </div>
      );
    },
  };
</script>
<style lang="less" scoped src="./index.less" />
