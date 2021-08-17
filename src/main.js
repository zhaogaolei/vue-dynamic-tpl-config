import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './assets/common.less'

// 引入antd
import './core/lazy_use'

// 引入酒店详情模板
import zm, { HotelDesign } from '../packages'

console.log('=====>', zm, HotelDesign)
Vue.use(HotelDesign)
Vue.use(zm)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
