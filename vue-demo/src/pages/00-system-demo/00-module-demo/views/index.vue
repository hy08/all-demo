<template>
  <div class="container">
    <Header />
    <div>{{ message }}</div>
    <!-- <div>{{ count }}</div> -->
  </div>
</template>

<script lang="ts">
  import { Vue, Component, Mixins, Watch } from 'vue-property-decorator';
  import { Route, RawLocation, NavigationGuardNext } from 'vue-router';
  import Header from '../component/header/index.vue';
  import { Log } from '../decorator.js';
  import { Hello } from '../mixins/hello';

  type Info = {
    name: string;
    age: number;
  };

  //引入组件
  @Component({
    components: {
      Header,
    },
  })
  export default class Index extends Mixins(Hello) {
    //data定义，类属性
    message = 'hello world';
    info: Info = { name: 'hy', age: 25 };
    //如果数据的值是undefined,则不会成为响应式数据。解决方案：追加类型定义null
    count?: number;

    //compute定义
    get introduction() {
      return `姓名：${this.info.name}, 年龄：${this.info.age}`;
    }

    //watch定义
    @Watch('$route', { immediate: true })
    private changeRouter(route: Route) {
      console.log(route);
    }

    //声明周期定义
    created() {
      console.log('mixins data: ', this.mixinText, this.obj.name);
    }
    mounted() {
      this.count = 1;
    }
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
    //method定义
    introduce() {
      console.log(this.introduction);
    }

    //自定义装饰器
    @Log
    hello(value) {
      console.log(value);
    }
  }
</script>
