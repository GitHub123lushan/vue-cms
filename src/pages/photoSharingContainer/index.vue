<template>
  <div class="photoSharingContainer">
    <div class="tab" ref="tab">
      <ul class="tab_content" ref="tabWrapper">
        <li
          :class="['tab_item', xid==index?'active':'']"
          @click="getimageInfo(item.id,index)"
          v-for="(item,index) in itemList"
          ref="tabitem"
          :key="index"
        >{{item.title}}</li>
      </ul>
    </div>
    <div class="content">
      <ul>
        <li v-for="item in list" :key="item.id">
          <router-link :to='"/home/pictureDetails/"+item.id'>
            <img v-lazy="item.img_url">
            <div class="describe">
            <h3>{{item.title}}</h3>
            <span>{{item.zhaiyao}}</span>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import BScroll from "better-scroll";
export default {
  data() {
    return {
      xid: 0,
      itemList: [],
      list:[],
    };
  },
  created() {
    this.getItemList();
  },
  methods: {
    InitTabScroll() {
      let width = 0;
      for (let i = 0; i < this.itemList.length; i++) {
        width += this.$refs.tabitem[i].getBoundingClientRect().width; //getBoundingClientRect() 返回元素的大小及其相对于视口的位置
      }
      this.$refs.tabWrapper.style.width = width + "px";
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.tab, {
            startX: 0,
            click: true,
            scrollX: true,
            scrollY: false,
            eventPassthrough: "vertical"
          });
        } else {
          this.scroll.refresh();
        }
      });
    },
    getItemList() {
      this.$http.get("api/getimgcategory").then(res => {
        var abc = res.body.message;
        this.itemList = abc;
        abc.unshift({ id: 0, title: "全部" });
        this.$nextTick(() => {
          this.InitTabScroll();
          this.getimageInfo();
        });
      });
    },
    getimageInfo(id, index) {
      var id = id | 0;
      var index = index | 0;
      this.$http.get("api/getimages/" + id).then(res => {
        if (res.body.status === 0) {
          this.list = res.body.message;
        }
      });
      this.xid = index;
    }
  }
};
</script>
  <style lang="less" scoped>
.photoSharingContainer {
  .tab {
    width: 100vw;
    overflow: hidden;
    .tab_content {
      padding: 10px 0;
      overflow: hidden;
      .tab_item {
        text-align: center;
        font-size: 16px;
        float: left;
        padding: 0 20px;
      }
      .active {
        color: blue;
      }
    }
  }
  .content {
    li {
      background-color: #ccc;
      margin: 10px;
      position: relative;
      img {
        display: block;
        width: 100%;
        min-height: 3rem;
      }
      img[lazy="loading"] {
        width: .4rem;
        height: .4rem;
        margin: auto;
      }
      .describe {
        height: .8rem;
        position: absolute;
        bottom: 0;
        left: 0;
        color: #fff;
        background-color: rgba(0, 0, 0, 0.4);
        h3 {
          font-size: 16px;
          font-weight: 700;
        }
        span {
          display:-webkit-box;
          -webkit-box-orient:vertical;
          -webkit-line-clamp:2;
            overflow:hidden;
          font-size: 14px;
        }
      }
    }
  }
}
</style>
