<template>
  <div class="sider">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
@Component
export default class Sider extends Vue {}
</script>

<style src="./index.less" lang="less" scoped></style>
