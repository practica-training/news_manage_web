<template>
    <el-row :gutter="0" style="margin-top: 1.5rem;">
        <el-col class="cms-list-view" :span="24">
            <el-col :xl="{span:2}" :lg="{span:3}" :md="{span:3}" :sm="{span:4}" class="hidden-xs-only">
                <!--                侧边栏组件-->
                <div class="panel panel-default is-always-shadow" style="border: none;">
                    <div class="panel-heading">
                        <!--            父栏目名称-->
                        <div class="panel-title cms-not-copy">&nbsp;</div>
                    </div>
                    <div class="panel-body" style="padding: 0;">
                        <!--            渲染子栏目-->
                        <ul v-for="(item,index) in elseColumn.columns" :key="index" class="cms-ul list-group">
                            <li @click="changeTap(item.cid,item.list)" class="list-group-item"
                                :class="item.cid==currCid?'cms-bg-select':''">
                                {{item.columnName}}<i class="el-icon-arrow-right"></i>
                            </li>
                        </ul>
                    </div>
                </div>
            </el-col>
            <el-col :xl="{span:20}" :lg="{span:20}" :md="{span:19}" :sm="{span:19}">
                <!--                列表组件，根据不同类型应用不同的列表组件-->
                <el-card>
                    <div slot="header" class="cms-not-copy cms-table-header">
                        <span class="cms-not-copy cms-table-title" v-show="title"><i class="el-icon-info"></i>&nbsp;{{title}}</span>
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
                <div v-show="paginationShow" style="display: flex;justify-content: center;padding: 2rem;">
                    <el-pagination
                            :current-page="1"
                            background
                            layout="prev, pager, next, total"
                            :total="totalElements" @size-change="sizeChange" @current-change="currentChange">
                    </el-pagination>
                </div>
            </el-col>
        </el-col>
    </el-row>
</template>

<script>
    import {Pagination} from 'element-ui'
    export default {
        name: "ElseList",
        components:{
            [Pagination.name]:Pagination
        },
        data() {
            return {
                currCid:"",
                loadingInstance:null,
                elseColumn: {
                    columnName:"",
                    columns: [
                        {
                            cid: "1",
                            columnName: "学院要闻",
                            list: true,
                        },
                        {
                            cid: "2",
                            columnName:"学院通知",
                            list:true,
                        }
                    ]
                },
                title: "",
                newsList:[],
                paginationShow:true,//是否显示分页组件
                totalElements: 0,//列表数据的总数量
            }
        },
        watch:{
            '$route'() {
                this.loadingInstance = this.$loading();
                this.init();
            }
        },
        methods: {
            checkUrl() {
                //得到请求的参数
                let tempJson = this.$route.query;
                //遍历得到要获取的columns
                let columns = "";
                for (let key in tempJson) {
                    if (key) {
                        columns = key;
                        break;
                    }
                }
                return columns;
            },
            async init(page) {//初始化columns
                let columns = this.checkUrl();//得到栏目
                if(columns){//如果有
                    this.currCid = columns;
                    let url = "";
                    if (columns == "1") {//如果有,则赋值
                        //如果是1,则是新闻动态,否则是通告公示
                        url = this.$cmsInterface.DgutGetNewsList.url;
                    }else{
                        url = this.$cmsInterface.DgutGetNoticeList.url;
                    }
                    url = url + "?size=10&page=" + page;
                    this.title = this.elseColumn.columns[parseInt(columns)-1].columnName;
                    await this.$Get(url).then(res => {
                        if (res.code == 0) {
                            this.newsList = res.data.content;
                            this.totalElements = res.data.totalElements;
                        }
                    })
                    this.$nextTick(() => {// 以服务的方式调用的 Loading 需要异步关闭
                        setTimeout(() => {//设置定时器，为了看上去不像闪屏
                            this.loadingInstance.close();
                        }, 200);
                    });
                } else {//没有参数，跳转回主页
                    this.$router.push({path: '/'});
                }
            },
            changeTap(cid){
                this.$router.push({path:'?' + cid});
            },
            lookArticle(row) {
                this.$router.push({path: '/article?' + row.articleId});
                // let routeUrl = this.$router.resolve({
                //     path: "/article?" + row.articleId,
                // });
                // window.open(routeUrl.href, '_blank');
            },
            sizeChange() {

            },
            currentChange(currPage) {
                this.init(currPage - 1);
            }
        },
        created() {
            this.loadingInstance = this.$loading();
            this.init(0);
        }
    }
</script>

<style scoped>
    .cms-list-view {
        display: flex;
        justify-content: space-around;
    }

    .cms-table-header {
        padding: 0.5rem;
    }

    .cms-table-title {
        font-size: 1rem;
        font-weight: bold;
        color: #003674;
    }
    .panel{
        margin-bottom: 20px;
        border: 1px solid transparent;
        border-radius: 4px;
        -webkit-box-shadow: 0 1px 1px rgba(0,0,0,.05);
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

    .panel-default>.panel-heading {
        color: #333;
        background-color: #f5f5f5;
        border-color: #ddd;
    }

    .panel-title {
        margin-top: 0;
        margin-bottom: 0;
        font-size: 16px;
        color: inherit;
    }

    .panel-body:after, .panel-body:before{
        display: table;
        content: " ";
    }

    .panel-body:after{
        clear: both;
    }

    ul{
        display: block;
        margin: 0;
    }

    li{
        text-align: -webkit-match-parent;
    }

    ul, li {
        list-style: none;
    }

    .list-group {
        padding-left: 0;
    }

    .list-group-item {
        position: relative;
        display: block;
        padding: 0.7rem;
        margin-bottom: -1px;
        background-color: #fff;
        border: 1px solid #ddd;
        font-size: 0.9rem;
    }

    .cms-ul>li {
        cursor: pointer;
        -moz-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
        -khtml-user-select: none;
        -o-user-select: none;
        user-select: none;
    }

    .list-group-item:hover{
        transition: 0.5s;
        background: rgb(10, 16, 84); /* fallback for old browsers */
        background: -webkit-linear-gradient(to right, #155799, rgb(10, 16, 84)); /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to right, #155799, rgb(10, 16, 84)); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
        color: #f0f0f0;
    }

    .cms-bg-select{
        background: rgb(10, 16, 84); /* fallback for old browsers */
        background: -webkit-linear-gradient(to right, #155799, rgb(10, 16, 84)); /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to right, #155799, rgb(10, 16, 84)); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
        color: #f0f0f0;
    }
</style>