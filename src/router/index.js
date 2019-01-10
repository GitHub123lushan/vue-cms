import Vue from 'vue'
import Router from 'vue-router'
import home from '@/pages/HomeContainer'
import member from '@/pages/MemberContainer'
import search from '@/pages/SearchContainer'
import shopcar from '@/pages/ShopcarContainer'
import newsList from '@/pages/newsListContainer'
import newpart from '@/pages/newParticularsContainer'
import photoSharing from '@/pages/photoSharingContainer'
import pictureDetails from '@/pages/pictureDetailsContainer'
import commodityList from '@/pages/commodityListContainer'
import productDetails from '@/pages/productDetailsContainer'
import commodityReview from '@/pages/commodityReviewContainer'
import ProductDescription from '@/pages/ProductDescriptionContainer'
Vue.use(Router)

export default new Router({
  routes: [
    {path:"/",redirect: '/home'},
    {path:'/home',component:home},
    {path:'/member',component:member},
    {path:'/search',component:search},
    {path:'/shopcar',component:shopcar},
    {path:'/home/newsList',component:newsList},
    {path:'/home/newParticulars/:id',component:newpart},
    {path:'/home/photoSharing',component:photoSharing},
    {path: '/home/pictureDetails/:id', component: pictureDetails },
    {path:'/home/commodityList', component:commodityList},
    {path:'/home/productDetails/:id',component:productDetails,name:'productDetails'},
    {path:'/home/commodityReview/:id',component:commodityReview,name:'commodityReview'},
    {path:'/home/ProductDescription/:id',component:ProductDescription,name:'ProductDescription'}
  ],
  linkActiveClass: 'is-selected' 
}
)
