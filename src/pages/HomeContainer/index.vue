<template>
  <div>
      <mt-swipe :auto="4000">
      <mt-swipe-item v-for="(item,index) in message" :key="index">
          <a :href="item.url">
              <img :src="item.img" alt="">
          </a>
      </mt-swipe-item>
    </mt-swipe>
    <div class="list">
        <ul>
            <li>
                <router-link to="/home/newsList">
                    <img src="../../images/menu1.png" alt="">
                    <span>新闻资讯</span>
                </router-link>
            </li>
            <li>
                <router-link to="/home/photoSharing">
                    <img src="../../images/menu2.png" alt="">
                    <span>图片欣赏</span>
                </router-link>
            </li>
            <li>
                <router-link to="/home/commodityList">
                    <img src="../../images/menu3.png" alt="">
                    <span>商品购买</span>
                </router-link>
            </li>
            <li>
                <a href="">
                    <img src="../../images/menu4.png" alt="">
                    <span>留言反馈</span>
                </a>
            </li>
            <li>
                <a href="">
                    <img src="../../images/menu5.png" alt="">
                    <span>视频专区</span>
                </a>
            </li>
            <li>
                <a href="">
                    <img src="../../images/menu6.png" alt="">
                    <span>联系我们</span>
                </a>
            </li>
        </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
        message:[]
    };
  },
  methods: {
    getLunbotu() {
      this.$http
        .get("api/getlunbo").then(result => {
            if(result.body.status==0){
                this.message=result.body.message
            }
        })
    }
  },
  created() {
      this.getLunbotu()
  }
};
</script>

<style lang="less" scoped>
.mint-swipe {
  width: 100%;
  height: 300px;
  .mint-swipe-item {
    width: 100%;
    height: 100%;
    img{
        width: 100%;
        height: 100%;
    }
  }
}
.list{
      ul{
          padding: 0;
          margin: 0;
         li{
             float: left;
             width: 33.333%;
             list-style: none;
             text-align: center;
             padding: 10px 0;
             a{
                 text-decoration: none;
                 color: rgb(15, 9, 9);
                img{
                 width: 60px;
                 height: 60px;
             }
             span{
                 display: block;
             }
             }
         } 
      }
  }
</style>
