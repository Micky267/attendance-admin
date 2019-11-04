import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/icon/font-awesome.min.css'
import './assets/css/normalize.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './mock' // 导入这个 就已经开启拦截了
import axios from 'axios' // axios http请求库
axios.defaults.baseURL = 'http://mockjs.com/api' // 设置默认请求的url
Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

