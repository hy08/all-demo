<template>
  <div class="cardGood">
    <div class="img"></div>
    <div class="footer">
      <span class="left" :title="good.name">{{ good.name }}</span>
      <div class="right">
        <span class="price">{{ good.price }}元</span>
        <button @click="addGood">加入购物车</button>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'CardGood',
    props: {
      good: {
        type: Object,
        default: () => ({}),
      },
    },
    data() {
      return {};
    },
    methods: {
      addGood() {
        this.$emit('addGood', this.good);
      },
    },
  };
</script>
<style lang="less" scoped src="./index.less" />
