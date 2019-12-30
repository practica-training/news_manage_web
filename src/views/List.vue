<template>
    <!--    列表，根据不同类型应用不同的列表组件-->
    <el-row :gutter="0" style="padding-top: 1.5rem;">
        <el-col class="cms-list-view" :span="24">
            <el-col :xl="{span:20}" :lg="{span:20}" :md="{span:19}" :sm="{span:19}">
                <!--                列表组件，根据不同类型应用不同的列表组件-->
                <cms-default-list :table-data="cmsTableData" :tap-title="tapTitle"></cms-default-list>
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
    //导入普通列表组件
    import CmsDefaultList from "../components/CmsDefaultList";
    //分页组件
    import {Pagination} from 'element-ui'

    export default {
        name: "List",
        store,
        data() {
            return {
                columns: "",//当前id
                componentName: "CmsDefaultList",//默认普通列表组件
                cmsTableData: [],//列表数据对象
                cmsGetTableDataURL: "",//获取列表数据的URL
                isSpecialList: false,//是否是特殊的列表组件（人才培养方案或者教学大纲）
                specialListId: "",//特殊组件的id，0是教学大纲,1人才培养方案
                paginationShow: true,//是否显示分页组件
                totalElements: 0,//列表数据的总数量
                tapTitle:"",
            }
        },
        components: {
            CmsDefaultList,//普通列表组件
            [Pagination.name]: Pagination
        },
        watch: {
            '$route'() {
                this.initColumns();
            }
        },
        methods: {
            initColumns() {//初始化columns
                let columns = this.$route.query.id;//得到id
                let name = this.$route.query.name;//得到id
                if (columns && name) {//如果有,则赋值
                    this.columns = columns;
                    this.tapTitle = name;
                    this.componentName = "CmsDefaultList";
                    this.isSpecialList = false;
                    this.initTableData(1);
                } else {//没有参数，跳转回主页
                    this.$router.push({path: '/'});
                }
            },
            initTableData(page) {
                this.$API.getNewsByTypeId(this.columns, page).then(res => {
                    window.console.log(res.data);
                    if (res.data.success) {
                        this.cmsTableData = res.data.queryResult.list;//列表数据
                        this.totalElements = res.data.queryResult.total;
                    }
                })
            },
            sizeChange() {

            },
            currentChange(currPage) {
                this.initTableData(currPage);
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
