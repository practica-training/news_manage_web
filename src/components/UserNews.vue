<template>
    <el-col :span="24">
        <template v-if="true || userInfo.userState == 2">
            <el-col :lg="2" :md="3" :sm="4" :xs="5" style="height: 100vh;">
                <el-tabs :tab-position="position" class="user-news-tabs" style="height: 100%;" @tab-click="clickNewsTab">
                    <el-tab-pane name="0" label="草稿"></el-tab-pane>
                    <el-tab-pane name="1" label="审核中"></el-tab-pane>
                    <el-tab-pane name="2" label="审核失败"></el-tab-pane>
                    <el-tab-pane name="3" label="已发布"></el-tab-pane>
                    <el-tab-pane name="-3" label="已下架"></el-tab-pane>
                    <el-tab-pane name="-2" label="违规删除"></el-tab-pane>
                </el-tabs>
            </el-col>
            <el-col :lg="22" :md="21" :sm="20" :xs="19">
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
                            <span>{{scope.row.createTime.slice(0,scope.row.createTime.indexOf("日") + 1)}}&nbsp;</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="发布时间">
                        <template slot-scope="scope">
                            <span>{{scope.row.publishTime.slice(0,scope.row.publishTime.indexOf("日") + 1)}}&nbsp;</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="newsState" :formatter="formatNewsState" label="状态">
                    </el-table-column>
                    <el-table-column
                            label="操作"
                            fixed="right">
                        <template slot-scope="scope">
                            <div v-if="scope.row.newsState != 1 && scope.row.newsState != -1 && scope.row.newsState != 2 && scope.row.newsState != -3">
                                <el-button
                                        v-if="scope.row.newsState == 0"
                                        @click.stop="editNews(scope.row)"
                                        type="warning"
                                        size="small">
                                    编辑
                                </el-button>
                                <el-button
                                        v-if="scope.row.newsState == 0"
                                        @click.native.prevent="publishNews(scope.row)"
                                        type="primary"
                                        size="small">
                                    审核发布
                                </el-button>
                                <el-button
                                        v-if="scope.row.newsState == 3"
                                        @click.native.prevent="deleteNews(scope.row)"
                                        type="danger"
                                        size="small">
                                    下架
                                </el-button>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
            <edit-news :drawer-title="editNewsTitle" :is-show="showUpdateNewsDrawer" @closeEditNews="closeEditNewsDrawer"></edit-news>
        </template>
        <template>
            <div class="cms-user-no-message">
                请先申请成为新闻发布者
            </div>
        </template>
    </el-col>
</template>

<script>
    import store from '../store'
    import {Tabs,TabPane,Table,TableColumn,Button} from "element-ui"
    import EditNews from "./EditNews";
    export default {
        name: "UserNews",
        store,
        components:{
            EditNews,
            [Tabs.name]:Tabs,
            [TabPane.name]:TabPane,
            [Table.name]:Table,
            [TableColumn.name]:TableColumn,
            [Button.name]:Button
        },
        data(){
            return{
                userInfo:store.state.userInfo,
                position:"left",
                list:[
                    {
                        newsId: "1234567890",
                        newsTitle: "富阿虎家具店哦啊",
                        publishTime: "2019年12月29日",
                        createTime: "2019年12月27日",
                        newsState: 0
                    },
                    {
                        newsId:"1234567890",
                        newsTitle:"富阿虎家具店哦啊",
                        publishTime:"2019年12月29日",
                        createTime:"2019年12月27日",
                        newsState: 1
                    },
                    {
                        newsId:"1234567890",
                        newsTitle:"富阿虎家具店哦啊",
                        publishTime:"2019年12月29日",
                        createTime:"2019年12月27日",
                        newsState: 2,
                        failureReason:"含有违规内容"
                    },
                    {
                        newsId:"1234567890",
                        newsTitle:"富阿虎家具店哦啊",
                        publishTime:"2019年12月29日",
                        createTime:"2019年12月27日",
                        newsState: 3
                    },
                    {
                        newsId:"1234567890",
                        newsTitle:"富阿虎家具店哦啊",
                        publishTime:"2019年12月29日",
                        createTime:"2019年12月27日",
                        newsState: -2
                    },
                    {
                        newsId:"1234567890",
                        newsTitle:"富阿虎家具店哦啊",
                        publishTime:"2019年12月29日",
                        createTime:"2019年12月27日",
                        newsState: -3
                    }
                ],
                showUpdateNewsDrawer:false,
                editNewsTitle:"新建新闻",
            }
        },
        methods:{
            clickNewsTab(tab){
              window.console.log(tab.name)
            },
            formatTitle(row) {
                return row.newsTitle;
            },
            formatNewsState(row){
                let newsState = row.newsState;
                let result = "";
                //0草稿 1审核中 2审核失败 3已发布 -1已删除 -2违规 -3下架
                switch (newsState) {
                    case 0:{
                        result = "草稿";
                        break;
                    }
                    case 1:{
                        result = "审核中";
                        break;
                    }
                    case 2:{
                        result = "审核失败";
                        break;
                    }
                    case 3:{
                        result = "已发布";
                        break;
                    }
                    case -1:{
                        result = "已删除";
                        break;
                    }
                    case -2:{
                        result = "违规删除";
                        break;
                    }
                    case -3:{
                        result = "下架";
                        break;
                    }
                    default:{
                        result ="";
                        break;
                    }
                }
                return result;
            },
            //查看新闻
            lookArticle(row) {
                let routeUrl = this.$router.resolve({
                    path: "/article",
                    query: {id: row.newsId}
                });
                window.open(routeUrl.href);
            },
            //编辑新闻
            editNews(row){
                this.showUpdateNewsDrawer = true;
                if(row){//是编辑新闻
                    this.editNewsTitle = "编辑新闻"
                }else{//是新建新闻
                    this.editNewsTitle = "新建新闻"
                }
            },
            closeEditNewsDrawer(){
                this.showUpdateNewsDrawer = false;
            },
            //发布新闻
            publishNews(row){
            },
            //下架新闻
            deleteNews(row){
            },
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
