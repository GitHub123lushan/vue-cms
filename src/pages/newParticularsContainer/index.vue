<template>
    <div class="newParticulars">
        <h1>{{particularsData.title}}</h1>
        <p>
            <span>发表时间:{{particularsData.add_time | timeFiltration}}</span>
            <span>点击:{{particularsData.click}}</span>    
        </p>
        <hr>
        <div class="content" v-html="particularsData.content">

        </div>
        <comment_box :id="id"></comment_box>
    </div>

</template>

<script>
export default {
    data(){
        return{
            particularsData:{},
            id:this.$route.params.id,
        }
    },
    created(){
        this.getParticulars()
    },
    methods: {
        getParticulars() {
            this.$http.get("api/getnew/" + this.id).then(res=>{
                this.particularsData=res.body.message[0]
            })
            
        }
    },
}
</script>

<style lang="less">
    .newParticulars{
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
        .content{
            img{
                width: 100%;
            }
        }
    }
</style>
