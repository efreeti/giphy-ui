import Vue from 'vue';
import 'reflect-metadata';
import { container } from 'inversify-props';
import VueObserveVisibility from 'vue-observe-visibility';
// @ts-ignore
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';

import { IGiphyService } from "@/services/IGiphyService";
import { GiphyService } from "@/services/GiphyService";
import '@/store/AppStore';
import store from './store';
import App from './App.vue';

Vue.config.productionTip = false;
Vue.use(VueMaterial);
Vue.use(VueObserveVisibility);

container.addSingleton<IGiphyService>(GiphyService);

new Vue({
  store,
  render: h => h(App),
}).$mount('#app');
