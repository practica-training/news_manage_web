<template>
    <!--    普通列表组件-->
    <div>
        <el-card>
            <div slot="header" class="cms-not-copy cms-table-header">
                <span class="cms-not-copy cms-table-title" v-show="TapTitle"><i class="el-icon-collection-tag"></i>&nbsp;{{TapTitle}}新闻</span>
            </div>
            <keep-alive>
                <el-table row-class-name="cms-table-line" class="cms-select-news cms-not-copy" stripe
                          :show-header="false" :data="newsList" @row-click="lookArticle" style="cursor: pointer;"
                          :fit="true">
                    <el-table-column prop="title" :formatter="formatTitle">
                    </el-table-column>
                    <el-table-column align="right">
                        <template slot-scope="scope">
                            <span>{{scope.row.publishTime.slice(0,scope.row.publishTime.indexOf("日") + 1)}}&nbsp;</span>
                            <i class="el-icon-arrow-right"></i>
                        </template>
                    </el-table-column>
                </el-table>
            </keep-alive>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "CmsDefaultList",
        data() {
            return {
                loadingInstance: "",
                newsList: []
            }
        },
        props: {
            TableData: {
                type: Array,
            },
            TapTitle:{
                type: String,
            },
        },
        watch: {
            '$route'() {
                this.loadingInstance = this.$loading();
            },
            TableData(newVal) {
                this.newsList = newVal;
                this.$nextTick(() => {// 以服务的方式调用的 Loading 需要异步关闭
                    setTimeout(() => {//设置定时器，为了看上去不像闪屏
                        this.loadingInstance.close();
                    }, 200);
                });
            }
        },
        methods: {
            formatTitle(row) {
                return row.newsTitle;
            },
            lookArticle(row) {
                let routeUrl = this.$router.resolve({
                    path: "/article",
                    query: {id: row.newsId}
                });
                window.open(routeUrl.href);
            }
        },
        created() {
            this.loadingInstance = this.$loading();
        },
        mounted() {
            setTimeout(() => {//设置定时器，为了看上去不像闪屏
                this.loadingInstance.close();
            }, 200);
        }
    }
</script>

<style>
    .cms-select-news {
        overflow: hidden;
        font-size: 1rem;
    }
</style>
