import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import Argon from "./plugins/argon-kit";
import store from "./store"
import VueToast from 'vue-toast-notification';
import VueSession from 'vue-session'
import vuetify from './plugins/vuetify';

import 'vue-toast-notification/dist/theme-default.css';

import { CHECK_AUTH } from "./store/actions.type";
import ApiService from "./common/api.service";
import './registerServiceWorker'


Vue.config.productionTip = false
// Vue.use(Argon);
Vue.use(VueToast);
Vue.use(VueSession);

ApiService.init();

// Ensure we checked auth before each page load.
router.beforeEach((to, from, next) =>
  Promise.all([store.dispatch(CHECK_AUTH)]).then(next)
);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')