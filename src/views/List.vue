<template>
    <!--    列表，根据不同类型应用不同的列表组件-->
    <el-row :gutter="0" style="padding-top: 1.5rem;">
        <el-col class="cms-list-view" :span="24">
            <el-col :xl="{span:2}" :lg="{span:3}" :md="{span:3}" :sm="{span:4}" class="hidden-xs-only">
                <!--                侧边栏组件-->
                <cms-side-bar :cms-columns="cmsColumns" :curr-cid="columns"></cms-side-bar>
            </el-col>
            <el-col :xl="{span:20}" :lg="{span:20}" :md="{span:19}" :sm="{span:19}">
                <!--                列表组件，根据不同类型应用不同的列表组件-->
                <cms-special-list v-if="isSpecialList" :special-list-id="specialListId"></cms-special-list>
                <component v-else :is="componentName" :table-data="cmsTableData"></component>

                <div v-show="paginationShow" style="display: flex;justify-content: center;padding: 2rem;">
                    <el-pagination
                            :current-page="1"
                            background
                            layout="prev, pager, next, total"
                            :hide-on-single-page="true"
                            :total="totalElements" @size-change="sizeChange" @current-change="currentChange">
                    </el-pagination>
                </div>
            </el-col>
        </el-col>
    </el-row>
</template>

<script>
    import store from '../store'
    //导入侧边栏组件
    import CmsSideBar from "../components/CmsSideBar";
    //导入普通列表组件
    import CmsDefaultList from "../components/CmsDefaultList";
    //导入特殊列表组件(比如人才培养方案、教学大纲等)
    import CmsSpecialList from "../components/CmsSpecialList";
    //导入教师列表组件
    import CmsTeacherList from "../components/CmsTeacherList";
    //分页组件
    import {Pagination} from 'element-ui'

    export default {
        name: "List",
        store,
        data() {
            return {
                columns: "",//当前cid
                componentName: "CmsDefaultList",//默认普通列表组件
                cmsTableData: {},//列表数据对象
                cmsGetTableDataURL: "",//获取列表数据的URL
                isSpecialList: false,//是否是特殊的列表组件（人才培养方案或者教学大纲）
                specialListId: "",//特殊组件的id，0是教学大纲,1人才培养方案
                paginationShow:true,//是否显示分页组件
                totalElements: 0,//列表数据的总数量
            }
        },
        components: {
            CmsSideBar,//侧边栏组件
            CmsDefaultList,//普通列表组件
            CmsSpecialList,//特殊列表组件
            CmsTeacherList,//教师列表组件
            [Pagination.name]:Pagination
        },
        watch: {
            '$route'() {
                this.initColumns();
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
            initColumns() {//初始化columns
                let columns = this.checkUrl();//得到栏目
                if (columns) {//如果有,则赋值
                    this.columns = columns;
                    switch (parseInt(columns)) {
                        case 14:
                        case 15:
                        case 43:
                        case 46:
                        case 47: {
                            this.componentName = "CmsTeacherList";
                            this.isSpecialList = false;
                            this.cmsGetTableDataURL = this.$cmsInterface.DgutGetTeacherListByBranch.url;
                            break;
                        }
                        case 19: {
                            this.componentName = "CmsSpecialList";
                            this.isSpecialList = true;
                            this.specialListId = 0;
                            this.cmsGetTableDataURL = this.$cmsInterface.DgutGetNewsListByColumns.url;
                            break;
                        }
                        case 63: {
                            this.componentName = "CmsSpecialList";
                            this.isSpecialList = true;
                            this.specialListId = 1;
                            this.cmsGetTableDataURL = this.$cmsInterface.DgutGetNewsListByColumns.url;
                            break;
                        }
                        default: {
                            this.componentName = "CmsDefaultList";
                            this.isSpecialList = false;
                            this.cmsGetTableDataURL = this.$cmsInterface.DgutGetNewsListByColumns.url;
                            break;
                        }
                    }
                    this.initTableData(0);
                } else {//没有参数，跳转回主页
                    this.$router.push({path: '/'});
                }
            },
            initTableData(page) {
                if (this.isSpecialList) {//如果是特殊列表
                    this.paginationShow = false;
                } else {
                    let url = this.cmsGetTableDataURL;
                    if (url.indexOf('$columns') != -1) {//如果参数是$columns,则是获取新闻列表
                        this.paginationShow = true;
                        url = url.replace("$columns", this.columns);
                    } else {//否则是获取教师列表的
                        this.paginationShow = false;
                        url = url.replace("$branch", this.columns);
                    }
                    url = url + "?page=" + page;
                    this.$Get(url).then(res=>{
                        this.totalElements = res.data.totalElements;//总数
                        this.cmsTableData = res.data;//列表数据
                    })
                }
            },
            sizeChange() {

            },
            currentChange(currPage) {
                this.initTableData(currPage - 1);
            }
        },
        computed: {
            cmsColumns() {
                return store.state.cmsColumns;
            }
        },
        created() {
            this.initColumns();
        }
    }
</script>

<style scoped>
    .cms-list-view {
        display: flex;
        justify-content: space-around;
    }
</style>