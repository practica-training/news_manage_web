<template>
    <el-row :gutter="0">
        <el-col :md="24" :sm="24" :xs="24">
            <el-tabs v-model="currTab" @tab-click="handleClick">
                <el-tab-pane name="0" tab-position="left">
                    <div class="cms-tab-title" :class="{'cms-tab-title-active':(currTab == '0')}" slot="label"><span style="font-size: 1.3rem;color: #e4e7ed;">|</span>&nbsp;{{ListTitle1}}<span class="cms-tab-title-more" @click="ToMore(ListUrl1)">更多<i class="el-icon-d-arrow-right"></i></span></div>
                    <template v-for="(item,index) in ListData1">
                        <el-col :md="24/OneShowInLine-1" :sm="24/OneShowInLine-1" :xs="24" :key="index" @click.native="lookArticle(item.articleId)" class="cms-news-information-tap">
                            <el-col :md="17" :sm="16" :xs="15" class="cms-news-build-title">
                                {{item.title}}
                            </el-col>
                            <el-col :md="7" :sm="8" :xs="9" class="cms-news-build-date">
                                {{item.createTime.split(" ")[0]}}
                            </el-col>
                        </el-col>
                    </template>
                    <template v-if="ListData1.length == 0">
                        <el-col :md="24" :sm="24" :xs="24" class="cms-news-information-tap">
                            <div class="cms-not-copy" style="font-size:0.9rem;text-align: center;">暂无数据</div>
                        </el-col>
                    </template>
                </el-tab-pane>
                <el-tab-pane name="1" tab-position="right">
                    <div class="cms-tab-title" :class="{'cms-tab-title-active':(currTab == '1')}" slot="label"><span style="font-size: 1.3rem;color: #e4e7ed;">|</span>&nbsp;{{ListTitle2}} <span class="cms-tab-title-more" @click="ToMore(ListUrl2)">更多<i class="el-icon-d-arrow-right"></i></span></div>
                    <template v-for="(item,index) in ListData2">
                        <el-col :md="24/OneShowInLine-1" :sm="24/OneShowInLine-1" :xs="24" :key="index" @click.native="lookArticle(item.articleId)" class="cms-news-information-tap">
                            <el-col :md="17" :sm="16" :xs="15" class="cms-news-build-title">
                                {{item.title}}
                            </el-col>
                            <el-col :md="7" :sm="8" :xs="9" class="cms-news-build-date">
                                {{item.createTime.split(" ")[0]}}
                            </el-col>
                        </el-col>
                    </template>
                    <template v-if="ListData2.length == 0">
                        <el-col :md="24" :sm="24" :xs="24" class="cms-news-information-tap">
                            <div class="cms-not-copy" style="font-size:0.9rem;text-align: center;">暂无数据</div>
                        </el-col>
                    </template>
                </el-tab-pane>
            </el-tabs>

        </el-col>
    </el-row>
</template>

<script>
    import {Tabs,TabPane} from 'element-ui'
    export default {
        name: "CmsTapsList",
        components:{
          [Tabs.name]:Tabs,
          [TabPane.name]:TabPane
        },
        props:{
            ListUrl1: {//列表'更多'跳转地址
                type: String,
            },
            ListUrl2: {//列表'更多'跳转地址
                type: String,
            },
            ListData1: {//列表数据
                type: Array,
            },
            ListData2: {//列表数据
                type: Array,
            },
            ListTitle1: {//列表标题
                type: String,
            },
            ListTitle2: {//列表标题
                type: String,
            },
            OneShowInLine: {//一行显示多少条
                type: Number,
            }
        },
        data(){
            return{
                currTab:"0",
                timeInterval:"",
            }
        },
        watch:{
            ListData1(newVal){
                if(newVal.length == 0){
                    this.currTab = "1";
                    clearInterval(this.timeInterval);
                }
            },
            ListData2(newVal){
                if(newVal.length == 0){
                    this.currTab = "0";
                    clearInterval(this.timeInterval);
                }
            }
        },
        methods:{
            changeTab(){
               this.currTab = (this.currTab == "0" ? "1" : "0");
            },
            handleClick(){
            },
            ToMore(url){
                let routeUrl = this.$router.resolve({
                    path: url,
                });
                window.open(routeUrl.href, '_blank');
            },
            lookArticle(articleId) {
                let routeUrl = this.$router.resolve({
                    path: "/article?" + articleId,
                });
                window.open(routeUrl.href, '_blank');
            }
        },
        mounted() {
            let that = this;
            this.timeInterval = setInterval(function () {
                that.changeTab();
            },15000);
        }
    }
</script>

<style scoped>
    .cms-tab-title {
        color: #999999;
        font-size: 1rem !important;
        font-weight: bold;
    }

    .cms-tab-title:active{
        color: #409EFF;
    }

    .cms-tab-title:hover{
        color: #409EFF;
    }

    .cms-tab-title-active{
        color: #409EFF;
    }

    .cms-tab-title-more{
        font-size: 0.8rem;
        float: right;
        position: relative;
        bottom: -4px;
    }

    .cms-news-information-tap {
        font-size: 0.9rem;
        line-height: 2.5rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: #666666;
        padding-left: 8px;
        padding-right: 4px;
        cursor: pointer;
    }

    .cms-news-information-tap:nth-child(odd){
        background-color: rgb(245,245,245);
    }

    .cms-news-build-title{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .cms-news-build-date{
        text-align: right;
    }

    .cms-news-information-tap:hover {
        background-color: #f9f9f9;
        box-shadow: 3px 0px 0px #409EFF inset, 0 0 3px #999999;
    }
</style>