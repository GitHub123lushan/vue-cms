<template>
    <div class="ProductDescription">
        <h3> {{dataGetdesc.title}} </h3>
        <div v-html="dataGetdesc.content" class="content"></div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            id:this.$route.params.id,
            dataGetdesc:{}
        }
    },
    methods:{
        getGetdesc(){
            this.$http.get('api/goods/getdesc/'+this.id).then(reslut => {
                if(reslut.body.status===0){
                    this.dataGetdesc = reslut.body.message[0]
                }
                console.log(reslut.body)
            })
        }
    },
    created(){
        this.getGetdesc()
    }
}
</script>

<style lang="less">
    .ProductDescription{
        h3{
            padding: 10px;
            border-bottom: 1px solid #ccc;
            text-align: center;
            font-size: 16px;
            color: red;
            font-weight: 700;
        }
        .content{
            padding: 10px;
            font-size: 14px;
            p{  
                text-indent: 2em;
            }
            img{
                    display: block;
                    width: 80vw;
                }
        }
    }
</style>
