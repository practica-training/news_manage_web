<template>
    <el-col :span="24">
        <el-col :lg="2" :md="3" :sm="4" :xs="5" style="height: 100vh;">
            <el-tabs v-model="index" :tab-position="position" class="user-news-tabs" style="height: 100%;" @tab-click="clickNewsTab">
                <el-tab-pane name="0" label="我的"></el-tab-pane>
                <el-tab-pane name="1" label="回复我的"></el-tab-pane>
            </el-tabs>
        </el-col>
        <el-col :lg="22" :md="21" :sm="20" :xs="19" style="height: 76vh;overflow-y: scroll;">
            <el-table row-class-name="cms-table-line" class="cms-select-news cms-not-copy" stripe
                      :data="list" style="cursor: pointer;"
                      :fit="true">
                <el-table-column label="评论时间" width="200">
                    <template slot-scope="scope">
                        <span>{{scope.row.commentTime.slice(0,scope.row.commentTime.indexOf("日") + 1)}}&nbsp;</span>
                    </template>
                </el-table-column>
                <el-table-column v-if="index == 1" label="@我的用户" :class-name="'cms-text-overflow'">
                    <template slot-scope="scope">
                        <span class="cms-comment-replay" v-if="scope.row.userId">{{scope.row.userNickname}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="内容" :class-name="'cms-text-overflow'">
                    <template slot-scope="scope">
                        <span class="cms-comment-replay" v-if="index == 0 && scope.row.replyUserId">@{{scope.row.replyUserNickname}}&nbsp;&nbsp;</span>
                        <span>{{scope.row.commentContent}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="操作"
                        fixed="right" width="300">
                    <template slot-scope="scope">
                        <el-button
                                @click.native.prevent="lookArticle(scope.row)"
                                type="primary"
                                size="small">
                            查看
                        </el-button>
                        <el-button
                                v-if="index == 0"
                                @click.native.prevent="deleteComment(scope.row)"
                                type="danger"
                                size="small">
                            删除评论
                        </el-button>
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
    </el-col>
</template>

<script>
    import {Table, Button, TableColumn, Tabs, TabPane,Pagination} from "element-ui";

    export default {
        name: "UserComments",
        components: {
            [Tabs.name]: Tabs,
            [TabPane.name]: TabPane,
            [Table.name]: Table,
            [TableColumn.name]: TableColumn,
            [Button.name]: Button,
            [Pagination.name]:Pagination
        },
        data() {
            return {
                position: "left",
                index:"0",
                page:1,
                list: [],
                totalElements:0,
            }
        },
        methods: {
            initComment(){
                let loading = this.$loading();
                if(this.index == 0){//如果是当前用户发的
                    this.$API.getCommentsByCurrUser(this.page).then(res=>{
                        loading.close();
                        if(res.data.success){
                            this.list = res.data.queryResult.list;
                            this.totalElements = res.data.queryResult.total;
                        }
                    }).catch(()=>{
                        loading.close();
                    })
                }else{
                    this.$API.getCommentsToCurrUser(this.page).then(res=>{
                        loading.close();
                        if(res.data.success){
                            this.list = res.data.queryResult.list;
                            this.totalElements = res.data.queryResult.total;
                        }
                    }).catch(()=>{
                        loading.close();
                    })
                }
            },
            clickNewsTab() {
                this.page = 1;//重新初始化页码
                this.initComment();
            },
            //查看新闻
            lookArticle(row) {
                let routeUrl = this.$router.resolve({
                    path: "/article",
                    query: {id: row.newsId}
                });
                window.open(routeUrl.href);
            },
            //删除评论
            deleteComment(row) {
                if(window.confirm("确认要删除该评论吗")){
                    this.$API.deleteComment(row.id).then(res=>{
                        window.console.log(res);
                        if(res.data.success){
                            this.$message.success("删除成功");
                            this.page = 1;
                            this.initComment();
                        }
                    })
                }
            },
            sizeChange() {

            },
            currentChange(currPage) {
                this.page = currPage;
                this.initComment();
            }
        },
        created() {
            this.initComment();
        }
    }
</script>

<style scoped>

</style>
