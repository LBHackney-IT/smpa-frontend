import Vue from 'vue';
import App from './App.vue';
import router from '@/router';
import store from '@/store';
import ApiService from '@/common/api.service'
import VueAnalytics from 'vue-analytics';
import "./scss/main.scss";

Vue.use(VueAnalytics, {
  id: 'UA-151911804-1',
  router
})

Vue.config.productionTip = false;

ApiService.init();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

