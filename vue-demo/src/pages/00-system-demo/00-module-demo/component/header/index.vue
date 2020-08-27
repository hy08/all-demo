<template>
  <div class="header">
    <div>{{ info }}</div>
    <!-- <div>{{ count }}</div> -->
  </div>
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator';
  @Component
  export default class Header extends Vue {
    //data定义，类属性
    info = 'header';
  }
</script>

<style src="./index.less" lang="less" scoped></style>
