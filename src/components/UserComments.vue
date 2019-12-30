<template>
    <el-col :span="24">
        <el-col :lg="2" :md="3" :sm="4" :xs="5" style="height: 100vh;">
            <el-tabs v-model="index" :tab-position="position" class="user-news-tabs" style="height: 100%;" @tab-click="clickNewsTab">
                <el-tab-pane name="0" label="我的"></el-tab-pane>
                <el-tab-pane name="1" label="回复我的"></el-tab-pane>
            </el-tabs>
        </el-col>
        <el-col :lg="22" :md="21" :sm="20" :xs="19">
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
                        <span class="cms-comment-replay" v-if="scope.row.user && scope.row.user.id">{{scope.row.user.userNickname}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="内容" :class-name="'cms-text-overflow'">
                    <template slot-scope="scope">
                        <span class="cms-comment-replay" v-if="index == 0 && scope.row.replyUser && scope.row.replyUser.id">@{{scope.row.replyUser.userNickname}}&nbsp;&nbsp;</span>
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
        </el-col>
    </el-col>
</template>

<script>
    import {Table, Button, TableColumn, Tabs, TabPane} from "element-ui";

    export default {
        name: "UserComments",
        components: {
            [Tabs.name]: Tabs,
            [TabPane.name]: TabPane,
            [Table.name]: Table,
            [TableColumn.name]: TableColumn,
            [Button.name]: Button
        },
        data() {
            return {
                position: "left",
                index:"0",
                list: [
                    {
                        id: "111111",
                        user:{
                            id:"123456",
                            userNickname:"他"
                        },
                        newsId: "1234567890",
                        commentContent: "真棒",
                        commentTime: "2019年12月29日",
                        replyUser:{
                            id:"123456",
                            userNickname:"他"
                        }
                    },
                    {
                        id: "111111",
                        user:{
                            id:"123456",
                            userNickname:"她"
                        },
                        newsId: "1234567890",
                        commentContent: "真棒",
                        commentTime: "2019年12月29日",
                    },
                    {
                        id: "111111",
                        user:{
                            id:"123456",
                            userNickname:"你"
                        },
                        newsId: "1234567890",
                        commentContent: "真棒",
                        commentTime: "2019年12月29日",
                    },
                ]
            }
        },
        methods: {
            clickNewsTab(tab) {
                window.console.log(this.index)
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
                window.console.log(row)
            },
        }
    }
</script>

<style scoped>

</style>
