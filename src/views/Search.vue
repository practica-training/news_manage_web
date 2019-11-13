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
                        <span class="cms-not-copy cms-table-title" v-show="searchResultTitle"><i class="el-icon-search"></i>&nbsp;{{searchResultTitle}}</span>
                    </div>
                    <el-table class="cms-select-news cms-not-copy" stripe :show-header="false" :data="newsList"
                              @row-click="lookArticle" style="cursor: pointer;">
                        <el-table-column prop="title">
                        </el-table-column>
                        <el-table-column align="right">
                            <template slot-scope="scope">
                                <span>{{ scope.row.createTime.split(' ')[0] }}&nbsp;</span>
                                <i class="el-icon-arrow-right"></i>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-card>
            </el-col>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        name: "Search",
        data() {
            return {
                searchResultTitle: "",
                newsList: [],
            }
        },
        methods: {
            checkUrl() {
                //得到请求的参数
                let tempJson = this.$route.query;
                //遍历得到要获取的columns
                let quesion = "";
                for (let key in tempJson) {
                    if (key) {
                        quesion = tempJson[key];
                        break;
                    }
                }
                return quesion;
            },
            async init() {//初始化columns
                let quesion = this.checkUrl();//得到栏目
                if (quesion) {//如果有,则赋值
                    let url = this.$cmsInterface.DgutGetSearch.url + "?keyword=" + quesion;
                    await this.$Get(url).then(res => {
                        if (res.code == 0) {
                            this.newsList = res.data.content;
                            this.searchResultTitle = "'" + quesion + "' 的搜索结果有" + this.newsList.length + "条";
                        }
                    })
                } else {//没有参数，跳转回主页
                    this.$router.push({path: '/'});
                }
            },
            lookArticle(row) {
                this.$router.push({path: '/article?' + row.articleId});
                // let routeUrl = this.$router.resolve({
                //     path: "/article?" + row.articleId,
                // });
                // window.open(routeUrl.href, '_blank');
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