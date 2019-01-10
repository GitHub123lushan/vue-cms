<template>
  <div class="productDetails">
    <div class="swipe-box">
      <mt-swipe :show-indicators="false">
        <mt-swipe-item v-for="(item,index) in message" :key="index">
          <img
            v-preview="item.src"
            preview-nav-enable="true"
            preview-title-enable="true"
            :src="item.src"
            alt
          >
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <lg-preview></lg-preview>
    <div class="details">
      <h3>商品名称</h3>
      <div class="content">
        <p class="p1">
          市场价:
          <del>¥ {{getinfo.market_price}}</del>
          销售价:
          <span>¥ {{getinfo.sell_price}}</span>
        </p>
        <p class="p2">
          <transition v-on:before-enter="bEnter" v-on:enter="enter" v-on:after-enter="aEnter">
            <span class="xiaoqiu" v-show="show" id="xiaoQiu"></span>
          </transition>购买数量:
          <mt-button size="small" @click="quantity > 1 && quantity--" :disabled="quantity <= 1">-</mt-button>
          <input type="text" v-model="quantity">
          <mt-button
            size="small"
            @click="quantity < getinfo.stock_quantity &&  quantity++"
            :disabled="quantity >= getinfo.stock_quantity"
          >+</mt-button>
        </p>
        <p class="p3">
          <mt-button type="primary">立即购买</mt-button>
          <mt-button type="danger" @click="addGoodsInf()">加入购物车</mt-button>
        </p>
      </div>
    </div>
    <div class="parameter">
      <h3>商品参数</h3>
      <div class="box1">
        <p>商品货号:{{getinfo.goods_no}}</p>
        <p>库存情况:{{getinfo.stock_quantity}}</p>
        <p>上架时间:{{getinfo.add_time | timeFiltration}}</p>
      </div>
      <div class="box2">
        <mt-button plain type="primary" size="large" @click="details(getinfo.id)">图文详情</mt-button>
        <mt-button plain type="danger" size="large" @click="review(getinfo.id)">商品评论</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
        show:false,
      message: [],
      quantity: 1,
      getinfo: {}
    };
  },
  methods: {
    getLunbotu() {
      this.$http
        .get("api/getthumimages/" + this.$route.params.id)
        .then(result => {
          if (result.body.status == 0) {
            this.message = result.body.message;
          }
        });
      this.$http
        .get("api/goods/getinfo/" + this.$route.params.id)
        .then(result => {
          if (result.body.status == 0) {
            this.getinfo = result.body.message[0];
          }
        });
    },
    review(id) {
      this.$router.push({ name: "commodityReview", params: { id: id } });
    },
    details(id) {
      this.$router.push({ name: "ProductDescription", params: { id: id } });
    },
    bEnter(el) {
      el.style.transform = "translate(0,0)";
    },
    enter(el, done) {
      el.offsetTop;
      let x = document.getElementById('quantity').getBoundingClientRect().left - document.getElementById('xiaoQiu').getBoundingClientRect().left+'px'
      let y = document.getElementById('quantity').getBoundingClientRect().top - document.getElementById('xiaoQiu').getBoundingClientRect().top+'px'
      el.style.transform = "translate("+x+","+y+")";
      el.style.transition = "all 1s cubic-bezier(0.4, -0.3, 1, 0.68)";

      done();
      //done是enter方法的原生的引用函数名，这里表示是回调函数，也就是接下来执行的操作aEnter（），消灭延迟效果。
    },
    aEnter(el) {
      this.show = !this.show;
    },
    addGoodsInf(){
      this.show=!this.show
      this.$store.commit('addCount',{id:this.getinfo.id,count:this.quantity,checked:true})
      this.quantity = 1
    }
  },
  created() {
    this.getLunbotu();
  }
};
</script>

<style lang="less" scoped>
.productDetails {
  background-color: #ccc;
  padding: 10px;
  .swipe-box {
    background-color: #fff;
    height: 200px;
    padding: 20px 0;
    text-align: center;
    img {
      height: 200px;
    }
  }
  .details {
    margin-top: 20px;
    background-color: #fff;
    h3 {
      font-weight: 700;
      font-size: 16px;
      padding: 10px;
      border-bottom: 1px solid #ccc;
    }
    .content {
      font-size: 14px;
      color: #808080;
      padding: 10px;
      p {
        padding: 5px 0;
      }
      .p1 {
        span {
          font-weight: 700;
          font-size: 16px;
          color: red;
        }
      }
      .p2 {
        position: relative;
        .xiaoqiu {
          position: absolute;
          top: 2px;
          left: 108px;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: blue;
          z-index: 999;
        }
        input {
          border: 0;
          padding: 0;
          margin: 0;
          outline: none;
          width: 30px;
          height: 33px;
          border: 1px solid #eee;
          text-align: center;
        }
      }
    }
  }
  .parameter {
    background-color: #fff;
    margin-top: 20px;
    h3 {
      padding: 10px;
      border-bottom: 1px solid #ccc;
      font-size: 16px;
      font-weight: 700;
    }
    .box1 {
      color: #808080;
      padding: 10px;
      border-bottom: 1px solid #ccc;
      p {
        padding: 5px;
      }
    }
    .box2 {
      padding: 10px;
      button {
        margin: 10px 0;
      }
    }
  }
}
</style>
