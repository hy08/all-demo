<template>
  <div :class="['layout',hasSider?'has-sider':'']">
    <slot name="header"></slot>
    <slot name="sider"></slot>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Layout extends Vue {
  hasSider = false;

  mounted() {
    console.log('this.$slots', this.$slots);
    if (this.$slots.sider) {
      this.hasSider = true;
    }
  }
}
</script>

<style src="./index.less" lang="less" scoped></style>
