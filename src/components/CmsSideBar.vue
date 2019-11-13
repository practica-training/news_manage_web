<template>
<!--    侧边栏组件-->
    <div class="panel panel-default is-always-shadow" style="border: none;">
        <div class="panel-heading">
<!--            父栏目名称-->
            <div v-if="hasColumns" class="panel-title cms-not-copy">{{currColumn.columnName}}</div>
            <div v-else class="panel-title cms-not-copy">暂无内容</div>
        </div>
        <div v-if="hasColumns" class="panel-body" style="padding: 0;">
<!--            渲染子栏目-->
            <ul v-for="(item,index) in currColumn.columns" :key="index" class="cms-ul list-group">
                <li @click="changeTap(item.cid,item.list)" class="list-group-item" :class="item.cid==CurrCid?'cms-bg-select':''">
                    {{item.columnName}}<i class="el-icon-arrow-right"></i>
                </li>
            </ul>
        </div>
        <div v-else class="panel-body" style="padding: 0;">
            <!--            渲染子栏目-->
            <ul class="cms-ul list-group">
                <li @click="goBackHome" class="list-group-item">
                    回到首页
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "CmsSideBar",
        data(){
            return{
                currColumn:{},//当前栏目
            }
        },
        props:{
            CmsColumns:{//所有栏目
              type:Array
            },
            CurrCid:{//当前栏目的cid
                type:String
            },
            hasColumns:{//是否有栏目,比如没有文章时，就显示返回首页
                type:Boolean,
                default:true
            }
        },
        watch:{
            CmsColumns(){//监听
                this.initSideBar();//如果有新的值传进来则重新初始化
            },
            CurrCid(){//监听当前栏目cid
                this.initSideBar();//如果有新的值传进来则重新初始化
            }
        },
        methods:{
            changeTap(cid){
                this.$router.push({path:'/list?' + cid});
            },
            goBackHome(){//回到首页
                this.$router.push({path:'/'});
            },
            initSideBar(){//初始化侧边栏
                var arr = this.CmsColumns;
                if(arr.length == 0){
                    return;
                }else{//获取当前栏目的父栏目
                    var findIt = false;
                    for(var index in arr){
                        var childArr = arr[index].columns;
                        for(var j in childArr){
                            if(childArr[j].cid == this.CurrCid){//如果就是这个栏目了
                                findIt = true;//跳出循环
                                break;
                            }
                        }
                        if(findIt){//如果已经找到了,则退出循环
                            this.currColumn = arr[index];
                            break;
                        }
                    }
                }
            }
        },
        created() {
            this.initSideBar();
        }
    }
</script>

<style scoped>
    .panel{
        margin-bottom: 20px;
        border: 1px solid transparent;
        border-radius: 4px;
        -webkit-box-shadow: 0 1px 1px rgba(0,0,0,.05);
        background-color: initial;
        box-shadow: none;
    }

    .panel-default {
        border-color: #ddd;
    }

    .panel-heading {
        padding: 10px 15px;
        border-bottom: 1px solid transparent;
        border-top-left-radius: 3px;
        border-top-right-radius: 3px;
    }

    .panel-default>.panel-heading {
        color: #333;
        background-color: #f5f5f5;
        border-color: #ddd;
    }

    .panel-title {
        margin-top: 0;
        margin-bottom: 0;
        font-size: 16px;
        color: inherit;
    }

    .panel-body:after, .panel-body:before{
        display: table;
        content: " ";
    }

    .panel-body:after{
        clear: both;
    }

    ul{
        display: block;
        margin: 0;
    }

    li{
        text-align: -webkit-match-parent;
    }

    ul, li {
        list-style: none;
    }

    .list-group {
        padding-left: 0;
    }

    .list-group-item {
        position: relative;
        display: block;
        padding: 0.7rem;
        margin-bottom: -1px;
        background-color: #fff;
        border: 1px solid #ddd;
        font-size: 0.9rem;
    }

    .list-group-item:hover{
        transition: 0.5s;
        background: rgb(10, 16, 84); /* fallback for old browsers */
        background: -webkit-linear-gradient(to right, #155799, rgb(10, 16, 84)); /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to right, #155799, rgb(10, 16, 84)); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
        color: #f0f0f0;
    }

    .cms-bg-select{
        background: rgb(10, 16, 84); /* fallback for old browsers */
        background: -webkit-linear-gradient(to right, #155799, rgb(10, 16, 84)); /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to right, #155799, rgb(10, 16, 84)); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
        color: #f0f0f0;
    }

    .cms-ul>li {
        cursor: pointer;
        -moz-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
        -khtml-user-select: none;
        -o-user-select: none;
        user-select: none;
    }

    .list-group-item:first-child {
    }
</style>