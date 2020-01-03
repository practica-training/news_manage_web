<template>
    <el-col :span="24">
        <template v-if="true || userInfo.userState == 2">
            <el-col :lg="2" :md="3" :sm="4" :xs="5" style="height: 100vh;">
                <el-tabs :tab-position="position" class="user-news-tabs" style="height: 100%;"
                         @tab-click="clickNewsTab">
                    <el-tab-pane name="0" label="草稿"></el-tab-pane>
                    <el-tab-pane name="1" label="审核中"></el-tab-pane>
                    <el-tab-pane name="2" label="审核失败"></el-tab-pane>
                    <el-tab-pane name="3" label="已发布"></el-tab-pane>
                    <el-tab-pane name="-3" label="已下架"></el-tab-pane>
                    <el-tab-pane name="-2" label="违规删除"></el-tab-pane>
                </el-tabs>
            </el-col>
            <el-col :lg="22" :md="21" :sm="20" :xs="19" style="height:76vh;overflow-y: scroll;">
                <el-col :span="24" style="text-align: right;">
                    <el-button plain round @click="editNews">新建新闻</el-button>
                </el-col>
                <el-table row-class-name="cms-table-line" class="cms-select-news cms-not-copy" stripe
                          :data="list" @row-click="lookArticle" style="cursor: pointer;"
                          :fit="true">
                    <el-table-column
                            type="index"
                            width="50">
                    </el-table-column>
                    <el-table-column prop="title" :formatter="formatTitle" label="标题">
                    </el-table-column>
                    <el-table-column label="创建时间">
                        <template slot-scope="scope">
                            <span>{{scope.row.createTime}}&nbsp;</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="发布时间">
                        <template slot-scope="scope">
                            <span v-if="scope.row.publishTime">{{scope.row.publishTime}}&nbsp;</span>
                            <span v-else>未发布</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="newsState" :formatter="formatNewsState" label="状态">
                    </el-table-column>
                    <el-table-column
                            label="操作"
                            fixed="right">
                        <template slot-scope="scope">
                            <div v-if="scope.row.state != 1 && scope.row.state != -1 && scope.row.state != -3">
                                <el-button
                                        v-if="scope.row.state == 0 || scope.row.state == 2"
                                        @click.stop="editNews(scope.row)"
                                        type="warning"
                                        size="small">
                                    编辑
                                </el-button>
                                <el-button
                                        v-if="scope.row.state == 0 || scope.row.state == 2"
                                        @click.stop="publishNews(scope.row)"
                                        type="primary"
                                        size="small">
                                    审核发布
                                </el-button>
                                <el-button
                                        v-if="scope.row.state == 3"
                                        @click.stop="deleteNews(scope.row)"
                                        type="danger"
                                        size="small">
                                    下架
                                </el-button>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
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
            <edit-news :drawer-title="editNewsTitle" :is-show="showUpdateNewsDrawer" :News="currEditNews"
                       @closeEditNews="closeEditNewsDrawer" @updateNews="updateNewsInfo"></edit-news>
        </template>
        <template v-else>
            <div class="cms-user-no-message">
                请先申请成为新闻发布者
            </div>
        </template>
    </el-col>
</template>

