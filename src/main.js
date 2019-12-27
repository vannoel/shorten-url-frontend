import Vue from 'vue'
import { sync } from 'vuex-router-sync'

import App from '@/App.vue'
import router from '@/router'
import store from '@/store'

import '@/assets/style/index.scss' // global css

import '@/plugins/module-ui'
import '@/plugins/vue-fontawesome'
// import '@/plugins/aos'

Vue.config.productionTip = false;

sync(store, router)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')