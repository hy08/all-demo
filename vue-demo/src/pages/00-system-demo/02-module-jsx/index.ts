import '@/utils/class-component-hooks';
import Vue from 'vue';
import 'vue-tsx-support/enable-check';
import App from './App';
import router from './router';
import store from '@/modules';
import '@/assets/css/common.less';
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
