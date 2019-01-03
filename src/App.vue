<template>
  <div id="app" class="app">
    <mt-header fixed title="悠闲网购"></mt-header>

    <mt-tabbar>
      <router-link class="mint-tab-item" to="/home">
         <i class="icon-shouye mintui iconfont mint-toast-icon"></i> 
        首页
      </router-link>
      <router-link to="/member" class="mint-tab-item">
        <i class="icon-huiyuan iconfont mintui mint-toast-icon"></i> 
        会员
      </router-link>
      <router-link class="mint-tab-item" to="/search">
        <i class="icon-gouwuchekong iconfont mintui mint-toast-icon"></i> 
        发现
      </router-link>
      <router-link class="mint-tab-item" to="/shopcar">
        <i class="icon-sousuo iconfont mintui mint-toast-icon"></i> 
        搜索
      </router-link>
    </mt-tabbar>
    <transition>
    <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  data(){
    return{}
  },
};
</script>

<style lang="less">
htmnl,body{
  margin: 0;
  padding: 0;
  .mint-tabbar{
    position: fixed;
    background-color: #b51fe0;
    z-index: 7;
  }
  .app {
    overflow-x: hidden;
  padding-top: 40px;
  padding-bottom: 52px;
  ul{
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .v-enter {
  opacity: 0;
  transform: translateX(100%);
  
}

.v-leave-to {
  opacity: 0;
  transform: translateX(-100%);
  position: absolute;
}

.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}
}
}
</style>

