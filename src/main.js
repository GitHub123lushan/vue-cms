// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import app from './App.vue'
import router from './router'
import '@/lib/font/iconfont.css'
import '@/lib/common/common.css'
import resource from 'vue-resource'
import moment from 'moment'
import comment from '@/common/commentContainer'

// Vue.js图片预览插件
import vuePicturePreview from 'vue-picture-preview'

//导入Vuex模块
import store from '@/store'


Vue.use(MintUI)



Vue.use(resource)
Vue.use(vuePicturePreview)
Vue.component("comment_box",comment)
Vue.http.options.root = 'http://www.lovegf.cn:8899';
Vue.http.options.emulateHTTP = true;
Vue.config.productionTip = false
Vue.filter("timeFiltration",(time,pattern = 'YYYY-MM-DD HH:mm:ss')=>{
  return moment(time).format(pattern)
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render:c=>c(app)
  
})
