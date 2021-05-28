import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

/** 插件 start */
import Element from 'element-ui' // ElementUI
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(Element, {
  size: 'mini'
})
/** 插件 end */

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
