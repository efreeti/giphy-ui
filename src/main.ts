import Vue from 'vue';
// @ts-ignore
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';

import store from './store';
import App from './App.vue';


Vue.config.productionTip = false;
Vue.use(VueMaterial);

new Vue({
  store,
  render: h => h(App),
}).$mount('#app');
