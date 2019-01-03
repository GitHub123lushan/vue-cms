import Vue from 'vue'
import Router from 'vue-router'
import home from '@/pages/HomeContainer'
import member from '@/pages/MemberContainer'
import search from '@/pages/SearchContainer'
import shopcar from '@/pages/ShopcarContainer'
import newsList from '@/pages/newsListContainer'
import newpart from '@/pages/newParticularsContainer'
Vue.use(Router)

export default new Router({
  routes: [
    {path:"/",redirect: '/home'},
    {path:'/home',component:home},
    {path:'/member',component:member},
    {path:'/search',component:search},
    {path:'/shopcar',component:shopcar},
    {path:'/home/newsList',component:newsList},
    {path:'/home/newParticulars/:id',component:newpart}
  ],
  linkActiveClass: 'is-selected' 
}
)
