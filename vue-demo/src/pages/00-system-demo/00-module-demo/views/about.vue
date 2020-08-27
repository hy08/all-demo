<template>
  <div class="container">
    about
  </div>
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator';
  import { Route, RawLocation, NavigationGuardNext } from 'vue-router';
  //引入组件
  @Component
  export default class Index extends Vue {
    // 路由钩子函数
    beforeRouteEnter(to: Route, from: Route, next: NavigationGuardNext): void {
      console.log('beforeRouteEnter', to, from, next);
      next();
    }
    beforeRouteUpdate(to: Route, from: Route, next: NavigationGuardNext): void {
      console.log('beforeRouteUpdate');
      next();
    }
    beforeRouteLeave(to: Route, from: Route, next: NavigationGuardNext): void {
      console.log('beforeRouteLeave');
      next();
    }
  }
</script>
