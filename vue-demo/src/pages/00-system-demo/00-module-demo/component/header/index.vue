<template>
  <div class="header"></div>
</template>

<script lang="ts">
  import { Vue, Component, Prop } from 'vue-property-decorator';
  import { User } from '../../../../types/one';

  @Component
  export default class Header extends Vue {
    @Prop({ type: String, default: '标题' }) readonly title?: string;
    @Prop({ type: User, default: () => ({ name: '-', age: '-' }) }) readonly author;
  }
</script>

<style src="./index.less" lang="less" scoped></style>
