<template>
    <el-row :gutter="0" style="margin-top: 1.5rem;">
        <el-col class="cms-list-view" :span="24">
            <el-col :xl="{span:2}" :lg="{span:3}" :md="{span:3}" :sm="{span:4}" class="hidden-xs-only">
                <!--                侧边栏组件-->
                <div class="panel panel-default is-always-shadow" style="border: none;">
                    <div class="panel-heading">
                        <!--            父栏目名称-->
                        <div class="panel-title cms-not-copy">搜索结果</div>
                    </div>
                </div>
            </el-col>
            <el-col :xl="{span:20}" :lg="{span:20}" :md="{span:19}" :sm="{span:19}">
                <!--                列表组件，根据不同类型应用不同的列表组件-->
                <el-card>
                    <div slot="header" class="cms-not-copy cms-table-header">
                        <span class="cms-not-copy cms-table-title"><i class="el-icon-search"></i>&nbsp;'{{keyword}}' 的搜索结果共有 {{totalElements}} 条</span>
                    </div>
                    <el-table class="cms-select-news cms-not-copy" stripe :data="newsList"
                              @row-click="lookArticle" style="cursor: pointer;">
                        <el-table-column label="新闻标题" prop="newsTitle">
                        </el-table-column>
                        <el-table-column label="新闻类型">
                            <template slot-scope="scope">
                                <template v-for="item in scope.row.newsTypeSet">
                                    <span :key="item.id">{{item.name}}&nbsp;</span>
                                </template>
                            </template>
                        </el-table-column>
                        <el-table-column label="发布时间" align="right">
                            <template slot-scope="scope">
                                <span>{{ scope.row.publishTime}}&nbsp;</span>
                                <i class="el-icon-arrow-right"></i>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-card>
                <el-col :span="24" style="display: flex;justify-content: center;padding: 1rem 0;">
                    <el-pagination
                            :current-page="1"
                            background
                            layout="prev, pager, next, total"
                            :hide-on-single-page="true"
                            :total="totalElements" @size-change="sizeChange" @current-change="currentChange">
                    </el-pagination>
                </el-col>
            </el-col>
        </el-col>
    </el-row>
</template>

<script>
    import store from "../store";
    import {Pagination} from  "element-ui"
    export default {
        name: "Search",
        store,
        data() {
            return {
                newsList: [],
                page:1,
                keyword:"",
                totalElements:0
            }
        },
        components:{
            [Pagination.name]:Pagination
        },
        methods: {
            checkUrl() {
                //得到请求的参数
                return this.$route.query.keyword;
            },
            init() {//初始化columns
                let keyword = this.checkUrl();//得到栏目
                if (keyword) {//如果有,则赋值
                    this.keyword = keyword;
                    this.initSearchResult();
                } else {//没有参数，跳转回主页
                    this.$router.push({path: '/'});
                }
            },
            initSearchResult(){
                this.$API.searchNewsByNewsTitle(this.keyword,this.page).then(res => {
                    window.console.log(res)
                    if(res.data.success){
                        this.newsList = res.data.queryResult.list;//列表数据
                        this.totalElements = res.data.queryResult.total;
                    }
                })
            },
            lookArticle(row) {
                let routeUrl = this.$router.resolve({
                    path: "/article",
                    query: {id: row.newsId}
                });
                window.open(routeUrl.href, '_blank');
            },
            sizeChange() {

            },
            currentChange(currPage) {
                this.page = currPage;
                this.initSearchResult();
            }
        },
        created() {
            this.init();
        }
    }
</script>

<style scoped>
    .cms-list-view {
        display: flex;
        justify-content: space-around;
    }

    .panel {
        margin-bottom: 20px;
        border: 1px solid transparent;
        border-radius: 4px;
        -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, .05);
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

    .panel-default > .panel-heading {
        color: #333;
        background-color: #f5f5f5;
        border-color: #ddd;
    }

    .panel-title {
        margin-top: 0;
        margin-bottom: 0;
        font-size: 1rem;
        color: inherit;
    }

    .cms-table-header {
        padding: 0.5rem;
    }

    .cms-table-title {
        font-size: 1rem;
        font-weight: bold;
        color: #003674;
    }
</style>
