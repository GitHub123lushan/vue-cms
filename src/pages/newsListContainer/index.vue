<template>
    <div class="news-list-container">
        <ul>
             <router-link v-for="ltem in listData" :key="ltem.id" :to="'/home/newParticulars/'+ltem.id" tag="li">
                <img :src="ltem.img_url" alt="">
                <div class="news-content">
                    <h1>{{ltem.title}}</h1>
                    <p>
                    <span>发布时间:{{ltem.add_time | timeFiltration }}</span>
                    <span>点击 {{ltem.click}} 次</span>
                    </p>
                </div>
            </router-link>
        </ul>
    </div>
</template>

<script>
export default {
    data(){
        return{
            listData:[],
        }
    },
    methods:{
        getListData(){
            this.$http.get('api/getnewslist').then(res=>{
                this.listData=res.body.message
            })
        }
    },
    created(){
        this.getListData()
    }
}
</script>

<style lang="less" scoped>
    .news-list-container{
        padding-left: 5px;
        li{
            padding:5px 0;
            position: relative;
            height: 40px;
            border-bottom: 2px solid #ccc;
            img{
                position: absolute;
                width: 30px;
                height: 30px;
                padding: 5px 0;
            }
            .news-content{
                padding-left: 40px;
                h1{
                    font-weight: 700;
                    font-size: 14px;
                }
                p{
                    font-size: 12px;
                    display: flex;
                    color: #bbbddd;
                    padding-right: 10px;
                    justify-content: space-between;
                }
            }
        }
    }
</style>
