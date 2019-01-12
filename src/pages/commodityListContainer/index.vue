<template>
  <div class="page-loadmore-wrapper" ref="tab">
    <scroll
      class="wrapper"
      :data="commodityData"
      :pulldown="pulldown"
      :pullup="pullup"
      @loadData="loadData"
      @scrollToEnd="scrollToEnd"
    >
      <div>
        <div class="bottom-Loading" v-show="refresh">
              刷新中
        <mt-spinner type="fading-circle" class="quan"></mt-spinner>
      </div>
        <ul class="dataList" ref="tabWrapper">
        <li
          v-for="(item, index) in commodityData"
          :key="index"
          @click="productDetails(item.id)"
          ref="tabitem"
        >
          <div>
            <img :src="item.img_url" alt>
            <h3>{{item.title}}</h3>
          </div>
          <div class="Price">
            <p>
              <span>¥ {{item.sell_price}}</span>
              <del>¥{{item.market_price}}</del>
            </p>
            <p>
              <span>热卖</span>
              <span>剩余 {{item.stock_quantity}} 件</span>
            </p>
          </div>
        </li>
      </ul>
      <div class="bottom-Loading" v-show="loading">
              加载中...
        <mt-spinner type="fading-circle" class="quan"></mt-spinner>
      </div>
      <div class="bottom-Loading" v-show="complete">
              我也是有底线的
        <mt-spinner type="fading-circle" class="quan"></mt-spinner>
      </div>
      </div>
    </scroll>
  </div>
</template>
<script>
import scroll from "@/common/scroll";
export default {
  data() {
    return {
      commodityData: [],
      pageindex: 1,
      pulldown: true,
      pullup: true,
      loading:false,
      complete:false,
      refresh:false
    };
  },
  methods: {
    getCommodityData() {
      this.$http.get("api/getgoods?pageindex=" + this.pageindex).then(res => {
        if (res.body.status === 0) {
          if(this.commodityData.length>=this.commodityData.concat(res.body.message).length){
            this.complete=true
          }
          this.commodityData = this.commodityData.concat(res.body.message);
          this.loading=false
          this.refresh=false
        }
      });
    },

    productDetails(id) {
      this.$router.push({ name: "productDetails", params: { id: id } });
    },
    loadData() {
      this.refresh=true
      this.commodityData = [];
      this.pageindex = 1;
      this.getCommodityData();
    },
    scrollToEnd() {
      if(this.complete){
        return this.complete=false
      }
      this.pageindex++;
      this.loading=true;
      this.getCommodityData();
    }
  },
  created() {
    this.getCommodityData();
  },
  components: {
    scroll
  }
};
</script>

<style lang="less" scoped>
.page-loadmore-wrapper {
  .wrapper {
    overflow: hidden;
    -webkit-overflow-scrolling: touch;
    position: absolute;
    top: 40px;
    bottom: 47px;
    z-index: 99;
    .dataList {
    display: flex;
    justify-content: space-between;
    flex-flow: wrap;
    padding: 10px;
    li {
      display: flex;
      flex-flow: column;
      justify-content: space-between;
      width: 48%;
      margin-bottom: 4%;
      box-shadow: 0 0 8px #ccc;
      h3 {
        font-size: 14px;
        font-weight: 700;
      }
      img {
        width: 100%;
        min-height: 200px;
      }
      .Price {
        background-color: #eee;
        color: #808080;
        p {
          padding: 5px;
        }
        p:first-of-type {
          span {
            font-weight: 700;
            color: red;
            font-size: 14px;
            margin-right: 5px;
          }
          del {
            font-size: 12px;
          }
        }
        p:last-of-type {
          display: flex;
          justify-content: space-between;
          font-size: 14px;
        }
      }
    }
  }
  .bottom-Loading{
    text-align: center;
    height: 50px;
    position: relative;
    .quan{
      position: absolute;
      left: 50%;
      top: 18px;
      transform: translateX(-50%)
    }
  }
  }

  

}
</style>
