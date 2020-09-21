import { Vue, Component } from 'vue-property-decorator';
import { Route, NavigationGuardNext } from 'vue-router';
//引入组件
@Component
export default class Index extends Vue {
  // 路由钩子函数
  beforeRouteEnter(to: Route, from: Route, next: NavigationGuardNext) {
    console.log('组件内路由守卫：beforeRouteEnter --> About');
    next();
  }
  beforeRouteUpdate(to: Route, from: Route, next: NavigationGuardNext) {
    console.log('组件内路由守卫：beforeRouteUpdate --> About');
    next();
  }
  beforeRouteLeave(to: Route, from: Route, next: NavigationGuardNext) {
    console.log('组件内路由守卫：beforeRouteLeave --> About');
    next();
  }

  render() {
    return (
      <div class="container">
        about
        <div>
          <router-link to="/">Go to Index</router-link>
        </div>
      </div>
    );
  }
}
