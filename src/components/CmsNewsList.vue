<template>
    <!--    主页的新闻动态组件-->
    <el-row :gutter="0">
        <el-col :span="24"
                class="panel panel-title cms-news-information-title cms-news-bg cms-not-copy">
            <span><i class="el-icon-s-home"></i>&nbsp;{{ListTitle}}</span>
            <router-link :to="ListUrl" target="_blank"><span class="cms-more-icon" style="float: right;"><i
                    class="el-icon-more"></i></span></router-link>
        </el-col>
        <el-col :span="24">
            <div class="cms-triangle"></div>
        </el-col>
        <el-col :md="24" :sm="24" :xs="24" class="panel panel-body cms-news-information-bar">
            <el-timeline class="col-time-line cms-not-copy">
                <el-timeline-item v-for="(item,index) in ListData" color="#155799"
                                  :timestamp="item.createTime.split(' ')[0]" placement="top" :key="index">
                    <div class="cms-card cms-not-copy" @click="lookArticle(item.articleId)">{{item.title}}</div>
                </el-timeline-item>
            </el-timeline>
        </el-col>
    </el-row>
</template>

<script>
    import {Timeline, TimelineItem} from 'element-ui'

    export default {
        name: "CmsNewsList",
        components: {
            [Timeline.name]: Timeline,
            [TimelineItem.name]: TimelineItem
        },
        props: {
            ListData: {//列表
                type: Array,
            },
            ListTitle: {//标题
                type: String,
            },
            ListUrl: {//'更多'的链接
                type: String,
            }
        },
        methods: {
            lookArticle(articleId) {
                let routeUrl = this.$router.resolve({
                    path: "/article",
                    query:{
                        id:articleId
                    }
                });
                window.open(routeUrl.href, '_blank');
            }
        }
    }
</script>

<style scoped>
    .cms-news-information-title {
        box-shadow: none !important;
        font-size: 0.97rem !important;
        letter-spacing: 1px;
        font-weight: bold;
        padding: 0.5rem;
    }

    .cms-news-bg {
        background-color: #1d6296;
        color: #FFFFFF;
        border-top-left-radius: 6px;
        border-top-right-radius: 6px;
    }

    .cms-more-icon {
        font-size: 1rem;
    }

    a {
        text-decoration: none;
        color: inherit;
    }

    .cms-triangle {
        width: 0;
        height: 0;
        border-width: 0.6rem;
        position: relative;
        left: 1rem;
        border-style: solid;
        border-color: #1d6296 transparent transparent transparent;
    }

    .cms-news-information-bar {
        display: flex;
        /*justify-content: space-around;*/
        flex-flow: wrap;
        padding: 1rem 0;
        border: none !important;
        box-shadow: none !important;
    }

    .col-time-line {
        padding: 0 !important;
        width: 100%;
    }

    .cms-card {
        padding: 0.5rem 0 !important;
        background-color: #f0f0f0;
        width: 100%;
        font-size: 0.8rem;
        text-indent: 1em;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        cursor: pointer;
    }

    .cms-card:hover {
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
    }
</style>
