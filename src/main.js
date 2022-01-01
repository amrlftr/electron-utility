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

Vue.mixin({
  mounted() {
    if (router.history.current.path !== '/') {
      window.addEventListener('keyup', function(event) {
        // If ESC key was pressed, go to Home
        if (event.keyCode === 27) {
          router.push('/', () => {}); 
        }
      });
    }
  },
})

