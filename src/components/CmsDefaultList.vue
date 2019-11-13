<template>
    <!--    普通列表组件-->
    <div>
        <el-card>
            <div slot="header" class="cms-not-copy cms-table-header">
                <span class="cms-not-copy cms-table-title" v-show="tapTitle"><i class="el-icon-collection-tag"></i>&nbsp;{{tapTitle}}</span>
            </div>
            <keep-alive>
                <el-table row-class-name="cms-table-line" class="cms-select-news cms-not-copy" stripe
                          :show-header="false" :data="newsList" @row-click="lookArticle" style="cursor: pointer;" :fit="true">
                    <el-table-column prop="title" :formatter="formatTitle">
                    </el-table-column>
                    <el-table-column align="right">
                        <template slot-scope="scope">
                            <span>{{scope.row.createTime.split(' ')[0]}}&nbsp;</span>
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
                newsList: [],
                tapTitle: "",
            }
        },
        props: {
            TableData: {
                type: Object,
            }
        },
        watch: {
            '$route'() {
                this.loadingInstance = this.$loading();
            },
            TableData(newVal) {
                if (newVal.content) {
                    this.newsList = newVal.content;
                    if (this.newsList.length > 0) {
                        this.tapTitle = this.newsList[0].columns.columnName;
                    } else {
                        this.tapTitle = "当前栏目暂无数据";
                    }
                    this.$nextTick(() => {// 以服务的方式调用的 Loading 需要异步关闭
                        setTimeout(() => {//设置定时器，为了看上去不像闪屏
                            this.loadingInstance.close();
                        }, 200);
                    });
                }
            }
        },
        methods: {
            formatTitle(row) {
                if (row.title) {//如果文章有标题，则不用修改
                    return row.title;
                } else {//没有标题则用栏目名称代替
                    return row.columns.columnName;
                }
            },
            lookArticle(row) {
                this.$router.push({path: '/article?' + row.articleId});
                // let routeUrl = this.$router.resolve({
                //     path: "/article?" + row.articleId,
                // });
                // window.open(routeUrl.href);
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