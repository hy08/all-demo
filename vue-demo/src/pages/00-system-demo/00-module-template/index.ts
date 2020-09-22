import '@/utils/class-component-hooks';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from '@/modules';
import '@/assets/css/common.less';
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');