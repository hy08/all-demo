<template>
  <div class="shopping-cart" v-if="goods.length > 0">
    <div class="good" v-for="good in goods" :key="good.id">
      <div class="left" :title="good.name">{{ good.name }}</div>
      <div class="right">
        <span class="price">{{ good.price }}*{{ good.count }}</span>
        <button @click="removeGood(good)">删除</button>
      </div>
    </div>
    <button class="buy" @click="buy">购买</button>
  </div>
</template>
<script>
  export default {
    name: 'ShoppingCart',
    props: {
      goods: {
        type: Array,
        default: () => [],
      },
    },
    methods: {
      removeGood(good) {
        this.$emit('removeGood', good);
      },
      buy() {
        let totalPrice = 0;
        this.goods.forEach((good) => {
          totalPrice += good.price * good.count;
        });
        let strList = this.goods.map((good) => {
          return `${good.name}:${good.count}个\n`;
        });
        window.alert(`共买了:\n${strList.toString()}，总计￥${totalPrice}`);
      },
    },
  };
</script>
<style lang="less" scoped src="./index.less" />
