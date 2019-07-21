import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

Vue.use(require('vue-moment'));

import './base.css'
import './assets/iconfont/iconfont.css'

Vue.config.devtools = true;
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
