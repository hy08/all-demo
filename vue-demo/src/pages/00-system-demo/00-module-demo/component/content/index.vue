<template>
  <div class="content">
    <slot>Content 组件插槽后备内容</slot>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
@Component
export default class Content extends Vue {}
</script>

<style src="./index.less" lang="less" scoped></style>
