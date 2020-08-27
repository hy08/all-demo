import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from '@/modules';
import Component from 'vue-class-component';
import '@/assets/css/common.less';
Vue.config.productionTip = false;

Component.registerHooks(['beforeRouteEnter', 'beforeRouteLeave', 'beforeRouteUpdate']);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
