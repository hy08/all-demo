import Vue from 'vue';
import VueRouter, { RouteConfig, Route, NavigationGuardNext } from 'vue-router';
import Home from '../views/index.vue';
import About from '../views/about.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/about',
    component: About,
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to: Route, from: Route, next: NavigationGuardNext) => {
  console.log('global beforeEach', to, from);
  next();
});

export default router;
