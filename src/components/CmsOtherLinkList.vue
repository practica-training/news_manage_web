<template>
    <!--    指向第三方平台的列表-->
    <div>
        <div class="panel panel-title cms-news-information-title" style="padding: 0;">
            <span class="cms-main-footer-title">{{ListData.title}}</span>
        </div>
        <el-row :gutter="0">
            <el-col :span="24" class="panel panel-body cms-main-footer-bar">
                <template v-for="(item,index) in ListData.data">
                    <a target="_blank" :href="item.url" :key="index">
                        <el-col :md="24/ShowNmuberInLine" :sm="24/ShowNmuberInLine" :xs="24" class="cms-main-footer-tap">
                            <img class="cms-main-footer-tap-img" :src="item.src"/>
                            <span class="cms-main-footer-tap-title">{{item.title}}</span>
                        </el-col>
                    </a>
                </template>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import {Tabs, TabPane} from 'element-ui'

    export default {
        name: "CmsOtherLinkList",
        components: {
            [Tabs.name]: Tabs,
            [TabPane.name]: TabPane
        },
        props: {
            ListData: {//列表数据
                type: Object,
            },
            ShowNmuberInLine:{//一行显示多少条数据
                type:Number,
            }
        },
    }
</script>

<style scoped>
    .cms-news-information-title {
        box-shadow: none !important;
        border-bottom: #3184C3 solid 2px;
        color: #008836;
        font-size: 1rem !important;
        text-indent: 1em;
    }

    a{
        text-decoration: none;
        color: inherit;
    }

    /* 标题 */
    .cms-main-footer-title {
        display: inline-block;
        padding: 3px 1rem;
        font-size: 1rem;
        line-height: 2rem;
        color: #fefefe;
        background-color: #3184C3;
        text-indent: 0;
    }

    /* 学习资源和管理平台 */
    .cms-main-footer-bar {
        min-height: 12rem;
        padding: 0 1rem;
    }

    /* 内容 */
    .cms-main-footer-tap {
        margin: 0.4rem 0;
        font-size: 0.6rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: #666666;
        padding: 0.5rem;
        cursor: pointer;
    }

    .cms-main-footer-tap-img {
        height: 1rem;
        width: 1rem;
    }

    .cms-main-footer-tap-title{
        font-size: 0.9rem;
        padding-left: 4px;
    }

    .cms-main-footer-tap:hover {
        background-color: #f0f0f0;
    }
</style>