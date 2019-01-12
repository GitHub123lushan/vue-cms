<template>
  <div class="searchContaniner">
    <img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3896639434,2608684613&fm=26&gp=0.jpg" alt="" style="width:100%" v-if="flag">
    <ul class="search-list">
      <li v-for="(ltem,index) in getshopcarlist" :key="ltem.id">
        <mt-switch v-model="ltem.checked" @change="goodsUpdate(index,{id:ltem.id,count:parseInt(ltem.count),checked:ltem.checked})"></mt-switch>
        <img src="http://www.lovegf.cn:8899/xm1.jpg" alt>
        <div class="info">
          <h3> {{ltem.title}} </h3>
          <div class="count">
            <span>¥ {{ltem.sell_price}} </span>
            <mt-button size="small" @click="reduce(index,{id:ltem.id,count:parseInt(ltem.count-1),checked:ltem.checked})">-</mt-button>
            <input type="text" v-model="ltem.count" @change="goodsUpdate(index,{id:ltem.id,count:ltem.count})">
            <mt-button size="small" @click="goodsAdd(index,{id:ltem.id,count:parseInt(ltem.count)+1,checked:ltem.checked})">+</mt-button>
            <a @click.prevent="goodsRemove(ltem.id,index)">删除</a>
          </div>
        </div>
      </li>
    </ul>
    <div class="settlement">
        <div class="and">
            <p>总计(不含运费)</p>
            <p>已勾选商品 <span> {{statisticalMoney.and}} </span> 件, 总价 <span>¥ {{statisticalMoney.money}} </span> </p>
        </div>
        <mt-button type="danger">去结算</mt-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      quantity: 1,
      getshopcarlist:[],
      flag:false
    };
  },
  methods:{
      getGoods(){//获取商品列表
      if(this.$store.getters.goodsId){
          this.$http.get('api/goods/getshopcarlist/'+this.$store.getters.goodsId).then(res => {
            if(res.body.status==0){
                this.getshopcarlist = res.body.message
                this.getshopcarlist.forEach(ltem => {
                    ltem.count = parseInt(this.$store.getters.goodsIdCount[ltem.id])
                    ltem.checked = this.$store.getters.goodsIdSelection[ltem.id]
                })
            }
        })
      }else{
        this.flag=true
      }
      },
      goodsAdd(index,data){
     
          this.getshopcarlist[index].count++
          this.$set(this.getshopcarlist,index,this.getshopcarlist[index])
          this.goodsUpdate(index,data)
      },
        reduce(index,data){
            if(data.count>=1){
       
          this.getshopcarlist[index].count--
          this.$set(this.getshopcarlist,index,this.getshopcarlist[index])
          this.goodsUpdate(index,data)
            }
            
      },
      goodsUpdate(index,data){
          if(data.count<1){
              data.count=1
            this.getshopcarlist[index].count=1
          }
          this.$set(this.getshopcarlist,index,this.getshopcarlist[index])
          this.$store.commit("updateCount",data)
      },
      goodsRemove(id,index){
          this.getshopcarlist.splice(index,1)
          this.$store.commit('removeList',id)
          
      }
  },
  created(){
      this.getGoods()
  },
  computed:{
    statisticalMoney(){
          if(this.getshopcarlist.length>=0){
              var o={
                and:0,
                money:0
              }
              this.getshopcarlist.forEach(item =>{
                   if(item.checked){
                    o.and +=item.count
                    o.money +=item.count*item.sell_price
                   }
              })
          }
          return o
      }
  }
};
</script>

<style lang="less" scoped>
.searchContaniner {
       padding: 10px;
    background-color: #eee;
  .search-list {
    li {
        margin-bottom: 0.1rem;
      display: flex;
      background-color: #fff;
      align-items: center;
      width: 100%;
      padding: 15px;
      box-sizing: border-box;
      img {
        width: 0.6rem;
      }
      .info {
           display: flex;
            justify-content: space-between;
            flex-flow: column;
          font-size: 0.13rem;
          h3{
              font-weight: 700;
          }
        .count {
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
          span{
              font-size: 0.13rem;
              font-weight: 700;
              color: red;
          }
          a{
              text-decoration:none;
          }
        }
      }
    }
  }
  .settlement{
      box-sizing: border-box;
      width: 100%;
      padding: 0.15rem;
      background-color: #fff;
      display: flex;
      align-items: center;
      justify-content: space-between;
    .and{
        font-size: 0.14rem;
        color: #808080;  
         display: flex;
        flex-flow: column;
         justify-content: space-between;
        span{
            font-size: 0.16rem;
            color: red;
            font-weight: 700;
        }
    }
  }
}
</style>
