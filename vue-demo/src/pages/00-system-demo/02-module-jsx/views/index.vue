<template>
  <div class="container">
    <!-- <ComA /> -->
    <ComB />
    <!-- <ComC /> -->
  </div>
</template>
<script>
  export default {
    name: 'home',
    components: {
      ComA: () => import(/* webpackChunkName: "ComA" */ '../components/com-a/index.vue'),
      ComB: () => import(/* webpackChunkName: "ComB" */ '../components/com-b/index.jsx'),
      ComC: () => import(/* webpackChunkName: "ComC" */ '../components/com-c/index.vue'),
    },
  };
</script>
<style lang="less" scoped src="./index.less" />
