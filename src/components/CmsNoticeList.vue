<template>
<!--    通告公示组件-->
    <el-row :gutter="0">
        <el-col :md="18" :sm="19" :xs="17" class="panel panel-title cms-news-information-title">
            {{NoticeTitle}}
        </el-col>
        <router-link :to="NoticeUrl" target="_blank">
            <el-col :md="5" :sm="5" :xs="7" class="panel panel-title cms-news-information-title cms-more">
                <i class="el-icon-more"></i>
            </el-col>
        </router-link>
        <el-col :md="22" :sm="24" :xs="24" class="panel panel-body cms-news-information-notice">
            <el-col :md="24" :sm="24" :xs="24" v-for="(item,index) in NoticeList" :key="index"
                    class="cms-notice-tap" @click.native="lookArticle(item.newsId)">
                <el-col v-if="!TimeRight" :md="6" :sm="7" :xs="8" class="cms-notice-tap-date-box">
                    <div class="cms-notice-tap-date-day">{{item.publishTime.slice(item.publishTime.indexOf("月")+1,item.publishTime.indexOf("日"))}}</div>
                    <div class="cms-notice-tap-date-other">{{item.publishTime.slice(0,item.publishTime.indexOf("月") + 1)}}
                    </div>
                </el-col>
                <el-col :md="18" :sm="17" :xs="16" class="cms-notice-tap-info-box">{{item.newsTitle}}</el-col>
                <el-col v-if="TimeRight" :md="6" :sm="7" :xs="8" class="cms-notice-tap-date-box">
                    <div class="cms-notice-tap-date-day">{{item.publishTime.slice(item.publishTime.indexOf("月")+1,item.publishTime.indexOf("日"))}}</div>
                    <div class="cms-notice-tap-date-other">{{item.publishTime.slice(0,item.publishTime.indexOf("月") + 1)}}
                    </div>
                </el-col>
            </el-col>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        name: "CmsNotice",
        props: {
            NoticeList: {//列表
                type: Array,
            },
            NoticeTitle: {//标题
                type: String,
            },
            NoticeUrl:{//'更多'的链接
                type:String,
            },
            TimeRight:{//时间显示在右边吗
                type:Boolean
            }
        },
        methods: {
            lookArticle(articleId) {
                let routeUrl = this.$router.resolve({
                    path: "/article",
                    query:{
                        id:articleId
                    },
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
        color: #3184C3;
        font-size: 1rem !important;
        padding: 0.4rem 0;
        font-weight: bold;
    }

    .cms-more {
        padding: 0.4rem 0.5rem 0.4rem 0;
        text-align: right;
        color: #409EFF;
        font-size: 1rem !important;
        border-bottom: #3184C3 solid 2px;
    }

    /* 通告公示 */
    .cms-news-information-notice {
        padding-top: 0px;
        padding-left: 5px;
        margin: 1rem 0;
        background-color: #fbfbfb;
    }

    /* 通告公示条 */
    .cms-notice-tap {
        padding-top: 10px;
        padding-left: 0px;
        min-height: 5rem;
        cursor: pointer;
        border-bottom: 1px solid #999999;
    }


    .cms-notice-tap:last-child {
        padding-top: 10px;
        padding-left: 0px;
        min-height: 5rem;
        border-bottom: none;
    }

    /* 奇数的样式 */
    .cms-notice-tap:nth-child(odd)>.cms-notice-tap-date-box>.cms-notice-tap-date-day {
        height: 2rem;
        width: 100%;
        font-size: 0.8rem;
        line-height: 2rem;
        background-color: #F68428;
        color: #fefefe;
        text-align: center;
    }

    /* 偶数的样式 */
    .cms-notice-tap:nth-child(even)>.cms-notice-tap-date-box>.cms-notice-tap-date-day {
        height: 2rem;
        width: 100%;
        font-size: 0.8rem;
        line-height: 2rem;
        background-color: #3184C3;
        color: #fefefe;
        text-align: center;
    }

    /* 日期盒子 */
    .cms-notice-tap-date-box {
        padding: 0;
        height: 70px;
    }

    /* 月份和年 */
    .cms-notice-tap-date-other {
        height: 2rem;
        width: 100%;
        font-size: 0.8rem;
        line-height: 2rem;
        background-color: #fefefe;
        color: #666666;
        text-align: center;
    }

    /* 标题 */
    .cms-notice-tap-info-box {
        overflow: hidden;
        padding: 0rem 1.1rem;
        height: 4rem;
        font-size: 0.9rem;
        color: #3184C3;
        text-align: left;
    }
</style>
