<template>
    <div class="pictureDetails">
        <h1>{{particularsData.title}}</h1>
        <p>
            <span>发表时间:{{particularsData.add_time | timeFiltration}}</span>
            <span>点击:{{particularsData.click}}</span>    
        </p>
        <hr>
        <ul class="imgList">
            <li v-for="(item, index) in imgList" :key="index">
                <img v-preview="item.src" preview-nav-enable="true" preview-title-enable="true" :src="item.src" alt="">
            </li>
        </ul>
        <div v-html="particularsData.content" class="content">
        </div>
        <comment_box :id="imgid"></comment_box>
        <lg-preview></lg-preview>
    </div>
</template>

<script>
export default {
    data(){
        return{
            imgid:this.$route.params.id,
            particularsData:{},
            imgList:[]
        }
    },
    methods:{
        PictureDetails(){
            this.$http.get('api/getimageInfo/'+this.imgid).then(res=>{
                if(res.body.status===0){
                    this.particularsData = res.body.message[0]
                }
            })
            this.$http.get('api/getthumimages/'+this.imgid).then(res=>{
                if(res.body.status===0){
                    this.imgList = res.body.message
                }
            })
        }
    },
    created(){
        this.PictureDetails()
    }
}
</script>

<style lang="less" scoped>
    .pictureDetails{
        padding: 0 5px;
        h1{
            text-align: center;
            font-weight: 700;
            font-size: 16px;
            color: red;
            padding:10px 0;
        }
        p{
            display: flex;
            font-size: 14px;
            color: royalblue;
            justify-content: space-between;
        }
        .imgList{
            padding: 10px;
            display: flex;
            justify-content: space-between;
            flex-wrap:wrap;
            li{
                width: 48%;
                margin-bottom: 10px;
                img{
                    display: block;
                    width: 100%;
                    max-height: 120px;
                    box-shadow: 0 0 8px #000;
                }
            }
        }
        .content{
            font-size: 14px;
            text-indent: 2rem;
            line-height: 24px;
        }
    }
</style>
