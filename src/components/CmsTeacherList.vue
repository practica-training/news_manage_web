<template>
    <!--    教师列表组件-->
    <div>
        <el-card v-cloak>
            <div slot="header" class="cms-table-header">
                <span class="cms-not-copy cms-table-title"><i class="el-icon-cpu"></i>&nbsp;{{tableTitle}}</span>
            </div>
            <el-table
                    size="mini"
                    class="cms-not-copy"
                    :data="teachers"
                    @row-click="lookTeacherInfo"
                    stripe
                    header-cell-class-name="cms-table-cell-header"
                    row-class-name="cms-table-line"
                    cell-class-name="cms-table-cell"
                    @row-contextmenu="rowContextMenu"
                    style="width: 100%;">
                <el-table-column
                        fixed="left"
                        prop="realName"
                        label="姓名"
                        class-name="cms-text-indent-one"
                        label-class-name="cms-text-indent-harf"
                        min-width="90rem"
                >
                </el-table-column>

                <el-table-column label="性别" min-width="70rem">
                    <template slot-scope="{row}">
                        <i class="cms-sex-icon el-icon-s-custom" :class="{'cms-sex-woman':row.sex=='0'}"></i>
                    </template>
                </el-table-column>
                <el-table-column label="职称" min-width="90rem">
                    <template slot-scope="{row}">
                        {{ row.titles || '—' }}
                    </template>
                </el-table-column>
                <el-table-column
                        prop="educational"
                        label="最高学历" min-width="100rem">
                </el-table-column>
                <el-table-column label="研究领域" min-width="160rem">
                    <template slot-scope="{row}">
                        {{row.domain}}
                    </template>
                </el-table-column>
                <el-table-column label="电话" min-width="100rem">
                    <template slot-scope="{row}">
                        {{ row.phone || '—' }}
                    </template>
                </el-table-column>
                <el-table-column label="职位">
                    <template slot-scope="{row}">
                        {{ row.position || '—' }}
                    </template>
                </el-table-column>
                <el-table-column label="办公室" width="70rem">
                    <template slot-scope="{row}">
                        {{ row.office || '—' }}
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script>

    export default {
        name: "CmsTeacherList",
        data() {
            return {
                loadingInstance: "",
                defaultSex: ["女", "男"],
                tableTitle: "",
                teachers: [],
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
                if (newVal.teachers && newVal.columns.columnName) {
                    this.tableTitle = newVal.columns.columnName;
                    this.teachers = newVal.teachers;
                    //console.log(this.teachers)
                }
                this.$nextTick(() => {// 以服务的方式调用的 Loading 需要异步关闭
                    setTimeout(() => {//设置定时器，为了看上去不像闪屏
                        this.loadingInstance.close();
                    }, 200);
                });
            }
        },
        methods: {
            lookTeacherInfo(row) {
                let routeUrl = this.$router.resolve({
                    path: "/teacher?" + row.profileId,
                });
                window.open(routeUrl.href, '_blank');
            },
            rowContextMenu() {//鼠标右键点击
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
    .cms-text-indent-one{
        text-indent: 1em;
    }

    .cms-text-indent-harf{
        text-indent: 0.5em !important;
    }

    .cms-table-header {
        padding: 0.5rem;
    }

    .cms-table-title {
        font-size: 1rem;
        font-weight: bold;
        color: #003674;
    }

    .cms-table-line {
        cursor: pointer;
        font-size: 0.9rem;
    }

    .cms-table-cell-header{
        position: relative;
        left: 5px;
        padding: 0.5rem;
        font-size: 0.96rem;
    }

    .cms-table-cell {
        text-align: left;
        position: relative;
        left: 5px;
    }

    .cms-table-cell > .cell {
        text-align: left !important;
    }

    .cms-sex-icon {
        font-size: 1rem;
        color: #00b4db;
    }

    .cms-sex-woman {
        color: palevioletred;
    }

    .cms-cell-item{
        padding: 0.2rem;
        background-color: #155799;
        color: #f0f0f0;
    }
</style>