<template>
  <div class="li-container">
    <div class="left">
      <div class="img"></div>
      <div class="desc">
        <span class="name">
          {{ good.name }}
        </span>
        <span>{{ good.price }}</span>
      </div>
    </div>
    <div class="right">
      <button @click="addGood">加入购物车</button>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'LiGood',
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
