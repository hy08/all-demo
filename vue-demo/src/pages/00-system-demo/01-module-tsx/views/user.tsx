import { Vue, Component } from 'vue-property-decorator';
import { Route, NavigationGuardNext } from 'vue-router';
//引入组件
@Component
export default class User extends Vue {
  // 路由钩子函数
  beforeRouteEnter(to: Route, form: Route, next: NavigationGuardNext) {
    console.log('组件内路由守卫：beforeRouteEnter --> User');
    next();
  }
  beforeRouteUpdate(to: Route, from: Route, next: NavigationGuardNext) {
    console.log('组件内路由守卫：beforeRouteUpdate(动态路由会调用) --> User');
    next();
  }
  beforeRouteLeave(to: Route, from: Route, next: NavigationGuardNext) {
    console.log('组件内路由守卫：beforeRouteLeave --> User');
    next();
  }
  render() {
    <div class="container">
      User: {this.$route.params.userId}
      <div>
        <router-link to="/user/user2">Go to User2</router-link>
      </div>
      <div>
        <router-link to="/">Go to Index</router-link>
      </div>
    </div>;
  }
}
