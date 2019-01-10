import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
    state:{//定义数据
        cot:JSON.parse(localStorage.getItem('cot') || '[]')
    },
    mutations:{//定义操作方法
        addCount(state,goodsInf){
            var flag = false;
            state.cot.some(ltem =>{
                if(ltem.id==goodsInf.id){
                    ltem.count +=parseInt(goodsInf.count)
                    flag = true
                    return true
                }
            })
            if(!flag){
                state.cot.push(goodsInf)
            }
            localStorage.setItem('cot',JSON.stringify(state.cot))
        },
        updateCount(state,goodsInf){
            var flag = false;
            state.cot.some(ltem =>{
                if(ltem.id==goodsInf.id){
                    ltem.count = parseInt(goodsInf.count)
                    ltem.checked = goodsInf.checked
                    localStorage.setItem('cot',JSON.stringify(state.cot))
                    flag = true
                    return true
                }
            })
        },
        removeList(state,id){
            state.cot.some((ltem,index) =>{
                if(ltem.id == id){
                    state.cot.splice(index,1)
                    localStorage.setItem('cot',JSON.stringify(state.cot))
                    return true
                }
            })
        }
    },
    getters:{//定义修改后的方法(和过滤器一样)
        goodsCount(state){//获取总商品件数
            var counts = 0
            if(state.cot.length>=1){
                state.cot.forEach(element => {
                    counts +=parseInt(element.count)
                });
            }
            return counts
        },
        goodsId(state){//获取所有商品的id
            var Ids = []
            state.cot.forEach(ltem => {
                Ids.push(ltem.id)
            })
            return Ids.join(',')
        },
        goodsIdCount(state){//生成一个{id:count}样式的对象
            var obj ={}
            state.cot.forEach(ltem => {
                obj[ltem.id]=parseInt(ltem.count)
            })
            return obj
        },
        goodsIdSelection(state){//生成一个{id:checked}样式的对象
            var obj ={}
            state.cot.forEach(ltem => {
                obj[ltem.id]=ltem.checked
            })
            return obj
        }
    }
})