<template>
    <div class="comment-container">
        <h3>发表评论</h3>
        <hr />
        <mt-field placeholder="请输入评论类容" type="textarea" rows="4" v-model="introduction" class="textarea"></mt-field>
        <mt-button type="primary" size="large" @click="Publish()">发表评论</mt-button>
        <ul class="list">
            <li v-for="(litm,index) in data" :key="index">
                <p>第{{index+1}}楼 用户名:{{litm.user_name}} 发表时间:{{litm.add_time | timeFiltration}}</p>
                <p>{{litm.content}}</p>
            </li>
        </ul>
        <mt-button danger size="large" @click="loadMore()">加载更多</mt-button>
    </div>
</template>

<script>

export default {
    data(){
        return{
            introduction:"",
            pageindex:1,
            data:[]
        }
    },
    props:['id'],
    methods:{
        getComment(){
            this.$http.get('api/getcomments/'+this.id+'?pageindex='+this.pageindex).then(res=>{
                console.log(res.body.message);
                if(res.body.status===0){
                    // this.data=res.body.message
                    this.data.push.apply(this.data,res.body.message)
                }
            })
        },
        loadMore(){
            this.pageindex++
            this.getComment()
        },
        Publish(){
            this.$http.post('api/postcomment/'+this.id,{content:this.introduction}).then(res=>{
               if(res.body.status===0){
                   this.data=[]
                   this.pageindex = 1
                   this.getComment()
                    this.$toast('提示信息') 
                   this.introduction=""
               }else{
                   
               }
                
            })
        }
    },
    created(){

        this.getComment()
    }
}
</script>

<style lang="less">
    .comment-container{
        h3{
            font-weight: 700;
        }
        .textarea{
            border: 1px solid #ccc;
        }
        .mint-button--large{
            margin: 10px 0;
        }
        .list{
            li{
                p{
                    height: 30px;
                    line-height: 30px;
                }
                p:first-of-type{
                    background-color: #ccc;
                }
                p:last-of-type{
                    text-indent: 2em;
                }
            }
        }
    }
</style>
