<template>
    <!--    特殊列表组件，如人才培养方案-->
    <div>
        <el-card>
            <div slot="header" class="cms-not-copy cms-table-header">
                <span class="cms-not-copy cms-table-title"><i class="el-icon-s-claim"></i>&nbsp;{{tapTitle[SpecialListId]}}</span>
            </div>
            <el-collapse accordion class="cms-not-copy">
                <template v-for="(item,index) in currList">
                    <el-collapse-item :key="index">
                        <template slot="title">
                            <div class="cms-collapse-title">
                                &nbsp;&nbsp;
                                <i class="el-icon-s-help"></i>&nbsp;
                                <span>{{item.title}}</span>
                            </div>
                        </template>
                        <div>
                            <el-table class="cms-select-news cms-not-copy" stripe :show-header="false"
                                      :data="item.content"
                                      @row-click="lookArticle" style="cursor: pointer;">
                                <el-table-column>
                                    <template slot-scope="scope">
                                        <span style="font-size: 0.9rem;padding-left: 2rem;">{{ scope.row.title }}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column align="right">
                                    <template>
                                        <i class="el-icon-arrow-right"></i>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </el-collapse-item>
                </template>
            </el-collapse>
        </el-card>
    </div>
</template>

<script>
    import {Collapse, CollapseItem} from 'element-ui';

    export default {
        name: "CmsSpecialList",
        components: {
            [Collapse.name]: Collapse,
            [CollapseItem.name]: CollapseItem,
        },
        data() {
            return {
                loadingInstance: null,
                schemeList: [//人才培养方案
                    {
                        title: "本科人才培养方案汇编",
                        content: [
                            {
                                key: "2019",
                                title: "2019级本科人才培养方案汇编",
                            },
                            {
                                key: "2018",
                                title: "2018级本科人才培养方案汇编",
                            },
                            {
                                key: "2017",
                                title: "2017级本科人才培养方案汇编",
                            },
                            {
                                key: "2016",
                                title: "2016级本科人才培养方案汇编",
                            },
                            {
                                key: "2015",
                                title: "2015级本科人才培养方案汇编",
                            },
                        ]
                    }
                ],
                outlineList: [//教学大纲
                    {
                        title: "网络空间安全系",
                        content: [
                            {
                                key: "网络空间安全",
                                openTime: "2019秋季学期",
                                title: "网络空间安全系2019年秋季学期",
                            },
                            {
                                key: "网络空间安全",
                                openTime: "2019春季学期",
                                title: "网络空间安全系2019年春季学期",
                            },
                            {
                                key: "网络空间安全",
                                openTime: "2018秋季学期",
                                title: "网络空间安全系2018年秋季学期",
                            },
                            {
                                key: "网络空间安全",
                                openTime: "2018春季学期",
                                title: "网络空间安全系2018年春季学期",
                            },
                            {
                                key: "网络空间安全",
                                openTime: "2017秋季学期",
                                title: "网络空间安全系2017年秋季学期",
                            },
                        ]
                    },
                    {
                        title: "网络工程系",
                        content: [
                            {
                                key: "网络工程",
                                openTime: "2019秋季学期",
                                title: "网络工程系2019年秋季学期",
                            },
                            {
                                key: "网络工程",
                                openTime: "2019春季学期",
                                title: "网络工程系2019年春季学期",
                            },
                            {
                                key: "网络工程",
                                openTime: "2018秋季学期",
                                title: "网络工程系2018年秋季学期",
                            },
                            {
                                key: "网络工程",
                                openTime: "2018春季学期",
                                title: "网络工程系2018年春季学期",
                            },
                            {
                                key: "网络工程",
                                openTime: "2017秋季学期",
                                title: "网络工程系2017年秋季学期",
                            },
                        ]
                    },
                    {
                        title: "软件工程系",
                        content: [
                            {
                                key: "软件工程",
                                openTime: "2019秋季学期",
                                title: "软件工程2019年秋季学期",
                            },
                            {
                                key: "软件工程",
                                openTime: "2019春季学期",
                                title: "软件工程2019年春季学期",
                            },
                            {
                                key: "软件工程",
                                openTime: "2018秋季学期",
                                title: "软件工程2018年秋季学期",
                            },
                            {
                                key: "软件工程(卓越计划班)",
                                openTime: "2019秋季学期",
                                title: "软件工程(卓越计划班)2019年秋季学期",
                            },
                            {
                                key: "软件工程(卓越计划班)",
                                openTime: "2019春季学期",
                                title: "软件工程(卓越计划班)2019年春季学期",
                            },
                            {
                                key: "软件工程(卓越计划班)",
                                openTime: "2018秋季学期",
                                title: "软件工程(卓越计划班)2018年秋季学期",
                            },
                        ]
                    },
                    {
                        title: "特色产业学院",
                        content: [],
                    },
                    {
                        title: "研究生",
                        content: [],
                    },
                ],
                currList: [],//当前显示的list
                tapTitle: ["教学大纲", "人才培养方案"],
            }
        },
        watch: {
            SpecialListId(newVal) {
                this.loadingInstance = this.$loading();
                if (newVal == 0) {
                    this.currList = this.outlineList;
                } else {
                    this.currList = this.schemeList;
                }
                this.$nextTick(() => {// 以服务的方式调用的 Loading 需要异步关闭
                    setTimeout(() => {//设置定时器，为了看上去不像闪屏
                        this.loadingInstance.close();
                    }, 200);
                });
            }
        },
        props: {
            SpecialListId: {
                type: Number,
            }
        },
        methods: {
            lookArticle(row) {
                if (this.SpecialListId == 0) {//是教学大纲
                    let major = row.key;
                    let openTime = row.openTime;
                    let url = "https://ar.css.dgut.edu.cn/out?openTime=" + openTime + "&major=" + major + "&courseType=全部";
                    url = encodeURI(url);
                    window.open(url, '_blank');
                } else {//人才培养方案
                    let nj = row.key;
                    let url = "http://jwc.dgut.edu.cn/jyk/student.asp?s=2&a=list&nj=" + nj;
                    url = encodeURI(url);
                    window.open(url, '_blank');
                }
            }
        },
        created() {
            this.loadingInstance = this.$loading();
            if (this.SpecialListId == 0) {
                this.currList = this.outlineList;
            } else {
                this.currList = this.schemeList;
            }
            this.$nextTick(() => {// 以服务的方式调用的 Loading 需要异步关闭
                setTimeout(() => {//设置定时器，为了看上去不像闪屏
                    this.loadingInstance.close();
                }, 200);
            });
        }
    }
</script>

<style scoped>
    .cms-collapse-title {
        font-size: 0.9rem;
        color: #666666;
    }
</style>