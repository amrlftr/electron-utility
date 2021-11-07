import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueTippy, { TippyComponent } from "vue-tippy";
import "tippy.js/themes/light.css";

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

Vue.use(VueTippy);

Vue.component("tippy", TippyComponent);

