<template>
  <div id="app" class="app">
    <mt-header fixed title="悠闲网购">
      <mt-button icon="back" slot="left" @click="$router.go(-1)" v-show="flag">返回</mt-button>
    </mt-header>

    <mt-tabbar>
      <router-link class="mint-tab-item" to="/home">
        <i class="icon-shouye mintui iconfont mint-toast-icon"></i>
        首页
      </router-link>
      <router-link to="/member" class="mint-tab-item">
        <i class="icon-huiyuan iconfont mintui mint-toast-icon"></i>
        会员
      </router-link>
      <router-link class="mint-tab-item shopping" to="/search">
        <span id="quantity">{{$store.getters.goodsCount}}</span>
        <i class="icon-gouwuchekong iconfont mintui mint-toast-icon"></i>
        购物车
      </router-link>
      <router-link class="mint-tab-item" to="/shopcar">
        <i class="icon-sousuo iconfont mintui mint-toast-icon"></i>
        搜索
      </router-link>
    </mt-tabbar>
    <transition name="app">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      quantity: 0,
      flag: false
    };
  },
  watch: {
    $route(to, from) {
      if (to.path == "/" || to.path == "/home") {
        this.flag = false;
      } else {
        this.flag = true;
      }
    }
  }
};
</script>

<style lang="less">
htmnl,
body {
  margin: 0;
  padding: 0;
  .mint-tabbar {
    position: fixed;
    background-color: #b51fe0;
    z-index: 7;
  }
  .app {
    overflow-x: hidden;
    padding-top: 40px;
    padding-bottom: 52px;
    font-size: 12px;
    ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    .shopping {
      position: relative;
      span {
        padding: 0 5px;
        color: #fff;
        text-align: center;
        background-color: red;
        border-radius: 50%;
        position: absolute;
        top: -5px;
        right: 40px;
      }
    }
    .app-enter {
      opacity: 0;
      transform: translateX(100%);
    }

    .app-leave-to {
      opacity: 0;
      transform: translateX(-100%);
      position: absolute;
    }

    .app-enter-active,
    .app-leave-active {
      transition: all 0.5s ease;
    }
  }
}
</style>

