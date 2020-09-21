import Vue from 'vue';
import VueRouter, { RouteConfig, Route, NavigationGuardNext } from 'vue-router';
import Home from '../views/index';
import About from '../views/about';
import User from '../views/user';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    component: Home,
    beforeEnter: (to, form, next) => {
      console.log('路由独享的守卫(唯一): beforeEach --> Home');
      next();
    },
  },
  {
    path: '/about/',
    component: About,
    beforeEnter: (to, form, next) => {
      console.log('路由独享的守卫(唯一): beforeEach --> About');
      next();
    },
  },
  {
    path: '/user/:userId',
    component: User,
    beforeEnter: (to, form, next) => {
      console.log('路由独享的守卫(唯一): beforeEach --> User');
      next();
    },
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to: Route, from: Route, next: NavigationGuardNext) => {
  console.log('全局路由前置守卫: beforeEach');
  next();
});
router.beforeResolve((to: Route, from: Route, next: NavigationGuardNext) => {
  console.log('全局路由解析守卫: beforeResolve');
  next();
});
router.afterEach((to: Route, from: Route) => {
  console.log('全局路由后置守卫: afterEach');
});

export default router;
