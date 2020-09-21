<template>
  <div class="content">
    <slot :info="info">Content 组件插槽后备内容：{{info.message}}</slot>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
@Component
export default class Content extends Vue {
  info = {
    message: '这是Content内部data！',
    source: 'Content',
  };
}
</script>

<style src="./index.less" lang="less" scoped></style>
