<template>
    <div class="commodityList">
        <ul class="dataList">
            <li v-for="(item, index) in commodityData" :key="index" @click="productDetails(item.id)">
                <div>
                    <img :src="item.img_url" alt="">
                    <h3>{{item.title}}</h3>
                </div>
                <div class="Price">
                    <p>
                    <span>¥ {{item.sell_price}} </span>
                    <del>¥{{item.market_price}}</del>
                </p>
                <p>
                    <span>热卖</span>
                    <span>剩余 {{item.stock_quantity}} 件</span>
                </p>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data(){
        return{
            commodityData:[],
            pageindex:1
        }
    },
    methods: {
        getCommodityData(){
            this.$http.get('api/getgoods?pageindex='+this.pageindex).then(res =>{
                if(res.body.status===0){
                    this.commodityData=res.body.message
                }
            })
        },
        productDetails(id){
            this.$router.push({name:'productDetails',params:{id:id}})
        }
    },
    created(){
        this.getCommodityData()
    }
}
</script>

<style lang="less" scoped>
    .commodityList{
        .dataList{
            display: flex;
            justify-content: space-between;
            flex-flow: wrap;
            padding: 10px;
            li{
                display: flex;
                flex-flow: column;
                justify-content: space-between;
                width: 48%;
                margin-bottom: 4%;
                box-shadow: 0 0 8px #ccc;
                h3{
                    font-size: 14px;
                    font-weight: 700;
                }
                img{
                    width: 100%;
                    min-height: 200px;
                }
                .Price{
                    background-color: #eee;
                    color: #808080;
                    p{
                        padding: 5px;
                    }
                    p:first-of-type {
                        span{
                            font-weight: 700;
                            color: red;
                            font-size: 14px;
                            margin-right:5px; 
                        }
                        del{
                            font-size: 12px;
                        }
                    }
                    p:last-of-type{
                        display: flex;
                        justify-content: space-between;
                        font-size: 14px;
                    }
                }
            }
        }
    }
</style>
