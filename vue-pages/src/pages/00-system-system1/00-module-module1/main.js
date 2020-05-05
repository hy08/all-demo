import Vue from 'vue'
import App from './App.vue'
Vue.config.productionTip = false

console.log('1111');

new Vue({
  render: h => h(App),
}).$mount('#app')
