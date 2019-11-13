<template>
    <el-row :gutter="0">
        <el-col :md="19" :sm="18" :xs="17" class="panel panel-title cms-news-information-title">
            {{ListTitle}}
        </el-col>
        <router-link :to="ListUrl" target="_blank">
            <el-col :md="5" :sm="6" :xs="7" class="panel panel-title cms-news-information-title cms-more">
                <i class="el-icon-d-arrow-right"></i>
            </el-col>
        </router-link>

        <el-col :md="24" :sm="24" :xs="24" class="panel panel-body cms-news-information-bar">
            <template v-for="(item,index) in ListData">
                <el-col :md="24/OneShowInLine-1" :sm="24/OneShowInLine-1" :xs="24" :key="index" @click.native="lookArticle(item.articleId)" class="cms-news-information-tap">
                    <el-col :md="17" :sm="16" :xs="15" class="cms-news-build-title">
                        {{item.title}}
                    </el-col>
                    <el-col :md="7" :sm="8" :xs="9" class="cms-news-build-date">
                        {{item.createTime.split(" ")[0]}}
                    </el-col>
                </el-col>
            </template>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        name: "CmsDynamicList",
        props: {
            ListTitle: {//列表标题
                type: String,
            },
            ListUrl: {//列表'更多'跳转地址
                type: String,
            },
            ListData: {//列表数据
                type: Array,
            },
            OneShowInLine: {//一行显示多少条
                type: Number,
            }
        },
        methods: {
            lookArticle(articleId) {
                let routeUrl = this.$router.resolve({
                    path: "/article?" + articleId,
                });
                window.open(routeUrl.href, '_blank');
            }
        }
    }
</script>

<style scoped>
    .cms-news-information-title {
        box-shadow: none !important;
        border-bottom: #3184C3 solid 2px;
        color: #008836;
        font-size: 1rem !important;
        padding: 0.4rem 0;
        font-weight: bold;
    }

    .cms-more {
        padding: 0.4rem 2px 0.4rem 0;
        text-align: right;
        color: #F68428;
        font-size: 1rem !important;
        border-bottom: #3184C3 solid 2px;
    }

    a {
        text-decoration: none;
        color: inherit;
    }

    .cms-news-information-bar {
        display: flex;
        justify-content: space-around;
        flex-flow: wrap;
        padding: 1rem 0;
        border: none !important;
        box-shadow: none !important;
    }



    .cms-news-information-tap {
        font-size: 0.9rem;
        line-height: 2.5rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: #666666;
        padding-left: 4px;
        padding-right: 4px;
        cursor: pointer;
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
        background-color: #f0f0f0;
    }
</style>