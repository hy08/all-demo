import { Vue, Component, Mixins, Watch, Ref } from 'vue-property-decorator';
import { Route, NavigationGuardNext } from 'vue-router';
import Header from '../component/header/index.vue';
import { User } from '../../../../types/one';
import { Log } from '../decorator.js';
import { Hello } from '../../../../mixins/hello';

//引入组件
@Component({
  components: {
    Header,
  },
})
export default class Index extends Mixins(Hello) {
  @Ref('header') readonly headerRef!: Header;

  //data定义，类属性
  message = 'hello world';
  info: User = { name: 'hello', age: 25 };
  //如果数据的值是undefined或者未赋初值,则不会成为响应式数据。解决方案：追加类型定义null
  count: number;

  //compute定义
  get introduction() {
    return `姓名：${this.info.name}, 年龄：${this.info.age}`;
  }

  //watch定义
  @Watch('$route', { immediate: true })
  private changeRouter(newRoute: Route, oldRoute: Route) {
    console.log('$route watcher: ', newRoute, oldRoute);
  }
  //声明周期定义
  created() {
    console.log('mixins data: ', this.mixinText, this.obj.name);
  }
  mounted() {
    this.count = 1;
    console.log('this.headerRef', this.headerRef);
  }

  listen() {
    console.log('listen');
  }

  // 路由钩子函数
  beforeRouteEnter(to: Route, from: Route, next: NavigationGuardNext) {
    console.log('组件内路由守卫：beforeRouteEnter --> Home');
    next();
  }
  beforeRouteUpdate(to: Route, from: Route, next: NavigationGuardNext) {
    console.log('组件内路由守卫：beforeRouteUpdate --> Home');
    next();
  }
  beforeRouteLeave(to: Route, from: Route, next: NavigationGuardNext) {
    console.log('组件内路由守卫：beforeRouteLeave --> Home');
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