<script>
    import store from '../store'
    import {Tabs, TabPane, Table, TableColumn, Button ,Pagination} from "element-ui"
    import EditNews from "./EditNews";

    export default {
        name: "UserNews",
        store,
        components: {
            EditNews,
            [Tabs.name]: Tabs,
            [TabPane.name]: TabPane,
            [Table.name]: Table,
            [TableColumn.name]: TableColumn,
            [Button.name]: Button,
            [Pagination.name]:Pagination
        },
        data() {
            return {
                userInfo: store.state.userInfo,
                position: "left",
                list: [],
                showUpdateNewsDrawer: false,
                editNewsTitle: "新建新闻",
                currEditNews: {},
                page: 1,
                newsState: 0,
                totalElements:0,
            }
        },
        methods: {
            clickNewsTab(tab) {
                this.newsState = tab.name;
                this.page = 1;
                this.initNewsList();
            },
            formatTitle(row) {
                return row.newsTitle;
            },
            formatNewsState(row) {
                let newsState = row.newsState;
                let result = "";
                //0草稿 1审核中 2审核失败 3已发布 -1已删除 -2违规 -3下架
                switch (newsState) {
                    case 0: {
                        result = "草稿";
                        break;
                    }
                    case 1: {
                        result = "审核中";
                        break;
                    }
                    case 2: {
                        result = "审核失败";
                        break;
                    }
                    case 3: {
                        result = "已发布";
                        break;
                    }
                    case -1: {
                        result = "已删除";
                        break;
                    }
                    case -2: {
                        result = "违规删除";
                        break;
                    }
                    case -3: {
                        result = "下架";
                        break;
                    }
                    default: {
                        result = "";
                        break;
                    }
                }
                return result;
            },
            //初始化新闻
            initNewsList() {
                let loading = this.$loading();
                this.$API.getNewsByState(this.page, this.newsState).then(res => {
                    loading.close();
                    if (res.data.success) {
                        this.list = res.data.queryResult.list;
                        this.totalElements = res.data.queryResult.total;
                        window.console.log(this.list)
                    }else{
                        this.$message.error("获取失败,请稍后重试");
                    }
                }).catch(()=>{
                    loading.close();
                    this.$message.error("发生意外错误,获取失败");
                })
            },
            //查看新闻
            lookArticle(row) {
                if(row.state == 3){
                    let routeUrl = this.$router.resolve({
                        path: "/article",
                        query: {id: row.newsId}
                    });
                    window.open(routeUrl.href);
                }
            },
            //编辑新闻
            editNews(row) {
                this.showUpdateNewsDrawer = true;
                if (row && row.newsId) {//是编辑新闻
                    this.editNewsTitle = "编辑新闻";
                    this.currEditNews = row;
                } else {//是新建新闻
                    this.editNewsTitle = "新建新闻"
                }
            },
            //监听子组件更新新闻
            updateNewsInfo(news) {
                if (news.newsId) {//如果有id,则是新建了新闻
                    this.currEditNews = news;
                } else {//否则是更新了新闻
                    this.currEditNews.newsTitle = news.newsTitle;
                    this.currEditNews.newsAvatar = news.newsAvatar;
                    this.currEditNews.content = news.content;
                    this.currEditNews.newsTypeSet = news.newsTypes;
                }
            },
            closeEditNewsDrawer() {
                this.showUpdateNewsDrawer = false;
            },
            //发布新闻
            publishNews(row) {
                let loading = this.$loading();
                this.$API.updateNews(row.newsId, row.newsTitle, row.newsAvatar, row.content, 1).then(res => {
                    if(res.data.success){
                        this.$message.success("已提交审核,通过审核将自动发布");
                        this.initNewsList();
                    }else{
                        this.$message.error("操作失败,请刷新重试");
                    }
                    loading.close();
                }).catch(() => {
                    loading.close();
                })
            },
            //下架新闻
            deleteNews(row) {
                let loading = this.$loading();
                this.$API.updateNews(row.newsId, row.newsTitle, row.newsAvatar, row.content, -3).then(res => {
                    loading.close();
                    if(res.data.success){
                        this.$message.success("已下架");
                        this.initNewsList();
                    }else{
                        this.$message.error("操作失败,请刷新重试");
                    }
                }).catch(() => {
                    loading.close();
                })
            },
            sizeChange() {

            },
            currentChange(currPage) {
                this.page = currPage;
                this.initNewsList();
            }
        },
        created() {
            this.initNewsList();
        }
    }
</script>

<style scoped>
    .cms-user-no-message {
        width: 100%;
        text-align: center;
        color: #999999;
        font-size: 1rem;
        padding-top: 1.5rem;
    }
</style>
